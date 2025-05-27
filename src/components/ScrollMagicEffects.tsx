import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollMagic效果重现组件
 * 使用GSAP ScrollTrigger实现ScrollMagic的所有经典效果
 */
const ScrollMagicEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinElementRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. 经典Pin效果 - 元素固定滚动
      ScrollTrigger.create({
        trigger: pinElementRef.current,
        start: 'top center',
        end: '+=500',
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // 固定期间的动画效果
          gsap.to(pinElementRef.current, {
            rotation: self.progress * 360,
            scale: 1 + self.progress * 0.5,
            duration: 0.1
          });
        }
      });

      // 2. 视差滚动效果 - 多层视差
      const parallaxElements = gsap.utils.toArray<HTMLElement>('.parallax-element');
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        gsap.to(element, {
          yPercent: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // 3. 滚动进度条效果
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          gsap.to('.progress-bar', {
            scaleX: self.progress,
            duration: 0.1
          });
        }
      });

      // 4. 分段动画 - ScrollMagic经典场景
      const sections = gsap.utils.toArray<HTMLElement>('.magic-section');
      sections.forEach((section, index) => {
        const isEven = index % 2 === 0;
        
        gsap.fromTo(section.querySelector('.section-content'), 
          {
            x: isEven ? -100 : 100,
            opacity: 0,
            rotation: isEven ? -10 : 10
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              // ScrollMagic风格的回调
              onEnter: () => {
                section.classList.add('active');
                console.log(`Section ${index + 1} entered`);
              },
              onLeave: () => {
                section.classList.remove('active');
                console.log(`Section ${index + 1} left`);
              }
            }
          }
        );
      });

      // 5. 同步滚动动画 - 像播放控制器
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.sync-animation-container',
          start: 'top center',
          end: 'bottom center',
          scrub: 1, // 与滚动完全同步
        }
      });

      timeline
        .to('.sync-box-1', { x: 300, rotation: 180, backgroundColor: '#ff6b6b' })
        .to('.sync-box-2', { y: -200, scale: 1.5, backgroundColor: '#4ecdc4' }, 0)
        .to('.sync-box-3', { rotation: 360, borderRadius: '50%', backgroundColor: '#45b7d1' }, 0.5);

      // 6. CSS类切换效果
      gsap.utils.toArray<HTMLElement>('.toggle-element').forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            element.classList.add('scrolled');
            gsap.to(element, { scale: 1.1, duration: 0.3 });
          },
          onLeave: () => {
            element.classList.remove('scrolled');
            gsap.to(element, { scale: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            element.classList.add('scrolled');
            gsap.to(element, { scale: 1.1, duration: 0.3 });
          },
          onLeaveBack: () => {
            element.classList.remove('scrolled');
            gsap.to(element, { scale: 1, duration: 0.3 });
          }
        });
      });

      // 7. 水平滚动劫持 - ScrollMagic的招牌效果
      const horizontalSections = gsap.utils.toArray<HTMLElement>('.horizontal-panel');
      if (horizontalSections.length > 0) {
        gsap.to(horizontalSections, {
          xPercent: -100 * (horizontalSections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.horizontal-scroll-container',
            pin: true,
            scrub: 1,
            snap: 1 / (horizontalSections.length - 1),
            end: () => `+=${document.querySelector('.horizontal-scroll-container')?.scrollWidth}`
          }
        });
      }

      // 8. 无限滚动模拟
      let infiniteScrollTrigger: ScrollTrigger;
      const setupInfiniteScroll = () => {
        infiniteScrollTrigger = ScrollTrigger.create({
          trigger: '.infinite-scroll-trigger',
          start: 'bottom bottom',
          onEnter: () => {
            console.log('加载更多内容...');
            // 模拟异步加载
            setTimeout(() => {
              const container = document.querySelector('.infinite-content');
              if (container) {
                const newItem = document.createElement('div');
                newItem.className = 'infinite-item p-8 border-b border-gray-700 text-white';
                newItem.textContent = `新加载的内容项 ${Date.now()}`;
                container.appendChild(newItem);
                
                // 重新计算ScrollTrigger
                ScrollTrigger.refresh();
              }
            }, 500);
          }
        });
      };
      setupInfiniteScroll();

      // 9. 高级视差 - 多层深度
      gsap.utils.toArray<HTMLElement>('.depth-layer').forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '1');
        gsap.to(layer, {
          yPercent: -50 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: '.depth-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="scroll-magic-effects">
      {/* 固定滚动进度条 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left scale-x-0"></div>
      </div>

      {/* 滚动进度显示 */}
      <div className="fixed top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full z-50">
        {Math.round(scrollProgress * 100)}%
      </div>

      {/* 1. Pin效果演示 */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="text-center text-white">
          <h1 className="text-6xl font-light mb-8">ScrollMagic Effects</h1>
          <p className="text-xl text-gray-300">使用GSAP ScrollTrigger重现所有经典效果</p>
        </div>
      </section>

      <section className="h-screen bg-gray-100"></section>

      <div ref={pinElementRef} className="w-64 h-64 bg-gradient-to-br from-red-500 to-pink-500 mx-auto flex items-center justify-center text-white text-2xl font-bold rounded-2xl shadow-2xl">
        Fixed Element
      </div>

      <section className="h-screen bg-gray-200"></section>

      {/* 2. 视差滚动区域 */}
      <section ref={parallaxContainerRef} className="relative h-[200vh] overflow-hidden bg-black">
        <div className="parallax-element absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900" data-depth="0.2"></div>
        <div className="parallax-element absolute inset-0 flex items-center justify-center">
          <h2 className="text-6xl font-light text-white text-center">视差滚动效果</h2>
        </div>
        <div className="parallax-element absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent" data-depth="0.8"></div>
      </section>

      {/* 3. 分段动画 */}
      {[1, 2, 3, 4].map((num) => (
        <section key={num} className="magic-section h-screen flex items-center justify-center" style={{ backgroundColor: `hsl(${num * 60}, 70%, 20%)` }}>
          <div className="section-content text-center">
            <h3 className="text-5xl font-light text-white mb-4">Section {num}</h3>
            <p className="text-xl text-gray-300">ScrollMagic风格的分段动画</p>
          </div>
        </section>
      ))}

      {/* 4. 同步滚动动画 */}
      <section className="sync-animation-container h-[200vh] relative bg-gray-900">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-96 h-96">
            <div className="sync-box-1 w-16 h-16 bg-red-500 absolute top-0 left-0"></div>
            <div className="sync-box-2 w-16 h-16 bg-green-500 absolute top-0 right-0"></div>
            <div className="sync-box-3 w-16 h-16 bg-blue-500 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
      </section>

      {/* 5. CSS类切换效果 */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="toggle-element bg-gray-800 rounded-xl p-8 text-center transition-all duration-300">
              <h4 className="text-2xl font-light text-white mb-4">Element {i}</h4>
              <p className="text-gray-400">滚动到此处时会触发CSS类切换</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 水平滚动劫持 */}
      <section className="horizontal-scroll-container h-screen overflow-hidden">
        <div className="flex h-full w-[400vw]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="horizontal-panel w-screen h-full flex items-center justify-center text-white text-6xl font-light" style={{ backgroundColor: `hsl(${i * 90}, 60%, 40%)` }}>
              Panel {i}
            </div>
          ))}
        </div>
      </section>

      {/* 7. 深度视差效果 */}
      <section className="depth-container relative h-[300vh] bg-black overflow-hidden">
        <div className="depth-layer absolute w-full h-full bg-gradient-to-b from-indigo-900 to-purple-900" data-depth="0.1"></div>
        <div className="depth-layer absolute w-full h-full flex items-center justify-center" data-depth="0.3">
          <h2 className="text-7xl font-light text-white">Deep Parallax</h2>
        </div>
        <div className="depth-layer absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent" data-depth="0.7"></div>
      </section>

      {/* 8. 无限滚动 */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-light text-white text-center mb-16">无限滚动演示</h2>
          <div className="infinite-content space-y-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="infinite-item p-8 border-b border-gray-700 text-white">
                <h3 className="text-xl font-light mb-2">内容项 {i}</h3>
                <p className="text-gray-400">这里是一些示例内容，当滚动到底部时会自动加载更多...</p>
              </div>
            ))}
          </div>
          <div className="infinite-scroll-trigger h-20"></div>
        </div>
      </section>

      {/* 结束区域 */}
      <section className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-5xl font-light mb-8">所有ScrollMagic效果已实现！</h2>
          <p className="text-xl text-gray-400">GSAP ScrollTrigger提供更强大的功能和更好的性能</p>
        </div>
      </section>
    </div>
  );
};

export default ScrollMagicEffects; 