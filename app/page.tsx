'use client';

import { useState } from 'react';
import { Intro } from '@/components/home/Intro';
import { Hero } from '@/components/home/Hero';
import { Projects } from '@/components/home/Projects';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className={`relative ${introFinished ? '' : 'overflow-hidden'}`}>
      {!introFinished && (
        <Intro
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <div className="flex flex-col">
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
