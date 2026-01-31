'use client';

import { useState } from 'react';
import { Intro } from '@/components/home/Intro';
import { Hero } from '../components/home/Hero';
import { Expertise } from '@/components/home/Expertise';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/layout/Footer';
import { useAnimatedTabTitle } from '@/hooks/useAnimatedTabTitle';
import { ScrollLineAnimation } from '@/components/ui/svg-follow-scroll';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  // Initialize tab animation
  useAnimatedTabTitle();

  return (
    <main className="relative">
      {!introFinished && (
        <Intro
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <div className="flex flex-col relative">
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
          <ScrollLineAnimation />
        </div>
        <div className="relative z-10">
          <Hero isReady={introFinished} />
          <Expertise />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
