import type { LearningItem } from '../types';


export const LEARNING_ITEMS: LearningItem[] = [
  // Core Focus: Active coursework, deliberate practice
  {
    name: "C++ & Systems Foundations",
    description: "Memory models, pointers, manual resource management (RAII), and computational efficiency.",
    status: "core_discipline",
    domain: "core",
    tag: "SYS_LANG",
  },
  {
    name: "Java & Object-Oriented Design",
    description: "Class architecture, inheritance hierarchies, design patterns, and modular software decomposition.",
    status: "core_discipline",
    domain: "core",
    tag: "OOP_CORE",
  },
  {
    name: "Data Structures & Algorithms",
    description: "Algorithmic problem-solving: trees, graphs, sorting, dynamic programming, and complexity analysis.",
    status: "core_discipline",
    domain: "core",
    tag: "DSA_ANALYSIS",
  },
  {
    name: "Modern Web Engineering",
    description: "Responsive layouts, semantic markup, reactive state management, and modern browser standards.",
    status: "core_discipline",
    domain: "core",
    tag: "WEB_APIS",
  },

  // Exploratory Focus: Active curiosity & inquiry (explicitly not claimed expertise)
  {
    name: "Artificial Intelligence Foundations",
    description: "Conceptual exploration of heuristic search, knowledge representation, and probabilistic models.",
    status: "active_inquiry",
    domain: "exploratory",
    tag: "AI_EXPLORE",
  },
  {
    name: "Machine Learning Fundamentals",
    description: "Investigating supervised and unsupervised learning algorithms, gradient descent, and loss optimization.",
    status: "active_inquiry",
    domain: "exploratory",
    tag: "ML_CONCEPTS",
  },
  {
    name: "AI-Powered Applications",
    description: "Prototyping how modern model APIs and intelligent features integrate into software workflows.",
    status: "active_inquiry",
    domain: "exploratory",
    tag: "AI_SYSTEMS",
  },
];
