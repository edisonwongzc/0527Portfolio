import React from 'react';
import ThreeHero from '../ThreeHero';

/**
 * Hero区域组件
 * 包含3D Hero场景和主要视觉元素
 */
const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      {/* 3D Hero区域 */}
      <ThreeHero />
    </section>
  );
};

export default HeroSection; 