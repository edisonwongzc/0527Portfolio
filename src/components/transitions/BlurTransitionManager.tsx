import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface BlurTransitionManagerProps {
  sections: Array<{
    ref: React.RefObject<HTMLDivElement>;
    name: string;
  }>;
}

/**
 * 模糊转场管理器
 * 处理模块间的模糊切换效果
 */
const BlurTransitionManager: React.FC<BlurTransitionManagerProps> = ({ sections }) => {
  
  useEffect(() => {
    if (!sections.length) return;

    const triggers: ScrollTrigger[] = [];

    // 为每个模块创建转场效果
    sections.forEach((section, index) => {
      if (!section.ref.current) return;

      const nextSection = sections[index + 1];
      
      if (nextSection && nextSection.ref.current) {
        // 创建模块间的模糊转场
        const trigger = ScrollTrigger.create({
          trigger: nextSection.ref.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // 当前模块退出效果 - 增强模糊
            gsap.to(section.ref.current, {
              filter: `blur(${progress * 8}px) brightness(${1 - progress * 0.3})`,
              scale: 1 - progress * 0.05,
              y: progress * -30,
              opacity: 1 - progress * 0.4,
              duration: 0.1,
              ease: "none"
            });

            // 下一个模块进入效果 - 从模糊到清晰
            gsap.to(nextSection.ref.current, {
              filter: `blur(${(1 - progress) * 12}px) brightness(${0.7 + progress * 0.3})`,
              scale: 0.95 + progress * 0.05,
              y: (1 - progress) * 50,
              opacity: 0.6 + progress * 0.4,
              duration: 0.1,
              ease: "none"
            });
          },
          onLeave: () => {
            // 确保完全清晰
            gsap.to(nextSection.ref.current, {
              filter: 'blur(0px) brightness(1)',
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            // 返回时恢复当前模块
            gsap.to(section.ref.current, {
              filter: 'blur(0px) brightness(1)',
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        triggers.push(trigger);
      }
    });

    // 清理函数
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [sections]);

  return null; // 这是一个逻辑组件，不渲染任何内容
};

export default BlurTransitionManager; 