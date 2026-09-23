import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

interface LatticeCanvasProps {
  className?: string;
  isDark?: boolean;
}

export const LatticeCanvas: React.FC<LatticeCanvasProps> = ({ className = '', isDark = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Set up Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create algorithmic geometry: Icosahedron point cloud + wireframe
    const geometry = new THREE.IcosahedronGeometry(1.6, 2);
    const originalPositions = geometry.attributes.position.clone();

    // Points particle material
    const particleColor = isDark ? 0x00f0ff : 0x0066cc;
    const pointsMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.045,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // Subtle inner wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: particleColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.12 : 0.08,
    });
    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(mesh);

    // Ambient particles ring
    const ringGeo = new THREE.BufferGeometry();
    const ringPointsCount = 120;
    const ringPosArray = new Float32Array(ringPointsCount * 3);
    for (let i = 0; i < ringPointsCount; i++) {
      const angle = (i / ringPointsCount) * Math.PI * 2;
      const radius = 2.1 + (Math.random() - 0.5) * 0.4;
      ringPosArray[i * 3] = Math.cos(angle) * radius;
      ringPosArray[i * 3 + 1] = Math.sin(angle) * radius;
      ringPosArray[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPosArray, 3));
    const ringMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Points(ringGeo, ringMat);
    scene.add(ring);

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Pause on tab unfocus
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Target rotation interpolated with mouse
    let targetRotX = 0;
    let targetRotY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth vertex breathing
      const positionAttr = geometry.attributes.position;
      const count = positionAttr.count;

      for (let i = 0; i < count; i++) {
        const ox = originalPositions.getX(i);
        const oy = originalPositions.getY(i);
        const oz = originalPositions.getZ(i);

        const wave = Math.sin(elapsedTime * 1.5 + ox * 2 + oy * 2) * 0.07;
        positionAttr.setXYZ(i, ox * (1 + wave), oy * (1 + wave), oz * (1 + wave));
      }
      positionAttr.needsUpdate = true;

      // Mouse influence
      targetRotX = normalizedY * 0.35;
      targetRotY = normalizedX * 0.45;

      points.rotation.y += 0.003;
      points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, targetRotX, 0.05);
      points.rotation.z = THREE.MathUtils.lerp(points.rotation.z, -targetRotY * 0.3, 0.05);

      mesh.rotation.y = points.rotation.y;
      mesh.rotation.x = points.rotation.x;
      mesh.rotation.z = points.rotation.z;

      ring.rotation.z -= 0.002;
      ring.rotation.x = targetRotX * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pointsMaterial.dispose();
      wireframeMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [normalizedX, normalizedY, isDark]);

  if (!hasWebGL || reducedMotion) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-64 h-64 rounded-full border border-cyan-500/20 bg-gradient-to-tr from-cyan-500/5 to-transparent flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-cyan-400/30 flex items-center justify-center animate-pulse">
            <span className="font-mono text-xs text-cyan-400 tracking-widest">[SYS_NODE: 2D_FALLBACK]</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center ${className}`}
      aria-label="Interactive 3D algorithmic lattice node"
    />
  );
};
