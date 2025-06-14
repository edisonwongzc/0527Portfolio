import React, { useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceImages } from '../../config/images';
import SectionContainer from '../SectionContainer';

interface ServicesSectionProps {}

/**
 * 服务区域组件
 */
const ServicesSection = forwardRef<HTMLDivElement, ServicesSectionProps>(
  (props, ref) => {
    
    // 组件内部动画效果
    useEffect(() => {
      // 服务卡片悬停效果 - 磁吸动画
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach((card) => {
        const image = card.querySelector('.service-image');
        const overlay = card.querySelector('.service-overlay');
        
        const handleMouseEnter = (e: Event) => {
          // 不阻止事件传播
          // 磁吸效果
          gsap.to(card, {
            y: -20,
            rotationZ: 2,
            scale: 1.05,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          });
          
          gsap.to(image, { 
            scale: 1.2,
            rotationZ: -1,
            duration: 0.8,
            ease: "power2.out"
          });
          
          gsap.to(overlay, { 
            opacity: 1, 
            duration: 0.4 
          });
        };
        
        const handleMouseLeave = (e: Event) => {
          // 不阻止事件传播
          gsap.to(card, {
            y: 0,
            rotationZ: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          });
          
          gsap.to(image, { 
            scale: 1,
            rotationZ: 0,
            duration: 0.8,
            ease: "power2.out"
          });
          
          gsap.to(overlay, { 
            opacity: 0, 
            duration: 0.4 
          });
        };
        
        // 使用passive事件监听器，不阻止默认行为
        card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        
        // 清理函数
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    }, []);

    return (
      <SectionContainer ref={ref} variant="services" id="services" data-section="services">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="services-title text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                Creative services that deliver results
                <br />
                <span className="text-4xl md:text-6xl text-gray-500">创意服务带来成果</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                From concept to completion, I provide comprehensive design solutions 
                that help brands connect with their audiences and achieve their goals.
                <br />
                <span className="text-base text-gray-600">从概念到完成，我提供全面的设计解决方案，帮助品牌与受众建立联系并实现目标。</span>
              </p>
            </div>
          </div>
        </div>

        {/* 服务展示卡片 */}
        <div className="space-y-8 pr-0 lg:pr-0">
          {/* 服务卡片1 - Design Thinking Exploration */}
          <Link 
            to="/design-thinking" 
            className="block w-full h-full relative z-10"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="service-card group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden bg-black rounded-2xl mb-4">
                <img
                  src={serviceImages.designThinking}
                  alt="Design Thinking Exploration"
                  className="service-image w-full h-full will-change-transform absolute inset-0"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1.0)',
                    transformOrigin: 'center center',
                    pointerEvents: 'none' // 防止图片阻止点击
                  }}
                />
                <div className="service-overlay absolute inset-0 bg-black/30 opacity-0 will-change-opacity" style={{ pointerEvents: 'none' }}></div>
                
                {/* 服务图标 */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ pointerEvents: 'none' }}>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
              </div>
              
              <div style={{ pointerEvents: 'none' }} className="pr-0">
                <h3 className="text-lg font-light text-white mb-2 group-hover:text-gray-300 transition-colors duration-300 whitespace-nowrap overflow-hidden">
                  Design Thinking Exploration <span className="text-base text-gray-500">设计思路探索</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-nowrap overflow-hidden">
                  Innovative design methodologies and creative problem-solving. <span className="text-xs text-gray-600">创新设计方法论和创意问题解决。</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </SectionContainer>
    );
  }
);

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection; 