import { useRef, useEffect, useState } from 'react';
import SpaceWarpBackground from './SpaceWarpBackground';

/**
 * 主要的3D Hero组件
 */
const ThreeHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * 处理鼠标移动事件
     * @param event - 鼠标事件
     */
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 呼吸动画样式 */}
      <style>{`
        @keyframes breathing {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            filter: brightness(0.98);
          }
          50% {
            filter: brightness(1.02);
          }
        }

        .text-gradient {
          background: linear-gradient(to bottom, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(255, 255, 255, 0.8) 20%, 
            rgba(255, 255, 255, 0.5) 40%, 
            rgba(255, 255, 255, 0.2) 70%, 
            rgba(255, 255, 255, 0.05) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          transition: all 0.8s ease-in-out;
        }

        .text-container {
          transition: all 0.8s ease-in-out;
        }

        .text-container .glow-layer {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .text-container:hover .glow-layer {
          opacity: 1;
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.5;
          }
          75% {
            opacity: 0.8;
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          33% {
            transform: translateX(10px) translateY(-10px);
          }
          66% {
            transform: translateX(-5px) translateY(5px);
          }
          100% {
            transform: translateX(0px) translateY(0px);
          }
        }

        @keyframes meteor1 {
          0% {
            transform: translateZ(0px) scale(0.1);
            opacity: 0;
            filter: blur(3px);
          }
          8% {
            opacity: 1;
            filter: blur(2px);
          }
          40% {
            opacity: 1;
            filter: blur(0px);
          }
          70% {
            opacity: 0.3;
            filter: blur(1px);
          }
          85% {
            opacity: 0.05;
            filter: blur(2px);
          }
          100% {
            transform: translateZ(3500px) scale(1.2);
            opacity: 0.05;
            filter: blur(6px);
          }
        }

        @keyframes meteor2 {
          0% {
            transform: translateZ(0px) scale(0.15);
            opacity: 0;
            filter: blur(2.5px);
          }
          6% {
            opacity: 1;
            filter: blur(1.5px);
          }
          35% {
            opacity: 1;
            filter: blur(0px);
          }
          65% {
            opacity: 0.4;
            filter: blur(1px);
          }
          88% {
            opacity: 0.05;
            filter: blur(1.5px);
          }
          100% {
            transform: translateZ(3000px) scale(0.9);
            opacity: 0.05;
            filter: blur(5px);
          }
        }

        @keyframes meteor3 {
          0% {
            transform: translateZ(0px) scale(0.05);
            opacity: 0;
            filter: blur(4px);
          }
          4% {
            opacity: 1;
            filter: blur(3px);
          }
          30% {
            opacity: 1;
            filter: blur(0px);
          }
          60% {
            opacity: 0.5;
            filter: blur(1px);
          }
          90% {
            opacity: 0.05;
            filter: blur(2px);
          }
          100% {
            transform: translateZ(4000px) scale(1.4);
            opacity: 0.05;
            filter: blur(8px);
          }
        }

        @keyframes meteor4 {
          0% {
            transform: translateZ(0px) scale(0.2);
            opacity: 0;
            filter: blur(2px);
          }
          7% {
            opacity: 1;
            filter: blur(1px);
          }
          38% {
            opacity: 1;
            filter: blur(0px);
          }
          68% {
            opacity: 0.35;
            filter: blur(1px);
          }
          87% {
            opacity: 0.05;
            filter: blur(1px);
          }
          100% {
            transform: translateZ(3800px) scale(1.3);
            opacity: 0.05;
            filter: blur(7px);
          }
        }

        @keyframes arrow3DRotate {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: rotateX(15deg) rotateY(90deg);
          }
          50% {
            transform: rotateX(0deg) rotateY(180deg);
          }
          75% {
            transform: rotateX(-15deg) rotateY(270deg);
          }
          100% {
            transform: rotateX(0deg) rotateY(360deg);
          }
        }
      `}</style>

      <div 
        ref={containerRef}
        className="three-hero-container w-full h-screen relative overflow-hidden"
        style={{ 
          perspective: '2000px',
          perspectiveOrigin: 'center center',
          transformStyle: 'preserve-3d',
          // 确保不创建新的层叠上下文，避免影响导航栏和光标
          zIndex: 1
        }}
      >
        {/* 时空穿越粒子背景 - 最底层 */}
        <SpaceWarpBackground />
        
      {/* CSS光束背景 - 温暖大地色调线性渐变 */}
      <div className="absolute inset-0" style={{ zIndex: 2, transformStyle: 'preserve-3d' }}>
        {/* 主光束 - 椭圆形锥形渐变，中心上移且更亮 */}
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{
            background: `
              radial-gradient(ellipse 70% 100% at 50% -15%, 
                rgba(255, 255, 255, 0.5) 0%, 
                rgba(255, 255, 255, 0.4) 10%, 
                rgba(240, 230, 140, 0.35) 20%, 
                rgba(205, 133, 63, 0.3) 40%, 
                rgba(160, 82, 45, 0.25) 60%, 
                rgba(139, 69, 19, 0.2) 75%, 
                rgba(101, 67, 33, 0.15) 85%, 
                rgba(47, 27, 20, 0.1) 95%, 
                transparent 100%
              )
            `,
            animation: 'breathing 16s ease-in-out infinite'
          }}>
        </div>
        
        {/* 光束核心柔光层 */}
        <div 
          className="absolute inset-0" 
          style={{
            background: `
              radial-gradient(ellipse 30% 80% at 50% -10%, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(250, 250, 240, 0.3) 15%, 
                rgba(240, 230, 140, 0.25) 30%, 
                rgba(205, 133, 63, 0.2) 50%, 
                rgba(160, 82, 45, 0.15) 70%, 
                rgba(139, 69, 19, 0.1) 85%, 
                transparent 100%
              )
            `,
            animation: 'breathing 16s ease-in-out infinite'
          }}>
        </div>
        
        {/* 背景粒子效果 */}
        {/* 大粒子 - 温暖大地色调 */}
        <div className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-orange-200/50" 
             style={{ 
               animation: 'float-particle 6s ease-in-out infinite',
               boxShadow: '0 0 10px rgba(205, 133, 63, 0.6), 0 0 20px rgba(160, 82, 45, 0.4), 0 0 30px rgba(139, 69, 19, 0.3)'
             }}></div>
        <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 rounded-full bg-amber-300/40" 
             style={{ 
               animation: 'float-particle 8s ease-in-out infinite 1s',
               boxShadow: '0 0 8px rgba(240, 230, 140, 0.5), 0 0 16px rgba(205, 133, 63, 0.4), 0 0 24px rgba(160, 82, 45, 0.2)'
             }}></div>
        <div className="absolute top-[40%] right-[35%] w-1 h-1 rounded-full bg-yellow-100/45" 
             style={{ 
               animation: 'float-particle 7s ease-in-out infinite 2s',
               boxShadow: '0 0 6px rgba(245, 245, 220, 0.5), 0 0 12px rgba(240, 230, 140, 0.4), 0 0 18px rgba(205, 133, 63, 0.2)'
             }}></div>
        
        {/* 中等粒子 - 温暖大地色调 */}
        <div className="absolute top-[15%] right-[40%] w-1 h-1 rounded-full bg-amber-200/35" 
             style={{ 
               animation: 'drift 10s ease-in-out infinite',
               boxShadow: '0 0 6px rgba(240, 230, 140, 0.4), 0 0 12px rgba(205, 133, 63, 0.3)'
             }}></div>
        <div className="absolute top-[70%] right-[30%] w-0.5 h-0.5 rounded-full bg-yellow-100/45" 
             style={{ 
               animation: 'drift 12s ease-in-out infinite 3s',
               boxShadow: '0 0 4px rgba(245, 245, 220, 0.5), 0 0 8px rgba(240, 230, 140, 0.4)'
             }}></div>
        <div className="absolute top-[30%] right-[20%] w-0.5 h-0.5 rounded-full bg-orange-200/35" 
             style={{ 
               animation: 'drift 9s ease-in-out infinite 1.5s',
               boxShadow: '0 0 4px rgba(205, 133, 63, 0.4), 0 0 8px rgba(160, 82, 45, 0.25)'
             }}></div>
        
        {/* 小粒子 - 温暖大地色调 */}
        <div className="absolute top-[25%] right-[45%] w-0.5 h-0.5 rounded-full bg-yellow-50/20" 
             style={{ 
               animation: 'float-particle 5s ease-in-out infinite 4s',
               boxShadow: '0 0 3px rgba(245, 245, 220, 0.3), 0 0 6px rgba(240, 230, 140, 0.2)'
             }}></div>
        <div className="absolute top-[50%] right-[10%] w-px h-px rounded-full bg-orange-200/25" 
             style={{ 
               animation: 'drift 8s ease-in-out infinite 2.5s',
               boxShadow: '0 0 2px rgba(205, 133, 63, 0.4), 0 0 4px rgba(160, 82, 45, 0.2)'
             }}></div>
        <div className="absolute top-[80%] right-[25%] w-px h-px rounded-full bg-amber-100/15" 
             style={{ 
               animation: 'float-particle 6s ease-in-out infinite 3.5s',
               boxShadow: '0 0 2px rgba(240, 230, 140, 0.3), 0 0 4px rgba(205, 133, 63, 0.2)'
             }}></div>
        
        {/* 远景粒子 - 温暖大地色调 */}
        <div className="absolute top-[10%] left-[70%] w-0.5 h-0.5 rounded-full bg-yellow-50/10" 
             style={{ 
               animation: 'drift 15s ease-in-out infinite',
               boxShadow: '0 0 3px rgba(245, 245, 220, 0.2), 0 0 6px rgba(240, 230, 140, 0.1)'
             }}></div>
        <div className="absolute top-[45%] left-[80%] w-px h-px rounded-full bg-orange-100/15" 
             style={{ 
               animation: 'float-particle 11s ease-in-out infinite 5s',
               boxShadow: '0 0 2px rgba(205, 133, 63, 0.3), 0 0 4px rgba(160, 82, 45, 0.15)'
             }}></div>
        <div className="absolute top-[75%] left-[75%] w-px h-px rounded-full bg-amber-100/20" 
             style={{ 
               animation: 'drift 13s ease-in-out infinite 1s',
               boxShadow: '0 0 2px rgba(240, 230, 140, 0.3), 0 0 4px rgba(205, 133, 63, 0.2)'
             }}></div>

        {/* Z轴流星效果 - 从中心往外冲的高速亮粒子（随机分布，减少数量） */}
        {/* 主要流星粒子 - 随机位置和时间 */}
        <div className="absolute top-[43%] left-[52%] w-1 h-1 rounded-full bg-white" 
             style={{ 
               animation: 'meteor1 4.2s linear infinite 0.6s',
               boxShadow: '0 0 8px rgba(255, 255, 255, 1), 0 0 16px rgba(240, 230, 140, 0.8), 0 0 24px rgba(205, 133, 63, 0.6)',
               transformOrigin: 'center center'
             }}></div>

        <div className="absolute top-[38%] left-[45%] w-0.5 h-0.5 rounded-full bg-amber-100" 
             style={{ 
               animation: 'meteor3 5.1s linear infinite 3.1s',
               boxShadow: '0 0 6px rgba(240, 230, 140, 1), 0 0 12px rgba(205, 133, 63, 0.8), 0 0 18px rgba(160, 82, 45, 0.6)',
               transformOrigin: 'center center'
             }}></div>

        <div className="absolute top-[61%] left-[58%] w-0.5 h-0.5 rounded-full bg-yellow-50" 
             style={{ 
               animation: 'meteor2 3.8s linear infinite 5.7s',
               boxShadow: '0 0 5px rgba(245, 245, 220, 1), 0 0 10px rgba(240, 230, 140, 0.8), 0 0 15px rgba(205, 133, 63, 0.6)',
               transformOrigin: 'center center'
             }}></div>

        <div className="absolute top-[29%] left-[67%] w-px h-px rounded-full bg-orange-100/80" 
             style={{ 
               animation: 'meteor4 4.6s linear infinite 8.2s',
               boxShadow: '0 0 4px rgba(205, 133, 63, 1), 0 0 8px rgba(160, 82, 45, 0.8), 0 0 12px rgba(139, 69, 19, 0.6)',
               transformOrigin: 'center center'
             }}></div>

        <div className="absolute top-[72%] left-[41%] w-px h-px rounded-full bg-white/70" 
             style={{ 
               animation: 'meteor1 3.5s linear infinite 11.4s',
               boxShadow: '0 0 3px rgba(255, 255, 255, 0.9), 0 0 6px rgba(240, 230, 140, 0.7)',
               transformOrigin: 'center center'
             }}></div>

        {/* 左下角区域流星 - 平衡视觉效果 */}
        <div className="absolute top-[68%] left-[25%] w-0.5 h-0.5 rounded-full bg-amber-50" 
             style={{ 
               animation: 'meteor2 4.3s linear infinite 2.8s',
               boxShadow: '0 0 5px rgba(240, 230, 140, 0.9), 0 0 10px rgba(205, 133, 63, 0.7)',
               transformOrigin: 'center center'
             }}></div>

        <div className="absolute top-[78%] left-[18%] w-px h-px rounded-full bg-yellow-100/80" 
             style={{ 
               animation: 'meteor4 3.9s linear infinite 7.6s',
               boxShadow: '0 0 3px rgba(245, 245, 220, 0.8), 0 0 6px rgba(240, 230, 140, 0.6)',
               transformOrigin: 'center center'
             }}></div>

        <div className="absolute top-[82%] left-[32%] w-px h-px rounded-full bg-orange-100/70" 
             style={{ 
               animation: 'meteor3 4.7s linear infinite 13.2s',
               boxShadow: '0 0 2px rgba(205, 133, 63, 0.8), 0 0 4px rgba(160, 82, 45, 0.6)',
               transformOrigin: 'center center'
             }}></div>

      </div>

            {/* 3D HTML文字空间 */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          zIndex: 3,
          transform: `
            rotateX(${mousePosition.y * 10}deg) 
            rotateY(${mousePosition.x * 10}deg)
            translateZ(${mousePosition.x * 30}px)
          `
        }}
      >
        {/* 整体文字容器 */}
        <div 
          className="text-center relative"
          style={{
            transform: `
              translateX(${mousePosition.x * 50}px) 
              translateY(${mousePosition.y * 30}px) 
              translateZ(${Math.abs(mousePosition.x) * 50}px)
            `
          }}
        >
          {/* 主标题 - 白色实色到透明度渐变 */}
          <div 
            className="font-bold tracking-tight uppercase mb-4 relative text-container cursor-pointer"
            style={{
              fontSize: '6.75rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              animation: 'glow-pulse 16s ease-in-out infinite'
            }}
          >
            {/* 悬停发光层 */}
            <div 
              className="absolute inset-0 font-bold tracking-tight uppercase glow-layer"
              style={{
                fontSize: '6.75rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.6)',
                filter: 'blur(8px)',
                zIndex: -1
              }}
            >
              Edison Wong
            </div>
            <div 
              className="absolute inset-0 font-bold tracking-tight uppercase glow-layer"
              style={{
                fontSize: '6.75rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.4)',
                filter: 'blur(15px)',
                zIndex: -2
              }}
            >
              Edison Wong
            </div>
            <div 
              className="absolute inset-0 font-bold tracking-tight uppercase glow-layer"
              style={{
                fontSize: '6.75rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.3)',
                filter: 'blur(25px)',
                zIndex: -3
              }}
            >
              Edison Wong
            </div>
            <div 
              className="absolute inset-0 font-bold tracking-tight uppercase glow-layer"
              style={{
                fontSize: '6.75rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.2)',
                filter: 'blur(40px)',
                zIndex: -4
              }}
            >
              Edison Wong
            </div>
            {/* 主文字层 */}
            <div className="text-gradient relative" style={{ zIndex: 4 }}>
            Edison Wong
            </div>
          </div>
          
          {/* 副标题 - 作为整体的一部分 */}
          <div 
            className="text-gray-300 font-light tracking-wide leading-relaxed"
            style={{
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Redefine digitalization through AI technology<br />
            and experiential thinking
          </div>
        </div>
      </div>
      
        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm" style={{ zIndex: 5, color: '#28D467' }}>
          <div className="flex flex-col items-center animate-bounce">
            <span className="mb-2">Scroll to explore</span>
            <svg 
              className="w-4 h-6" 
              fill="none" 
              stroke="#28D467" 
              viewBox="0 0 24 24"
              style={{
                animation: 'arrow3DRotate 3s ease-in-out infinite',
                transformStyle: 'preserve-3d'
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeHero; 