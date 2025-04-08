import React from 'react';
import { Navbar } from './Navbar.tsx';
import { Hero } from './Hero.tsx';
import { Features } from './Feature.tsx';

export const Homepage =() => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

