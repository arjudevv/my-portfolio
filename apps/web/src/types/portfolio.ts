export interface Experience {
  period: string;
  title: string;
  company: string;
  achievements: string[];
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  qualification: string;
  details: string;
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Basic';
  category: string;
  projects?: string[];
  years?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  images: string[];
  github?: string;
  liveDemo?: string;
  tags: string[];
  problem?: string;
  solution?: string;
  architecture?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface Achievement {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface SiteStats {
  yearsExperience: number;
  appsShipped: number;
  usersReached: number;
  certifications: number;
}

export type SceneId =
  | 'hero'
  | 'about'
  | 'experience'
  | 'skills'
  | 'featured'
  | 'projects'
  | 'galaxy'
  | 'contact';

export interface SectionConfig {
  id: string;
  label: string;
  scene: SceneId;
}
