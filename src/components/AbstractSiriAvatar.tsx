import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AbstractSiriAvatarProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

/**
 * 抽象Siri风格头像组件
 * @param size - 头像大小，默认32
 * @param isActive - 是否激活状态（影响动画强度）
 * @param className - 额外的CSS类名
 */
const AbstractSiriAvatar = ({ size = 32, isActive = false, className = '' }: AbstractSiriAvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const waves = waveRefs.current;
    if (waves.length === 0) return;

    // 为每个波形创建动画
    const animations = waves.map((wave, index) => {
      const baseHeight = isActive ? 60 + index * 10 : 30 + index * 5;
      const animationSpeed = isActive ? 0.8 + index * 0.2 : 1.2 + index * 0.3;
      
      return gsap.to(wave, {
        height: `${baseHeight + Math.sin(index) * 20}%`,
        duration: animationSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });

    // 容器整体脉冲效果
    const pulseAnimation = gsap.to(containerRef.current, {
      scale: isActive ? 1.1 : 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 清理函数
    return () => {
      animations.forEach(anim => anim.kill());
      pulseAnimation.kill();
    };
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 50%, #db2777 100%)',
        padding: '20%'
      }}
    >
      {/* 波形条 */}
      <div className="flex items-end justify-center space-x-1 w-full h-full">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            ref={(el) => { if (el) waveRefs.current[index] = el; }}
            className="bg-white/90 rounded-full transition-all duration-300"
            style={{
              width: `${12 - index * 1}%`,
              height: `${30 + index * 5}%`,
              minHeight: '20%',
              maxHeight: '80%'
            }}
          />
        ))}
      </div>
      
      {/* 外层光晕 */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default AbstractSiriAvatar; 