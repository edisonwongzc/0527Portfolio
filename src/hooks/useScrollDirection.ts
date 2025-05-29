import { useState, useEffect, useRef } from 'react';

interface ScrollDirectionHook {
  direction: 'up' | 'down' | null;
  isAtSectionBoundary: boolean;
  currentSection: string;
  nextSection: string;
  shouldShowTransition: boolean;
}

/**
 * 滚动方向和模块边界检测Hook
 */
export const useScrollDirection = (): ScrollDirectionHook => {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [isAtSectionBoundary, setIsAtSectionBoundary] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [nextSection, setNextSection] = useState('');
  const [shouldShowTransition, setShouldShowTransition] = useState(false);
  
  const lastScrollY = useRef(0);
  const transitionCooldown = useRef(false);

  useEffect(() => {
    const sections = [
      { id: 'hero', selector: '.three-hero-container' },
      { id: 'projects', selector: '[data-section="projects"]' },
      { id: 'services', selector: '[data-section="services"]' },
      { id: 'contact', selector: '[data-section="contact"]' }
    ];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      setDirection(scrollDirection);
      lastScrollY.current = currentScrollY;

      // 检测当前所在的模块
      const viewportCenter = currentScrollY + window.innerHeight / 2;
      let currentSectionId = '';
      let nextSectionId = '';
      
      for (let i = 0; i < sections.length; i++) {
        const element = document.querySelector(sections[i].selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + currentScrollY;
          const elementBottom = elementTop + rect.height;
          
          if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
            currentSectionId = sections[i].id;
            
            // 确定下一个模块
            if (scrollDirection === 'down' && i < sections.length - 1) {
              nextSectionId = sections[i + 1].id;
            } else if (scrollDirection === 'up' && i > 0) {
              nextSectionId = sections[i - 1].id;
            }
            break;
          }
        }
      }

      setCurrentSection(currentSectionId);
      setNextSection(nextSectionId);

      // 检测是否接近模块边界
      const threshold = window.innerHeight * 0.2; // 增加到20%的视口高度，更容易触发
      let atBoundary = false;
      
      for (const section of sections) {
        const element = document.querySelector(section.selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // 检测是否接近顶部或底部边界
          if (
            (scrollDirection === 'down' && rect.bottom <= threshold) ||
            (scrollDirection === 'up' && rect.top >= window.innerHeight - threshold)
          ) {
            atBoundary = true;
            break;
          }
        }
      }

      setIsAtSectionBoundary(atBoundary);

      // 触发转场效果的条件 - 降低触发门槛
      const shouldTrigger = 
        atBoundary && 
        nextSectionId && 
        !transitionCooldown.current &&
        Math.abs(currentScrollY - lastScrollY.current) > 2; // 降低滚动距离要求

      if (shouldTrigger) {
        setShouldShowTransition(true);
        transitionCooldown.current = true;
        
        // 2秒冷却时间，缩短冷却时间
        setTimeout(() => {
          transitionCooldown.current = false;
          setShouldShowTransition(false);
        }, 2000);
      }
    };

    // 节流处理
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // 初始化
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return {
    direction,
    isAtSectionBoundary,
    currentSection,
    nextSection,
    shouldShowTransition
  };
}; 