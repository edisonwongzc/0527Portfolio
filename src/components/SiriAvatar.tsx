import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SiriAvatarProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

/**
 * Siri风格的抽象动态头像组件
 * @param size - 头像大小，默认32
 * @param isActive - 是否激活状态（影响动画强度）
 * @param className - 额外的CSS类名
 */
const SiriAvatar = ({ size = 32, isActive = false, className = '' }: SiriAvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const waves = waveRefs.current.filter(Boolean);
    if (waves.length === 0) return;

    // 创建波形动画
    const createWaveAnimation = (wave: SVGPathElement, delay: number, amplitude: number) => {
      const tl = gsap.timeline({ repeat: -1 });
      
      // 基础波形路径
      const basePath = `M0,${size/2} Q${size/4},${size/2} ${size/2},${size/2} T${size},${size/2}`;
      
      // 动画波形路径
      const animatedPaths = [
        `M0,${size/2} Q${size/4},${size/2 - amplitude} ${size/2},${size/2} T${size},${size/2}`,
        `M0,${size/2} Q${size/4},${size/2 + amplitude} ${size/2},${size/2} T${size},${size/2}`,
        `M0,${size/2} Q${size/4},${size/2} ${size/2},${size/2 - amplitude} T${size},${size/2}`,
        `M0,${size/2} Q${size/4},${size/2} ${size/2},${size/2 + amplitude} T${size},${size/2}`,
        basePath
      ];

      tl.set(wave, { attr: { d: basePath } })
        .to(wave, { 
          attr: { d: animatedPaths[0] }, 
          duration: 0.3 + Math.random() * 0.2,
          ease: "sine.inOut",
          delay: delay
        })
        .to(wave, { 
          attr: { d: animatedPaths[1] }, 
          duration: 0.4 + Math.random() * 0.2,
          ease: "sine.inOut"
        })
        .to(wave, { 
          attr: { d: animatedPaths[2] }, 
          duration: 0.3 + Math.random() * 0.2,
          ease: "sine.inOut"
        })
        .to(wave, { 
          attr: { d: animatedPaths[3] }, 
          duration: 0.4 + Math.random() * 0.2,
          ease: "sine.inOut"
        })
        .to(wave, { 
          attr: { d: basePath }, 
          duration: 0.3 + Math.random() * 0.2,
          ease: "sine.inOut"
        });

      return tl;
    };

    // 为每个波形创建动画
    const animations = waves.map((wave, index) => {
      const amplitude = isActive ? (3 + index * 2) : (1 + index * 0.5);
      const delay = index * 0.1;
      return createWaveAnimation(wave as SVGPathElement, delay, amplitude);
    });

    // 容器呼吸效果
    const breatheAnimation = gsap.to(containerRef.current, {
      scale: isActive ? 1.05 : 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 清理函数
    return () => {
      animations.forEach(anim => anim.kill());
      breatheAnimation.kill();
    };
  }, [size, isActive]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 背景渐变圆 */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-80"
        style={{ 
          background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)',
          filter: 'blur(1px)'
        }}
      />
      
      {/* 内层渐变圆 */}
      <div 
        className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 opacity-90"
        style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 50%, #db2777 100%)'
        }}
      />

      {/* 波形SVG */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))' }}
      >
        {/* 多层波形 */}
        {[0, 1, 2, 3].map((index) => (
          <path
            key={index}
            ref={(el) => { waveRefs.current[index] = el; }}
            d={`M0,${size/2} Q${size/4},${size/2} ${size/2},${size/2} T${size},${size/2}`}
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={1.5 - index * 0.2}
            strokeLinecap="round"
            opacity={0.9 - index * 0.15}
            transform={`translate(0, ${(index - 1.5) * 2})`}
          />
        ))}
        
        {/* 中心点 */}
        <circle
          cx={size/2}
          cy={size/2}
          r="2"
          fill="rgba(255,255,255,0.9)"
          className="animate-pulse"
        />
      </svg>

      {/* 外层光晕效果 */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 2s ease-in-out infinite alternate'
        }}
      />
    </div>
  );
};

export default SiriAvatar; 