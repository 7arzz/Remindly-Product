/**
 * Application Configuration
 * Centralize all app settings here for easy customization by buyers.
 */

export const appConfig = {
  name: "Remindly",
  version: "1.0.0",
  author: "Your Name/Studio",
  tagline: "Manajer tugas & kolaborasi real-time premium.",
  description: "Platform manajemen tugas dan kolaborasi real-time kelas atas yang dibangun dengan React 19, Firebase, dan Tailwind CSS.",
  
  // Storage & Branding
  storagePrefix: "remindly_",
  logoIcon: "ListTodo", // Lucide icon name
  
  // Theme Customization
  theme: {
    primaryGradient: "bg-gradient-sea",
    accentColor: "#64ffda",
    glassOpacity: "40", // bg-bg-card/40
    roundedCorners: "2xl",
  },
  
  // Feature Settings
  features: {
    enablePublicSpace: true,
    enableStats: true,
    enableSummaries: true,
    enableConfetti: true,
  },

  // Developer / Support Info
  support: {
    email: "support@yourdomain.com",
    documentation: "https://docs.yourdomain.com",
  }
};
