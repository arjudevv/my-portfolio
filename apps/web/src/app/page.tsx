'use client';

import { useCallback, useState } from 'react';
import { SceneProvider, useScene } from '@/three/SceneContext';
import SceneManager from '@/three/SceneManager';
import { useScrollStory } from '@/animations/scrollStory';
import LoadingScreen from '@/components/loading/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import FeaturedProjectSection from '@/components/sections/FeaturedProjectSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechGalaxySection from '@/components/sections/TechGalaxySection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import type { SceneId } from '@/types/portfolio';

function PortfolioContent() {
  const { setActiveScene } = useScene();
  const [loaded, setLoaded] = useState(false);

  const onSceneChange = useCallback(
    (scene: SceneId) => setActiveScene(scene),
    [setActiveScene]
  );

  useScrollStory(onSceneChange);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <a href="#hero" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <FeaturedProjectSection />
        <ProjectsSection />
        <TechGalaxySection />
        <AchievementsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}

export default function HomePage() {
  return (
    <SceneProvider>
      <SceneManager />
      <PortfolioContent />
    </SceneProvider>
  );
}
