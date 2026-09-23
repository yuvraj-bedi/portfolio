export interface Project {
  id: string;
  index: string; // e.g. "01"
  title: string;
  codename: string; // e.g. "SPECULATIVE SYSTEM EXPERIMENT 01"
  description: string;
  tech: string[];
  status: 'coming_soon' | 'in_progress' | 'completed';
  archId: string; // e.g. "ARCH_ID: #001"
  githubUrl?: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  accentColor?: string;
}

export interface SkillGroup {
  category: string;
  tag: string;
  skills: string[];
}

export interface LearningItem {
  name: string;
  description: string;
  status: 'core_discipline' | 'active_inquiry';
  domain: 'core' | 'exploratory';
  tag: string;
}

export interface TimelineMilestone {
  yearRange: string;
  institution: string;
  degree: string;
  currentStatus: string;
  description: string;
  coursework: string[];
  coordinates: string;
}

export interface VaultSection {
  title: string;
  tag: string;
  status: 'standby' | 'in_preparation';
  description: string;
}
