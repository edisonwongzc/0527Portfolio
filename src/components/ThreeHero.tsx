import { useRef, useEffect, useState } from 'react';
import SpaceWarpBackground from './SpaceWarpBackground';

/**
 * 主要的3D Hero组件
 */
const ThreeHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Canvas光束动画效果
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 设置混合模式
      ctx.globalCompositeOperation = 'screen';
      
      // 创建动态光束粒子
      for (let i = 0; i < 50; i++) {
        const x = Math.sin(time + i * 0.1) * 200 + canvas.width * 0.8;
        const y = Math.cos(time + i * 0.15) * 100 + canvas.height * 0.5;
        const size = Math.sin(time + i * 0.2) * 2 + 3;
        const opacity = Math.sin(time + i * 0.3) * 0.3 + 0.4;
        
        // 创建径向渐变
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 208, 134, ${opacity * 0.7})`);
        gradient.addColorStop(1, 'rgba(255, 208, 134, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // 添加流动光线
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 5; i++) {
        const startX = canvas.width * 0.9;
        const startY = canvas.height * 0.3 + i * 100;
        const endX = canvas.width * 0.7 + Math.sin(time + i) * 50;
        const endY = canvas.height * 0.7 + Math.cos(time + i) * 30;
        
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 208, 134, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 208, 134, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
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
          background: linear-gradient(to left, 
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
          zIndex: 1
        }}
      >
        {/* 时空穿越粒子背景 - 最底层 */}
        <SpaceWarpBackground />
        
        {/* 新的Canvas光束背景 - 使用conic-gradient和canvas */}
        <div className="absolute -inset-y-[25%] -right-24 flex w-[100vw] flex-col md:-right-6 md:w-[1200px] blur" 
             style={{
               maskImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))', 
               opacity: 1, 
               transform: 'none',
               zIndex: 2, 
               transformStyle: 'preserve-3d'
             }}>
          {/* 上半部分光束 */}
          <div className="grow" 
               style={{
                 background: 'conic-gradient(from 180deg at 99.78% 35% in lab, rgb(255, 255, 255) 18deg, rgb(255, 208, 134) 36deg, rgba(17, 17, 17, 0) 90deg, rgba(17, 17, 17, 0) 342deg, rgb(255, 255, 255) 360deg)'
               }}>
          </div>
          
          {/* 下半部分光束 */}
          <div className="grow" 
               style={{
                 background: 'conic-gradient(from 0deg at 99.78% 65% in lab, rgb(255, 255, 255) 0deg, rgba(17, 17, 17, 0) 18deg, rgba(17, 17, 17, 0) 270deg, rgb(255, 208, 134) 324deg, rgb(255, 255, 255) 342deg)'
               }}>
          </div>
          
          {/* Canvas层 */}
          <canvas className="absolute inset-0 h-full w-full" width="1200" height="1197" ref={canvasRef}></canvas>
        </div>

        {/* 3D HTML文字空间 */}
        <div 
          className="absolute inset-0 flex items-start justify-start"
          style={{
            transformStyle: 'preserve-3d',
            zIndex: 3,
            paddingLeft: '48px',
            paddingTop: '35vh',
            transform: `
              rotateX(${mousePosition.y * 10}deg) 
              rotateY(${mousePosition.x * 10}deg)
              translateZ(${mousePosition.x * 30}px)
            `
          }}
        >
          {/* 整体文字容器 */}
          <div 
            className="relative"
            style={{
              transform: `
                translateX(${mousePosition.x * 50}px) 
                translateY(${mousePosition.y * 30}px) 
                translateZ(${Math.abs(mousePosition.x) * 50}px)
              `,
              textAlign: 'left',
              maxWidth: '90%'
            }}
          >
            {/* 主标题 - 白色实色到透明度渐变 */}
            <div 
              className="font-bold tracking-tight uppercase mb-0 relative text-container cursor-pointer"
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
              className="text-gray-300 font-light tracking-wide leading-relaxed -mt-4"
              style={{
                fontSize: '1.1rem',
                maxWidth: '800px',
                marginLeft: '2px',
                marginBottom: '228px'
              }}
            >
              Redefine digitalization through AI technology and experiential thinking
            </div>
            
            {/* 滚动提示 - 移到文字下方 */}
            <div className="text-sm" style={{ color: '#28D467', marginLeft: '2px' }}>
              <div className="flex items-center animate-bounce">
                <span className="mr-2">Scroll to explore</span>
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
        </div>
      </div>
    </>
  );
};

export default ThreeHero; 