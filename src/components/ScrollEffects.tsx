import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 高级ScrollTrigger效果组件
 * 包含多种现代滚动动画效果
 */
const ScrollEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const morphingSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. 图片序列动画效果
      const imageSequence = () => {
        const images = gsap.utils.toArray<HTMLElement>('.sequence-image');
        
        gsap.set(images, { opacity: 0 });
        gsap.set(images[0], { opacity: 1 });
        
        ScrollTrigger.create({
          trigger: '.image-sequence-container',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIndex = Math.floor(progress * (images.length - 1));
            
            images.forEach((img, index) => {
              gsap.set(img, { 
                opacity: index === currentIndex ? 1 : 0 
              });
            });
          }
        });
      };

      // 2. 水平滚动效果
      const horizontalScroll = () => {
        const sections = gsap.utils.toArray<HTMLElement>('.horizontal-section');
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.horizontal-container',
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => `+=${document.querySelector('.horizontal-container')?.scrollWidth}`
          }
        });
      };

      // 3. 3D卡片翻转效果
      const cardFlipEffect = () => {
        gsap.utils.toArray<HTMLElement>('.flip-card').forEach((card, index) => {
          gsap.fromTo(card, 
            {
              rotationY: -90,
              opacity: 0,
              scale: 0.8
            },
            {
              rotationY: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              delay: index * 0.2
            }
          );
        });
      };

      // 4. 文字打字机效果
      const typewriterEffect = () => {
        const text = textRevealRef.current?.querySelector('.typewriter-text');
        if (!text) return;
        
        const originalText = text.textContent || '';
        text.textContent = '';
        
        gsap.to({}, {
          duration: originalText.length * 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: function() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * originalText.length);
            text.textContent = originalText.slice(0, currentLength);
          }
        });
      };

      // 5. 粒子爆炸效果
      const particleExplosion = () => {
        const particles = gsap.utils.toArray<HTMLElement>('.particle');
        
        gsap.fromTo(particles, 
          {
            scale: 0,
            opacity: 0,
            rotation: 0
          },
          {
            scale: gsap.utils.random(0.5, 1.5),
            opacity: 1,
            rotation: gsap.utils.random(-360, 360),
            x: () => gsap.utils.random(-300, 300),
            y: () => gsap.utils.random(-300, 300),
            duration: 2,
            ease: 'power2.out',
            stagger: {
              amount: 0.5,
              from: 'center'
            },
            scrollTrigger: {
              trigger: '.particle-container',
              start: 'top center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      };

      // 6. 滚动劫持 - 平滑滚动
      const smoothScrollHijack = () => {
        ScrollTrigger.create({
          trigger: '.smooth-section',
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const smoothFactor = gsap.utils.mapRange(-2000, 2000, 0.8, 1.2, velocity);
            
            gsap.to('.smooth-content', {
              scale: smoothFactor,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      };

      // 7. 变形动画效果
      const morphingShapes = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: morphingSectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        });

        tl.to('.morph-circle', {
          borderRadius: '0%',
          rotation: 45,
          scale: 1.5,
          backgroundColor: '#ff6b6b'
        })
        .to('.morph-circle', {
          borderRadius: '20%',
          rotation: 90,
          scale: 0.8,
          backgroundColor: '#4ecdc4'
        })
        .to('.morph-circle', {
          borderRadius: '50%',
          rotation: 180,
          scale: 1,
          backgroundColor: '#45b7d1'
        });
      };

      // 8. 数字计数动画
      const counterAnimation = () => {
        gsap.utils.toArray<HTMLElement>('.counter').forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0');
          
          gsap.fromTo(counter, 
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      };

      // 执行所有效果
      imageSequence();
      horizontalScroll();
      cardFlipEffect();
      typewriterEffect();
      particleExplosion();
      smoothScrollHijack();
      morphingShapes();
      counterAnimation();

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="scroll-effects-container">
      {/* 图片序列动画 */}
      <section className="image-sequence-container min-h-screen flex items-center justify-center bg-gray-900">
        <div className="relative w-96 h-96">
          {[1,2,3,4,5].map(i => (
            <img
              key={i}
              src={`https://images.unsplash.com/photo-${1500000000 + i}?w=400&h=400&fit=crop`}
              alt={`Sequence ${i}`}
              className="sequence-image absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          ))}
        </div>
      </section>

      {/* 水平滚动区域 */}
      <section className="horizontal-container min-h-screen overflow-hidden">
        <div className="flex horizontal-sections w-[500vw]">
          {[1,2,3,4,5].map(i => (
            <div 
              key={i}
              className="horizontal-section w-screen h-screen flex items-center justify-center text-white text-6xl font-light"
              style={{ backgroundColor: `hsl(${i * 72}, 70%, 50%)` }}
            >
              Section {i}
            </div>
          ))}
        </div>
      </section>

      {/* 3D卡片翻转 */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div 
              key={i}
              className="flip-card bg-dark border border-gray-800 rounded-2xl p-8 h-64 flex items-center justify-center"
            >
              <h3 className="text-white text-2xl font-light">Card {i}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 文字打字机效果 */}
      <section ref={textRevealRef} className="py-32 px-6 text-center">
        <h2 className="typewriter-text text-4xl md:text-6xl font-light text-white">
          这段文字会像打字机一样逐字显示出来
        </h2>
      </section>

      {/* 粒子爆炸效果 */}
      <section className="particle-container py-32 relative overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-8">粒子爆炸效果</h2>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle w-4 h-4 bg-blue-500 rounded-full absolute"
            />
          ))}
        </div>
      </section>

      {/* 变形动画 */}
      <section ref={morphingSectionRef} className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-white mb-16">形状变形动画</h2>
          <div className="flex justify-center">
            <div className="morph-circle w-32 h-32 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 数字计数动画 */}
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="counter text-5xl font-light text-white mb-4" data-target="1000">0</div>
            <p className="text-gray-400">项目完成数</p>
          </div>
          <div>
            <div className="counter text-5xl font-light text-white mb-4" data-target="500">0</div>
            <p className="text-gray-400">客户满意度</p>
          </div>
          <div>
            <div className="counter text-5xl font-light text-white mb-4" data-target="99">0</div>
            <p className="text-gray-400">成功率</p>
          </div>
          <div>
            <div className="counter text-5xl font-light text-white mb-4" data-target="24">0</div>
            <p className="text-gray-400">小时服务</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollEffects; 