import type { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: 'aceneobank',
    title: 'Aceneobank',
    description:
      'Agency banking platform for merchants with Micro ATM, POS, AEPS, Bill Payments, QR, Fastag, and Direct Money Transfer.',
    longDescription:
      'A comprehensive fintech Android application enabling merchants to provide agency banking services. Features include Micro ATM operations, POS integration, AEPS transactions, bill payments, QR payments, Fastag recharges, and direct money transfers with real-time transaction tracking.',
    tech: ['Kotlin', 'Java', 'Android SDK', 'Retrofit', 'Firebase', 'MVVM', 'Room', 'Hilt'],
    images: ['/project-images/aceneobank-1.svg', '/project-images/aceneobank-2.svg'],
    tags: ['Android', 'Fintech', 'Mobile'],
    featured: true,
    problem:
      'Merchants needed a unified platform to offer diverse agency banking services with reliable offline support and real-time transaction processing.',
    solution:
      'Built a modular Android app with clean architecture, integrating multiple payment APIs, Firebase for real-time sync, and optimized performance for low-end devices.',
    architecture:
      'MVVM with Clean Architecture layers. Repository pattern for data access, Hilt for DI, Room for local caching, Retrofit for REST APIs, Firebase for push notifications and cloud sync.',
  },
  {
    id: 'ace-services',
    title: 'Ace Services',
    description:
      'On-demand banking service booking app with real-time delivery tracking for cash pickup and money transfer.',
    longDescription:
      'A service marketplace Android app where users book banking services and track delivery personnel in real-time. Supports cash pickup and money transfer with live location tracking and push notifications.',
    tech: ['Kotlin', 'Android SDK', 'Firebase', 'Google Maps API', 'Retrofit', 'MVVM'],
    images: ['/project-images/ace-services-1.svg'],
    tags: ['Android', 'Fintech', 'Real-time'],
    problem:
      'Users needed convenient doorstep banking services with transparent tracking and reliable scheduling.',
    solution:
      'Developed an intuitive booking flow with real-time GPS tracking, Firebase Cloud Messaging for status updates, and seamless API integration with banking backends.',
    architecture:
      'MVVM architecture with Firebase Realtime Database for live tracking, Retrofit for REST APIs, and Google Maps SDK for location visualization.',
  },
  {
    id: 'chat-app',
    title: 'Real-time Chat Application',
    description:
      'Full-featured chat application built solo during internship with Firebase, real-time messaging, and push notifications.',
    longDescription:
      'A complete chat application featuring real-time messaging, user authentication, media sharing, and push notifications. Built independently using modern Android development practices.',
    tech: ['Java', 'Firebase', 'Firestore', 'FCM', 'Jsoup', 'Retrofit', 'JSON'],
    images: ['/project-images/chat-app-1.svg'],
    github: 'https://github.com/arjun-raju-v',
    tags: ['Android', 'Real-time', 'Firebase'],
    problem: 'Users needed a reliable real-time messaging platform with offline support and notifications.',
    solution:
      'Implemented Firebase Firestore for real-time sync, FCM for push notifications, and Retrofit for external API integrations.',
    architecture:
      'Activity-based architecture with Firebase backend, Firestore for messages, and Realtime Database for presence indicators.',
  },
  {
    id: 'admin-panel-api',
    title: 'Admin Panel & Backend API',
    description:
      'Full-stack admin dashboard with Node.js/TypeScript backend, PostgreSQL, AWS deployment, and JWT authentication.',
    longDescription:
      'Enterprise admin panel and REST API for analytics, user management, and reporting. Includes JWT authentication, AWS cloud deployment with CI/CD pipelines, and React-based admin interface.',
    tech: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'React', 'AWS', 'Docker', 'JWT'],
    images: ['/project-images/admin-1.svg'],
    tags: ['Full Stack', 'Backend', 'Cloud'],
    problem:
      'Organizations needed a scalable admin system with secure APIs, analytics dashboards, and cloud-hosted infrastructure.',
    solution:
      'Built a TypeScript Express API with PostgreSQL, deployed on AWS with Docker, CI/CD via GitHub Actions, and a React admin frontend.',
    architecture:
      'Microservices-ready monolith with Express routes, JWT middleware, PostgreSQL with connection pooling, Redis caching, and AWS EC2/S3/CloudFront deployment.',
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
