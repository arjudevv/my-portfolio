'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroScene from '@/components/HeroScene';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }

    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    }

    if (heroSubtitleRef.current) {
      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        }
      );
    }

    if (heroDescriptionRef.current) {
      gsap.fromTo(
        heroDescriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
        }
      );
    }

    if (heroButtonsRef.current) {
      gsap.fromTo(
        heroButtonsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroScene />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div ref={heroTextRef} className="text-center max-w-4xl mx-auto">
            <h1
              ref={heroTitleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 md:mb-6"
            >
              Arjun
            </h1>
            <p
              ref={heroSubtitleRef}
              className="text-xl md:text-2xl lg:text-3xl text-zinc-700 dark:text-zinc-300 mb-6 md:mb-8"
            >
              Full Stack Developer
            </p>
            <p
              ref={heroDescriptionRef}
              className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Building modern web applications with cutting-edge technologies.
              Passionate about creating seamless user experiences and scalable solutions.
            </p>
            <div
              ref={heroButtonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/projects"
                className="px-6 md:px-8 py-3 md:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border-2 border-zinc-300 dark:border-zinc-600 rounded-lg font-medium transition-all text-sm md:text-base hover:bg-zinc-50 dark:hover:bg-zinc-700 transform hover:scale-105"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Links Section */}
      <div className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-shadow"
            >
              <Link href="/android">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Android Development
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Native Android apps with modern architecture patterns and Material Design
                </p>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-shadow"
            >
              <Link href="/backend">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Backend Development
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Scalable server-side systems with Node.js, databases, and cloud infrastructure
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

