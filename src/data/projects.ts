import type { Project } from '../types';


/**
 * ARCHITECTURAL RULE:
 * To drop in real projects later, simply edit this array:
 * - Update status to "completed" or "in_progress"
 * - Add githubUrl and liveUrl
 * - Update title, description, and tech stack
 * The UI automatically adapts with zero redesign or JSX layout modifications.
 */
export const PROJECTS_DATA: Project[] = [
  {
    id: "exp-01",
    index: "01",
    title: "Speculative Systems Lab // EXP_01",
    codename: "LOW-LEVEL MEMORY & ALGORITHMIC PROFILING",
    description: "An upcoming experimental systems project focusing on C++ low-level memory allocation, algorithmic cache locality, and runtime telemetry benchmarks.",
    tech: ["C++", "DSA", "System Profiling", "Cache Optimization"],
    status: "coming_soon",
    archId: "LAB_SPEC_0x01",
    metrics: [
      { label: "MEMORY TARGET", value: "< 2MB FOOTPRINT" },
      { label: "ARCHITECTURE", value: "C++20 NATIVE" },
    ],
  },
  {
    id: "exp-02",
    index: "02",
    title: "Algorithmic State Engine // EXP_02",
    codename: "DATA STRUCTURE COMPILER & VISUALIZER",
    description: "An interactive laboratory environment dedicated to visualizing self-balancing trees, graphs, and graph traversal algorithms with deterministic execution state.",
    tech: ["Java", "OOP", "Data Structures", "Algorithm Analysis"],
    status: "coming_soon",
    archId: "LAB_SPEC_0x02",
    metrics: [
      { label: "PARADIGM", value: "STRICT OOP" },
      { label: "COMPLEXITY", value: "O(log N) SEARCH" },
    ],
  },
  {
    id: "exp-03",
    index: "03",
    title: "Modern Computational Interface // EXP_03",
    codename: "REACTIVE WEB TELEMETRY WORKBENCH",
    description: "A high-performance modern web application exploring real-time telemetry streaming, client-side data management, and GPU-accelerated interface rendering.",
    tech: ["JavaScript", "HTML5/CSS3", "SQL / MySQL", "Web APIs"],
    status: "coming_soon",
    archId: "LAB_SPEC_0x03",
    metrics: [
      { label: "PERFORMANCE", value: "60 FPS RENDER" },
      { label: "DATA LAYER", value: "NORMALIZED SQL" },
    ],
  },
];
