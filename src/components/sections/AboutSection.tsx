import React, { useRef, useState, useCallback, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticNavItem from '../MagneticNavItem';
import SectionContainer from '../SectionContainer';

interface AboutSectionProps {}

/**
 * About区域组件
 */
const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  (props, ref) => {
    // About section交互状态
    const aboutSliderRef = useRef<HTMLDivElement>(null);
    const aboutSliderThumbRef = useRef<HTMLDivElement>(null);
    const aboutTextRef = useRef<HTMLDivElement>(null);
    const [aboutSliderProgress, setAboutSliderProgress] = useState(0);
    const [aboutCanScroll, setAboutCanScroll] = useState(false);
    const [aboutAnimationActive, setAboutAnimationActive] = useState(false);
    const [aboutAnimationComplete, setAboutAnimationComplete] = useState(false);

    // 目标文本
    const aboutTargetText = "I'm a digital designer focused on creating thoughtful, experiences, that solve problems and tell stories.";
    const aboutTargetTextZh = "我是一名数字设计师，专注于创造深思熟虑的体验，解决问题并讲述故事。";
    const aboutWords = aboutTargetText.split(' ');

    /**
     * 计算About区域当前应该激活的单词数量
     */
    const getAboutActiveWordCount = useCallback(() => {
      return Math.floor(aboutSliderProgress * aboutWords.length);
    }, [aboutSliderProgress, aboutWords.length]);

    /**
     * 更新About滑动条位置
     */
    const updateAboutSliderPosition = useCallback((progress: number) => {
      if (aboutSliderThumbRef.current && aboutSliderRef.current) {
        const rect = aboutSliderRef.current.getBoundingClientRect();
        const maxY = rect.height - 20;
        gsap.set(aboutSliderThumbRef.current, {
          y: progress * maxY
        });
      }
    }, []);

    /**
     * 启动About文字动画
     */
    const startAboutAnimation = useCallback(() => {
      if (aboutAnimationActive) return;
      
      setAboutAnimationActive(true);
      document.body.style.overflow = 'hidden'; // 锁定滚动
      
      // 确保导航栏始终可见
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.position = 'fixed';
        (navbar as HTMLElement).style.top = '0';
        (navbar as HTMLElement).style.zIndex = '2147483647';
        (navbar as HTMLElement).style.visibility = 'visible';
        (navbar as HTMLElement).style.opacity = '1';
      }
      
      // 文字逐个点亮动画，总时长4秒
      const animationDuration = 4000; // 4秒
      const intervalTime = animationDuration / aboutWords.length;
      
      let currentIndex = 0;
      const interval = setInterval(() => {
        const progress = (currentIndex + 1) / aboutWords.length;
        setAboutSliderProgress(progress);
        
        currentIndex++;
        
        if (currentIndex >= aboutWords.length) {
          clearInterval(interval);
          setAboutAnimationComplete(true);
          setAboutCanScroll(true);
          
          // 2秒后自动恢复滚动（如果用户没有手动滚动）
          setTimeout(() => {
            if (aboutAnimationComplete) {
              document.body.style.overflow = 'auto';
              // 确保导航栏仍然可见
              const navbar = document.querySelector('nav');
              if (navbar) {
                (navbar as HTMLElement).style.position = 'fixed';
                (navbar as HTMLElement).style.top = '0';
                (navbar as HTMLElement).style.zIndex = '2147483647';
                (navbar as HTMLElement).style.visibility = 'visible';
                (navbar as HTMLElement).style.opacity = '1';
              }
            }
          }, 2000);
        }
      }, intervalTime);
      
    }, [aboutAnimationActive, aboutAnimationComplete, aboutWords.length]);

    /**
     * 处理用户继续滚动
     */
    const handleContinueScroll = useCallback(() => {
      if (aboutAnimationComplete) {
        document.body.style.overflow = 'auto';
        setAboutAnimationActive(false);
        // 确保导航栏仍然可见
        const navbar = document.querySelector('nav');
        if (navbar) {
          (navbar as HTMLElement).style.position = 'fixed';
          (navbar as HTMLElement).style.top = '0';
          (navbar as HTMLElement).style.zIndex = '2147483647';
          (navbar as HTMLElement).style.visibility = 'visible';
          (navbar as HTMLElement).style.opacity = '1';
        }
      }
    }, [aboutAnimationComplete]);

    // About滑动条初始化
    useEffect(() => {
      updateAboutSliderPosition(aboutSliderProgress);
    }, [aboutSliderProgress, updateAboutSliderPosition]);

    // About区域进入检测 - 改为时间驱动
    useEffect(() => {
      const aboutElement = aboutTextRef.current;
      
      if (aboutElement) {
        // 创建进入检测触发器
        ScrollTrigger.create({
          trigger: aboutElement,
          start: "top 80%",
          end: "top 80%",
          once: true, // 只触发一次
          onEnter: () => {
            startAboutAnimation();
          }
        });

        // 监听滚动事件，如果动画完成后用户滚动，恢复正常滚动
        const handleScroll = () => {
          if (aboutAnimationComplete) {
            handleContinueScroll();
          }
        };

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchmove', handleScroll);

        return () => {
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === aboutElement) {
              trigger.kill();
            }
          });
          window.removeEventListener('wheel', handleScroll);
          window.removeEventListener('touchmove', handleScroll);
          // 清理：确保恢复滚动
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
      }
    }, [startAboutAnimation, aboutAnimationComplete, handleContinueScroll]);

    return (
      <SectionContainer ref={ref} variant="about" id="about">
        {/* 主标题 */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-12">
            About
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-gray-500">关于</span>
          </h2>
        </div>

        {/* 交互式文字区域 */}
        <div className="max-w-3xl">
          <div ref={aboutTextRef}>
            <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight tracking-wide text-left">
              {aboutWords.map((word, index) => {
                const isActive = index < getAboutActiveWordCount();
                return (
                  <span
                    key={index}
                    className={`inline-block mr-3 md:mr-4 transition-all duration-700 ease-out ${
                      isActive 
                        ? 'text-white opacity-100' 
                        : 'text-gray-500 opacity-60'
                    }`}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>

            {/* 中文翻译 */}
            <div className="mt-8">
              <p className="text-lg text-gray-500 leading-relaxed">
                {aboutTargetTextZh}
              </p>
            </div>

            {/* 滚动提示 */}
            <div className="mt-12">
              {aboutAnimationActive && !aboutAnimationComplete && (
                <div className="text-gray-400 text-sm font-light">
                  Reading • {Math.round(aboutSliderProgress * 100)}%
                  <br />
                  <span className="text-xs text-gray-600">阅读中</span>
                </div>
              )}
              {aboutAnimationComplete && (
                <div className="mt-4 text-green-400 text-sm font-light">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="arrow-3d transform-gpu transition-transform duration-1000 hover:rotate-y-180 hover:scale-110">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          className="text-green-400 animate-bounce"
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(34, 197, 94, 0.3))',
                            transform: 'perspective(100px) rotateX(15deg)'
                          }}
                        >
                          <path 
                            d="M12 5v14m-7-7l7 7 7-7" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <span>Continue exploring</span>
                  </div>
                  <span className="text-xs text-green-500 ml-8">继续探索</span>
                </div>
              )}
            </div>

            {/* 技能标签 - 在滑动完成后显示 */}
            {aboutCanScroll && (
              <div className="pt-12 animate-fade-in">
                <h3 className="text-sm font-light text-white mb-6 uppercase tracking-wider">
                  Capabilities
                  <br />
                  <span className="text-xs text-gray-500 normal-case">能力</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Brand Design', 'UI/UX Design', 'Creative Direction', 'Product Design', 'HMI Design', 'Experience Design'].map((skill, index) => (
                    <MagneticNavItem
                      key={skill}
                      strength={0.2}
                      className="skill-tag"
                    >
                      <span
                        className="px-4 py-2 bg-white/5 border border-gray-800 rounded-full text-gray-300 hover:bg-white/10 hover:border-gray-700 transition-all duration-300 text-sm font-light cursor-pointer block"
                      >
                        {skill}
                      </span>
                    </MagneticNavItem>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    );
  }
);

AboutSection.displayName = 'AboutSection';

export default AboutSection; 