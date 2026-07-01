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
import { cn } from '@/lib/utils';

function PortfolioContent({
  loaded,
  onLoaded,
}: {
  loaded: boolean;
  onLoaded: () => void;
}) {
  const { setActiveScene } = useScene();

  const onSceneChange = useCallback(
    (scene: SceneId) => setActiveScene(scene),
    [setActiveScene]
  );

  useScrollStory(onSceneChange, undefined, loaded);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={onLoaded} />}
      <div
        className={cn('transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0 pointer-events-none')}
        aria-hidden={!loaded}
      >
        <a href="#hero" className="skip-link">
          Skip to content
        </a>
        <Navbar visible={loaded} />
        <main id="main-content">
          <HeroSection introComplete={loaded} />
          <AboutSection enabled={loaded} />
          <ExperienceSection />
          <SkillsSection />
          <FeaturedProjectSection />
          <ProjectsSection />
          <TechGalaxySection />
          <AchievementsSection enabled={loaded} />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SceneProvider>
      <SceneManager enabled={loaded} />
      <PortfolioContent loaded={loaded} onLoaded={() => setLoaded(true)} />
    </SceneProvider>
  );
}
