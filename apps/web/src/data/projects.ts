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
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration.',
    longDescription: 'A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog management, shopping cart functionality, secure payment processing, order management, and admin dashboard. The platform is designed for scalability and performance, handling thousands of concurrent users.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma'],
    images: ['/project-images/ecommerce-1.jpg', '/project-images/ecommerce-2.jpg', '/project-images/ecommerce-3.jpg'],
    github: 'https://github.com/arjun/ecommerce-platform',
    liveDemo: 'https://ecommerce-demo.example.com',
    tags: ['Web', 'Full Stack', 'E-Commerce'],
    problem: 'Businesses needed a scalable e-commerce solution that could handle high traffic, provide secure payment processing, and offer an intuitive shopping experience.',
    solution: 'Built a modern e-commerce platform with server-side rendering for SEO, real-time inventory management, secure payment integration with Stripe, and a responsive design that works seamlessly across all devices.',
    architecture: 'The application follows a microservices architecture with separate services for authentication, product management, order processing, and payment handling. Uses PostgreSQL for data persistence, Redis for caching, and implements JWT-based authentication with refresh tokens.',
  },
  {
    id: 'task-management',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription: 'A feature-rich task management application designed for teams. Includes real-time collaboration, drag-and-drop task organization, file attachments, comments, notifications, and advanced filtering. Built with a focus on performance and user experience.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Material-UI', 'Express'],
    images: ['/project-images/task-1.jpg', '/project-images/task-2.jpg'],
    github: 'https://github.com/arjun/task-manager',
    liveDemo: 'https://task-demo.example.com',
    tags: ['Web', 'Real-time', 'Collaboration'],
    problem: 'Teams struggled with coordinating tasks, tracking progress, and maintaining visibility across projects. Existing solutions were either too complex or lacked real-time collaboration features.',
    solution: 'Created a streamlined task management app with real-time updates using WebSockets, intuitive drag-and-drop interface, and comprehensive team collaboration tools including comments, mentions, and notifications.',
    architecture: 'Built with a React frontend and Node.js/Express backend. Uses MongoDB for flexible document storage, Socket.io for real-time communication, and implements a RESTful API with WebSocket support for live updates.',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'An interactive weather dashboard that provides real-time weather data, forecasts, and location-based insights.',
    longDescription: 'A beautiful and functional weather dashboard that displays current conditions, hourly and daily forecasts, interactive maps, and weather alerts. Features include location-based weather, search functionality, and customizable widgets.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Weather API', 'CSS3'],
    images: ['/project-images/weather-1.jpg'],
    github: 'https://github.com/arjun/weather-dashboard',
    liveDemo: 'https://weather-demo.example.com',
    tags: ['Web', 'Frontend', 'Data Visualization'],
    problem: 'Users needed a clean, intuitive interface to view weather information with detailed forecasts and visualizations.',
    solution: 'Developed a responsive weather dashboard with beautiful data visualizations, interactive charts, and a clean UI that makes weather information easily accessible and understandable.',
    architecture: 'Single-page application built with React and TypeScript. Integrates with multiple weather APIs for comprehensive data, uses Chart.js for visualizations, and implements local storage for user preferences.',
  },
  {
    id: 'social-media-analytics',
    title: 'Social Media Analytics Platform',
    description: 'A comprehensive analytics platform for tracking social media performance across multiple platforms.',
    longDescription: 'An advanced analytics platform that aggregates data from multiple social media platforms, providing insights into engagement, reach, audience demographics, and content performance. Features include automated reporting, custom dashboards, and data export capabilities.',
    tech: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js'],
    images: ['/project-images/analytics-1.jpg', '/project-images/analytics-2.jpg'],
    github: 'https://github.com/arjun/social-analytics',
    tags: ['Web', 'Backend', 'Analytics'],
    problem: 'Businesses needed a unified platform to track and analyze their social media performance across different platforms without switching between multiple tools.',
    solution: 'Built a comprehensive analytics platform that integrates with major social media APIs, processes large volumes of data efficiently, and presents insights through intuitive dashboards and visualizations.',
    architecture: 'Microservices architecture with a Next.js frontend, Python/FastAPI backend services, PostgreSQL for data storage, and Redis for caching. Implements scheduled jobs for data collection and processing.',
  },
];
