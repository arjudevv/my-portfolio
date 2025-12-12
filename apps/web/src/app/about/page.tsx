'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experience = [
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
      'Collaborated cross-functionally with teams to analyze requirements, manage tasks, and ensure timely delivery with high code quality.',
    ],
  },
  {
    period: '05/2023 - 12/2024',
    title: 'Android Developer',
    company: 'Aceware Fintech Services pvt. Ltd',
    achievements: [
      'Aceneobank App: Collaborated with cross-functional teams to define, design, and ship new features for merchants of agency banking providing services like Micro ATM, POS machine, AEPS, BillPayments, QR, Fastag payments and Direct Money Transfer. Collaborated with external data sources and APIs.',
      'Ace Services App: Collaborated with external data sources and APIs which users can book a banking service and delivery boy will be at your doorstep. This project is in initial stage so only Cash Pickup and Money Transfer are the only services. User can track delivery boy.',
    ],
  },
  {
    period: '09/2022 - 04/2023',
    title: 'Android Developer Internship',
    company: 'Soften Technologies',
    achievements: [
      'Built android application alone, which is a chat application using the skills I have learned such as Firebase, Jsoup, Retrofit, and JSON.',
      'Used Firebase firestore database and real-time database.',
      'Used Firebase cloud push notification service for sending notifications to users.',
    ],
  },
];

const education = [
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

const certificates = [
  {
    period: '10/2021 - 11/2021',
    title: 'Training on Python (DJango and AI)',
    issuer: 'Nestsoft Technologies',
  },
];

const skills = [
  { name: 'Kotlin', level: 'Intermediate' },
  { name: 'Java', level: 'Advanced' },
  { name: 'Android Studio', level: 'Expert' },
  { name: 'Android SDK', level: 'Intermediate' },
  { name: 'AWS', level: 'Intermediate' },
  { name: 'JSON', level: 'Advanced' },
  { name: 'NodeJs', level: 'Intermediate' },
  { name: 'ReactJS', level: 'Intermediate' },
  { name: 'TypeScript', level: 'Basic' },
  { name: 'GitHub Actions', level: 'Intermediate' },
  { name: 'REST', level: 'Advanced' },
  { name: 'OkHttp', level: 'Advanced' },
  { name: 'PostgreSQL', level: 'Intermediate' },
  { name: 'Google APIs', level: 'Expert' },
  { name: 'Push Notification', level: 'Expert' },
  { name: 'Git', level: 'Advanced' },
];

const languages = [
  { name: 'Malayalam', proficiency: 'Native' },
  { name: 'English', proficiency: 'Fluent' },
  { name: 'Hindi', proficiency: 'Intermediate' },
];

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (experienceRef.current) {
      gsap.fromTo(
        experienceRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (educationRef.current) {
      gsap.fromTo(
        educationRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const getLevelColor = (level: string) => {
    if (level === 'Expert') return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    if (level === 'Advanced') return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    if (level === 'Intermediate') return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300';
    return 'bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Summary Section */}
          <div className="mb-16 md:mb-20">
            <motion.div
              ref={aboutRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 md:mb-8">
                About Me
              </h1>
              <div className="space-y-6 md:space-y-8 text-zinc-700 dark:text-zinc-300 text-base md:text-lg leading-relaxed">
                <p>
                  I'm passionate about designing, developing, and delivering high-quality, user-centric mobile applications. Proficient in Kotlin, Java, and the Android SDK, with a strong focus on performance optimization, clean architecture, and modern Android development practices.
                </p>
                <p>
                  Experienced in Firebase, AWS, and backend integration with a proven track record of taking projects from planning to production. Adept at collaborating in dynamic, fast-paced environments to drive innovation and deliver exceptional mobile experiences.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Experience Section */}
          <div ref={experienceRef} className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-10">
              Experience
            </h2>
            <div className="space-y-8 md:space-y-10">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div ref={educationRef} className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-10">
              Education
            </h2>
            <div className="space-y-6 md:space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400">{edu.qualification}</p>
                      <p className="text-zinc-700 dark:text-zinc-300 font-medium mt-2">{edu.details}</p>
                    </div>
                    <span className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                      {edu.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-10">
              Certificates
            </h2>
            <div className="space-y-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                      {cert.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-10">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg px-4 py-2 border border-zinc-200 dark:border-zinc-800"
                >
                  <span className="text-zinc-900 dark:text-zinc-50 font-medium">{skill.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-10">
              Languages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    {lang.name}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">{lang.proficiency}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
