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
              Android Developer
            </p>
            <p
              ref={heroDescriptionRef}
              className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Designing, developing, and delivering high-quality, user-centric mobile applications. Proficient in Kotlin, Java, and the Android SDK, with a strong focus on performance optimization, clean architecture, and modern Android development practices.
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

    </div>
  );
}

