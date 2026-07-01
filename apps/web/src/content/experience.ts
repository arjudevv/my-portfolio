import type { Education, Experience } from '@/types/portfolio';

export const experience: Experience[] = [
  {
    period: '12/2024 - Present',
    title: 'Senior Android Developer',
    company: 'Bnkhub Finserv Private Limited',
    achievements: [
      'Developed and delivered multiple Android applications for both internal use and external clients - managing the full lifecycle from planning and architecture to deployment.',
      'Optimized app performance and security by migrating data storage from SharedPreferences to DataStore, aligning with modern Android development guidelines.',
      'Integrated Firebase services (Authentication, Firestore, Cloud Messaging, and Storage) for realtime data sync, notifications, and offline support.',
      'Built scalable backend services using Node.js and TypeScript, ensuring robust API design and secure authentication mechanisms (JWT-based).',
      'Implemented cloud infrastructure and deployment pipelines on AWS (EC2, S3, CloudFront, and Load Balancer) for hosting APIs and apps.',
      'Developed web-based Admin Panels and Payment Screens using ReactJS, integrated with backend APIs for analytics, management, and reporting.',
    ],
  },
  {
    period: '05/2023 - 12/2024',
    title: 'Android Developer',
    company: 'Aceware Fintech Services pvt. Ltd',
    achievements: [
      'Aceneobank App: Collaborated with cross-functional teams to define, design, and ship new features for merchants of agency banking providing services like Micro ATM, POS machine, AEPS, BillPayments, QR, Fastag payments and Direct Money Transfer.',
      'Ace Services App: Built a service booking platform where users can book banking services and track delivery personnel in real-time for Cash Pickup and Money Transfer.',
    ],
  },
  {
    period: '09/2022 - 04/2023',
    title: 'Android Developer Internship',
    company: 'Soften Technologies',
    achievements: [
      'Built android application alone, which is a chat application using Firebase, Jsoup, Retrofit, and JSON.',
      'Used Firebase firestore database and real-time database.',
      'Used Firebase cloud push notification service for sending notifications to users.',
    ],
  },
];

export const education: Education[] = [
  {
    period: '05/2019 - 08/2022',
    degree: 'Computer Science Engineering',
    institution: 'Government Polytechnic College, Perumbavoor',
    qualification: 'Diploma',
    details: 'CGPA - 7.2',
  },
  {
    period: '06/2017 - 03/2019',
    degree: 'Biology Science',
    institution: 'Sree Narayana Higher Secondary School, Okkal',
    qualification: 'Higher Secondary Education',
    details: 'Percentage - 70%',
  },
];

export const certificates = [
  {
    period: '10/2021 - 11/2021',
    title: 'Training on Python (DJango and AI)',
    issuer: 'Nestsoft Technologies',
  },
];
