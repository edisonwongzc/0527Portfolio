import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/**
 * About页面组件 - 交互式文字展示
 * 特色功能：滑动条控制文字颜色变化效果
 */
const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderThumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // 滑动条进度状态 (0-1)
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  // 目标文本
  const targetText = "I'm a digital designer focused on creating thoughtful, experiences, that solve problems and tell stories.";
  
  // 将文本按单词分割
  const words = targetText.split(' ');

  // qclay.design 风格的技能数据
  const capabilities = [
    'Product Design',
    'Brand Strategy', 
    'Creative Direction',
    'User Experience',
    'Visual Identity',
    'Digital Strategy',
    'Art Direction',
    'Design Systems'
  ];

  // 工作经历数据
  const experience = [
    {
      year: '2022 — Present',
      role: 'Creative Director',
      company: 'Independent'
    },
    {
      year: '2020 — 2022',
      role: 'Senior Product Designer',
      company: 'Spotify'
    },
    {
      year: '2018 — 2020',
      role: 'Design Lead',
      company: 'Airbnb'
    },
    {
      year: '2016 — 2018',
      role: 'Visual Designer',
      company: 'Google'
    }
  ];

  // 服务项目数据
  const services = [
    {
      title: 'Digital Product Design',
      description: 'Creating intuitive and engaging digital experiences for web and mobile platforms.'
    },
    {
      title: 'Brand Development',
      description: 'Developing comprehensive brand identities that resonate with target audiences.'
    },
    {
      title: 'Creative Direction',
      description: 'Leading creative vision and strategy for campaigns, products, and experiences.'
    },
    {
      title: 'Design Consultation',
      description: 'Providing strategic design guidance to help businesses reach their goals.'
    }
  ];

  /**
   * 计算当前应该激活的单词数量
   */
  const getActiveWordCount = useCallback(() => {
    return Math.floor(sliderProgress * words.length);
  }, [sliderProgress, words.length]);

  /**
   * 更新滑动条位置
   */
  const updateSliderPosition = useCallback((progress: number) => {
    if (sliderThumbRef.current && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const maxY = rect.height - 20; // 20px是滑动按钮的高度
      gsap.set(sliderThumbRef.current, {
        y: progress * maxY
      });
    }
  }, []);

  /**
   * 处理滑动条拖拽
   */
  const handleSliderMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const progress = Math.max(0, Math.min(1, y / rect.height));
    
    setSliderProgress(progress);
    updateSliderPosition(progress);

    // 检查是否可以滚动到下一页
    setCanScroll(progress >= 0.99);
  }, [updateSliderPosition]);

  /**
   * 处理鼠标按下事件
   */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderMove(e);
    
    const handleMouseMove = (e: MouseEvent) => {
      handleSliderMove(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleSliderMove]);

  /**
   * 处理滚轮事件
   */
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (!canScroll) {
      // 如果还没完成文字效果，控制滑动条
      const delta = e.deltaY > 0 ? 0.05 : -0.05;
      const newProgress = Math.max(0, Math.min(1, sliderProgress + delta));
      setSliderProgress(newProgress);
      updateSliderPosition(newProgress);

      // 检查是否可以滚动
      setCanScroll(newProgress >= 0.99);
    } else {
      // 允许正常滚动到下一页
      document.body.style.overflow = 'auto';
      window.scrollBy(0, e.deltaY);
    }
  }, [sliderProgress, canScroll, updateSliderPosition]);

  // 处理页面滚动控制
  useEffect(() => {
    const heroElement = heroRef.current;
    
    if (heroElement && !canScroll) {
      // 禁止页面滚动，直到滑动条完成，但保持导航栏可见
      document.body.style.overflow = 'hidden';
      // 确保导航栏始终可见
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.position = 'fixed';
        (navbar as HTMLElement).style.top = '0';
        (navbar as HTMLElement).style.zIndex = '2147483647';
        (navbar as HTMLElement).style.visibility = 'visible';
        (navbar as HTMLElement).style.opacity = '1';
      }
      heroElement.addEventListener('wheel', handleWheel, { passive: false });
    } else if (canScroll) {
      document.body.style.overflow = 'auto';
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('wheel', handleWheel);
      }
      document.body.style.overflow = 'auto';
      // 确保导航栏在清理时仍然可见
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.position = 'fixed';
        (navbar as HTMLElement).style.top = '0';
        (navbar as HTMLElement).style.zIndex = '2147483647';
        (navbar as HTMLElement).style.visibility = 'visible';
        (navbar as HTMLElement).style.opacity = '1';
      }
    };
  }, [handleWheel, canScroll]);

  // 初始化滑动条位置
  useEffect(() => {
    updateSliderPosition(sliderProgress);
  }, [sliderProgress, updateSliderPosition]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 英雄区域动画
      gsap.fromTo(heroRef.current?.children || [], 
        { 
          y: 80, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2
        }
      );

      // 内容区域动画
      gsap.fromTo(contentRef.current?.children || [],
        { 
          y: 60, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 技能标签动画
      gsap.fromTo('.capability-tag',
        { 
          scale: 0.8, 
          opacity: 0,
          y: 20
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.capabilities-section',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 服务项目动画
      gsap.fromTo('.service-item',
        { 
          x: -30,
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.services-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA动画
      gsap.fromTo(ctaRef.current?.children || [],
        { 
          y: 40, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* 英雄区域 - 交互式文字展示 */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          {/* 主标题 */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extralight text-white leading-none tracking-tighter mb-8">
              About
            </h1>
          </div>

          {/* 交互式文字区域 */}
          <div className="flex items-center justify-center">
            {/* 文字容器 */}
            <div ref={textContainerRef} className="max-w-5xl text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed tracking-wide">
                {words.map((word, index) => {
                  const isActive = index < getActiveWordCount();
                  return (
                    <span
                      key={index}
                      className={`inline-block mr-3 md:mr-4 transition-all duration-500 ease-out transform ${
                        isActive 
                          ? 'text-white scale-100' 
                          : 'text-gray-600 scale-95'
                      }`}
                      style={{
                        filter: isActive ? 'blur(0px)' : 'blur(0.5px)',
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>

          {/* 进度指示器 */}
          <div className="text-center mt-20">
            <div className="text-gray-400 text-lg font-light">
              {Math.round(sliderProgress * 100)}% complete
            </div>
            {canScroll && (
              <div className="mt-6 text-green-400 text-lg animate-pulse font-light">
                ↓ Scroll to continue
              </div>
            )}
          </div>
        </div>

        {/* 右侧滑动条 - 增强样式 */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div 
            ref={sliderRef}
            className="relative w-2 h-96 bg-gray-800/60 backdrop-blur-sm rounded-full cursor-pointer border border-gray-700/50 shadow-2xl"
            onMouseDown={handleMouseDown}
          >
            {/* 进度轨道 */}
            <div 
              className="absolute top-0 left-0 w-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                height: `${sliderProgress * 100}%`,
                background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)'
              }}
            />
            
            {/* 滑动按钮 */}
            <div
              ref={sliderThumbRef}
              className="absolute w-6 h-6 bg-white rounded-full -left-2 cursor-grab active:cursor-grabbing shadow-xl border-2 border-gray-200 hover:scale-110 transition-transform duration-200"
              style={{ 
                top: '0px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            />
          </div>
          
          {/* 滑动条标签 */}
          <div className="text-gray-400 text-xs mt-6 text-center font-light tracking-wide">
            Drag or scroll
          </div>
        </div>
      </section>

      {/* 内容区域 - 工作经历与信息 */}
      <section ref={contentRef} className="px-6 lg:px-12 py-32 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* 工作经历 */}
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-12">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="border-b border-gray-800 pb-8 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl md:text-2xl font-light text-white">{exp.role}</h3>
                      <span className="text-sm text-gray-500 font-light">{exp.year}</span>
                    </div>
                    <p className="text-gray-400 text-lg">{exp.company}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 侧边栏信息 */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-lg font-light text-white mb-6">Currently</h3>
                <p className="text-gray-400 leading-relaxed">
                  Independent Creative Director based in San Francisco, 
                  working with clients worldwide.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-white mb-6">Contact</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:hello@edisonwong.com"
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    hello@edisonwong.com
                  </a>
                  
                  <a 
                    href="tel:+1-555-0123" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    +1 (555) 012-3456
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-light text-white mb-6">Follow</h3>
                <div className="space-y-3">
                  <a 
                    href="https://twitter.com/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://dribbble.com/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    Dribbble
                  </a>
                  <a 
                    href="https://linkedin.com/in/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-light text-white mb-6">Availability</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-gray-400">Available for new projects</span>
                </div>
              </div>

              {/* 下载简历按钮 */}
              <div className="pt-8">
                <a 
                  href="/resume.pdf"
                  className="inline-flex items-center text-white border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5 group"
                >
                  <Download size={16} className="mr-3" />
                  Download Resume
                  <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 能力与技能 */}
      <section className="capabilities-section px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-12">Capabilities</h2>
              <div className="flex flex-wrap gap-4">
                {capabilities.map((capability, index) => (
                  <span
                    key={capability}
                    className="capability-tag px-6 py-3 bg-white/5 border border-gray-800 rounded-full text-gray-300 hover:bg-white/10 hover:border-gray-700 transition-all duration-300 text-lg"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="px-6 lg:px-12 py-32 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-16">Services</h2>
              <div className="services-grid space-y-12">
                {services.map((service, index) => (
                  <div key={index} className="service-item border-b border-gray-800 pb-12 last:border-b-0">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section ref={ctaRef} className="px-6 lg:px-12 py-32 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
                Let's work
                <br />
                together
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                I'm currently accepting new projects for 2024. 
                Let's discuss how we can bring your ideas to life.
              </p>
            </div>
            
            <div className="space-y-8">
              <Link 
                to="/contact"
                className="inline-flex items-center text-white border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5 group"
              >
                Start a conversation
                <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
              
              <div className="pt-4">
                <p className="text-gray-600 text-sm">
                  Typical project timeline: 4-12 weeks
                  <br />
                  Budget starting from $10,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 