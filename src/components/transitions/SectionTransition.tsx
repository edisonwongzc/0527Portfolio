import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionTransitionProps {
  fromSection: string;
  toSection: string;
  isActive: boolean;
  onComplete?: () => void;
}

/**
 * 模块间转场组件 - 模糊切换效果
 */
const SectionTransition: React.FC<SectionTransitionProps> = ({
  fromSection,
  toSection,
  isActive,
  onComplete
}) => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !transitionRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // 模糊过渡动画
    tl.fromTo(transitionRef.current, 
      { 
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.8
      },
      { 
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }
    )
    .to(transitionRef.current, {
      opacity: 0,
      filter: 'blur(20px)',
      scale: 1.2,
      duration: 0.6,
      ease: "power2.in",
      delay: 0.5
    });

  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div 
      ref={transitionRef}
      className="fixed inset-0 z-20 pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white/60 text-sm font-light mb-2">
            {fromSection} → {toSection}
          </div>
          <div className="w-16 h-0.5 bg-white/30 mx-auto">
            <div 
              className="h-full bg-white/80 transition-all duration-1000"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTransition; 