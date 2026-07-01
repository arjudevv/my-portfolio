export const site = {
  name: 'Arjun',
  role: 'Senior Android Developer',
  tagline: 'Building mobile apps, backend systems, and scalable products.',
  email: 'arjunrajuv@yahoo.com',
  linkedin: 'https://linkedin.com/in/arjun-raju-v',
  github: 'https://github.com/arjun-raju-v',
  resume: '/resume.pdf',
  location: 'India',
  about: [
    "I'm passionate about designing, developing, and delivering high-quality, user-centric mobile applications. Proficient in Kotlin, Java, and the Android SDK, with a strong focus on performance optimization, clean architecture, and modern Android development practices.",
    'Experienced in Firebase, AWS, and backend integration with a proven track record of taking projects from planning to production. I build mobile apps, backend systems, APIs, cloud infrastructure and scalable products.',
  ],
} as const;

export const sections = [
  { id: 'hero', label: 'Home', scene: 'hero' as const },
  { id: 'about', label: 'About', scene: 'about' as const },
  { id: 'experience', label: 'Experience', scene: 'experience' as const },
  { id: 'skills', label: 'Skills', scene: 'skills' as const },
  { id: 'featured', label: 'Featured', scene: 'featured' as const },
  { id: 'projects', label: 'Projects', scene: 'projects' as const },
  { id: 'galaxy', label: 'Tech Galaxy', scene: 'galaxy' as const },
  { id: 'achievements', label: 'Achievements', scene: 'hero' as const },
  { id: 'testimonials', label: 'Testimonials', scene: 'hero' as const },
  { id: 'contact', label: 'Contact', scene: 'contact' as const },
] as const;
