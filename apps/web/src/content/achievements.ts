import type { Achievement } from '@/types/portfolio';
import { certificates } from './experience';

export const stats = {
  yearsExperience: 3,
  appsShipped: 6,
  usersReached: 50000,
  certifications: certificates.length,
};

export const achievements: Achievement[] = [
  { id: 'experience', label: 'Years Experience', value: stats.yearsExperience, suffix: '+' },
  { id: 'apps', label: 'Apps Shipped', value: stats.appsShipped, suffix: '+' },
  { id: 'users', label: 'Users Reached', value: stats.usersReached, suffix: '+' },
  { id: 'certs', label: 'Certifications', value: stats.certifications },
];

export const timeline = [
  ...certificates.map((c) => ({
    year: c.period.split(' - ')[0].split('/')[1] ?? '2021',
    title: c.title,
    subtitle: c.issuer,
  })),
  { year: '2024', title: 'Senior Android Developer', subtitle: 'Bnkhub Finserv' },
  { year: '2023', title: 'Android Developer', subtitle: 'Aceware Fintech' },
  { year: '2022', title: 'Android Intern', subtitle: 'Soften Technologies' },
];
