import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
/**
 * 导入磁吸导航组件
 * @module MagneticNavItem
 */
import MagneticNavItem from '../components/MagneticNavItem';
/**
 * 导入3D Hero组件
 * @module ThreeHero
 */
import ThreeHero from '../components/ThreeHero';
/**
 * 导入页面切换动画组件
 * @module PageTransition
 */
import PageTransition from '../components/PageTransition';
/**
 * 导入星空引导转场组件
 * @module StarGuidedTransition
 */
import StarGuidedTransition from '../components/StarGuidedTransition';
/**
 * 导入滚动检测Hook
 * @module useScrollDirection
 */
import { useScrollDirection } from '../hooks/useScrollDirection';
/**
 * 导入图片配置
 * @module images
 */
import { getProjectImage, serviceImages } from '../config/images';
/**
 * 导入布局组件
 * @module SectionContainer
 * @module SectionTitle
 */
import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

/**
 * 注册GSAP滚动触发器插件
 */
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsTitleRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // 页面切换状态
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  
  // 星空引导转场状态
  const { 
    direction, 
    shouldShowTransition, 
    currentSection, 
    nextSection 
  } = useScrollDirection();
  
  const [starTransitionActive, setStarTransitionActive] = useState(false);
  
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

  // 监听滚动转场触发
  useEffect(() => {
    if (shouldShowTransition && direction) {
      setStarTransitionActive(true);
    }
  }, [shouldShowTransition, direction]);

  /**
   * 星空转场完成回调
   */
  const handleStarTransitionComplete = useCallback(() => {
    setStarTransitionActive(false);
  }, []);

  /**
   * 处理项目卡片点击
   */
  const handleProjectClick = useCallback((projectId: string, event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setTriggerElement(target);
    setIsTransitioning(true);
    
    // 延迟导航，让动画先开始
    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 300);
  }, [navigate]);

  /**
   * 页面切换动画完成回调
   */
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
    setTriggerElement(null);
  }, []);

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

  // qclay.design 风格的项目数据
  const projects = [
    {
      id: '01',
      title: 'HMI Design Center',
      category: 'Automotive Space design',
      categoryZh: '汽车空间设计',
      year: '2022',
      image: getProjectImage('01'), // 你上传的HMI项目图片
      description: 'Redesigning the HMI experience in the automotive space',
      descriptionZh: '重新设计汽车空间中的人机交互体验'
    },
    {
      id: '02', 
      title: 'Design Analysis',
      category: 'Design Analysis',
      categoryZh: '设计分析',
      year: '2018-2021',
      image: getProjectImage('02'), // 设计分析
      description: 'Leveraging data correctly to enhance products through design',
      descriptionZh: '正确的利用数据，通过设计提升产品'
    },
    {
      id: '03',
      title: 'Ai Explore and Research',
      category: 'Ai Explore',
      categoryZh: 'AI探索',
      year: '2017-2018',
      image: getProjectImage('03'), // AI产品体验
      description: 'Leveraging AI linking tools to create new era product experiences',
      descriptionZh: '利用AI链接工具，打造新时代的产品体验'
    },
    {
      id: '04',
      title: 'Brand / illustrate',
      category: 'Brand Design',
      categoryZh: '品牌设计',
      year: '2012-2025',
      image: getProjectImage('04'), // 品牌创意设计
      description: 'Filling every brand detail with creativity',
      descriptionZh: '用创意填补每个品牌的细节'
    },
    {
      id: '05',
      title: 'System specification Design',
      category: 'System Design',
      categoryZh: '系统设计',
      year: '2017-2018',
      image: getProjectImage('05'), // 系统规范设计
      description: 'Enhancing team efficiency and reducing costs with unified standards',
      descriptionZh: '为团队增效降本，统一标准'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 设置3D透视和初始状态
      gsap.set([projectsRef.current, servicesRef.current, contactRef.current], {
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      });

      // 设置Projects区域的初始状态 - 光标兼容优化
      gsap.set(projectsRef.current, {
        filter: "blur(0.5px)", // 大幅减少模糊程度，避免影响光标
        rotationX: 2, // 大幅减少旋转角度
        z: -10, // 大幅减少Z轴偏移
        scale: 0.99,
        opacity: 0.95 // 提高初始透明度
      });

      // Hero区域退出效果 - 增强模糊效果
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 100%",
        end: "top 60%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const heroElement = document.querySelector('.three-hero-container');
          
          if (heroElement) {
            gsap.to(heroElement, {
              y: progress * -50,
              scale: 1 - progress * 0.08,
              opacity: 1 - progress * 0.25,
              filter: `blur(${progress * 18}px) brightness(${1 - progress * 0.4}) contrast(${1 - progress * 0.2})`, // 增强模糊和亮度变化
              duration: 0.1,
              ease: "none"
            });
          }
        }
      });

      // 3D Hero到项目区域的转场效果 - 增强模糊效果
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 120%",
        end: "top 50%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // 项目区域进入效果 - 增强模糊效果
          gsap.to(projectsRef.current, {
            filter: `blur(${(1 - progress) * 22}px) brightness(${0.6 + progress * 0.4}) contrast(${0.8 + progress * 0.2})`, // 大幅增强模糊效果
            rotationX: (1 - progress) * 12, // 增加旋转角度
            z: (1 - progress) * -40, // 增加Z轴偏移
            scale: 0.92 + progress * 0.08, // 增加缩放变化
            opacity: 0.7 + progress * 0.3, // 调整透明度范围
            duration: 0.1,
            ease: "none"
          });
        }
      });

      // Selected Work整体区域动画 - 复制Creative services的3D磁吸效果
      gsap.fromTo(projectsRef.current?.children || [],
        { 
          y: 150, 
          opacity: 0,
          scale: 0.6,
          rotationX: 60,
          transformOrigin: "center top"
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          ease: "back.out(2)", // 强烈的反弹效果
          stagger: 0.4,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Selected Work模块分层动画 - 卡片先移动，文字后移动
      // 第一层：项目卡片动画（提前触发）
      gsap.fromTo('.project-card',
        { 
          y: 80, // 减少垂直偏移
          x: (i) => (i % 2 === 0 ? -40 : 40), // 减少左右位移
          opacity: 0.2, // 提高初始透明度
          scale: 0.8, // 提高初始缩放
          rotation: (i) => (i % 2 === 0 ? -8 : 8), // 减少旋转角度
          rotationY: (i) => (i % 2 === 0 ? -20 : 20), // 减少Y轴旋转
          rotationX: 15, // 减少X轴倾斜
          z: -100, // 减少Z轴深度
          transformOrigin: "center center"
        },
        { 
          y: 0, 
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.6)", // 弹性效果模拟磁吸
          stagger: {
            amount: 1.0, // 卡片之间的时间差
            from: "start",
            ease: "power2.inOut",
            grid: [2, 3] // 2行3列的网格错位
          },
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 95%", // 卡片更早开始动画
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 第二层：标题和描述文字动画（延后触发）
      gsap.fromTo(projectsTitleRef.current?.children || [],
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
          rotationX: 15,
          transformOrigin: "center bottom"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: projectsTitleRef.current,
            start: "top 90%", // 文字更早开始动画
            toggleActions: "play none none reverse"
          }
        }
      );

      // 增强滚动视差 - 卡片和文字不同的移动速度
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // 卡片移动速度更快（前景）
          gsap.to('.project-card', {
            y: progress * -50,
            duration: 0.1
          });
          
          // 标题文字移动速度较慢（背景）
          gsap.to(projectsTitleRef.current, {
            y: progress * -20,
            duration: 0.1
          });
        }
      });

      // 项目卡片高级悬停效果 - 多层3D变换
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const number = card.querySelector('.project-number');
        const content = card.querySelector('.project-content');
        
        // 鼠标进入效果
        card.addEventListener('mouseenter', () => {
          const isEven = index % 2 === 0;
          
          // 主卡片3D变换
          gsap.to(card, {
            rotationY: isEven ? 12 : -12,
            rotationX: -8,
            z: 80,
            scale: 1.05,
            duration: 0.8,
            ease: "power2.out"
          });
          
          // 图片深度缩放
          gsap.to(image, { 
            scale: 1.2,
            rotationZ: isEven ? 2 : -2,
            z: 20,
            duration: 1.0,
            ease: "power2.out"
          });
          
          // 遮罩层动画
          gsap.to(overlay, { 
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut"
          });
          
          // 项目编号弹跳
          gsap.to(number, {
            y: -20,
            scale: 1.2,
            rotationZ: isEven ? 5 : -5,
            duration: 0.4,
            ease: "back.out(3)"
          });
          
          // 内容区域上浮
          if (content) {
            gsap.to(content, {
              y: -10,
              rotationX: 5,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });
        
        // 鼠标离开效果
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          });
          
          gsap.to(image, { 
            scale: 1,
            rotationZ: 0,
            z: 0,
            duration: 1.0,
            ease: "power2.out"
          });
          
          gsap.to(overlay, { 
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
          
          gsap.to(number, {
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          
          if (content) {
            gsap.to(content, {
              y: 0,
              rotationX: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });

        // 鼠标移动视差效果
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / centerY * -10;
          const rotateY = (x - centerX) / centerX * 10;
          
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // 图片反向视差
          gsap.to(image, {
            x: (x - centerX) / centerX * -20,
            y: (y - centerY) / centerY * -20,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // 项目区域到服务区域的转场 - 增强模糊效果
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 100%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // 项目区域下落效果 - 增强模糊效果
          gsap.to(projectsRef.current, {
            filter: `blur(${progress * 20}px) brightness(${1 - progress * 0.5}) contrast(${1 - progress * 0.3})`, // 大幅增强模糊效果
            rotationX: progress * 20, // 增加旋转角度
            y: progress * 80, // 增加位移
            scale: 1 - progress * 0.15, // 增加缩放
            opacity: 1 - progress * 0.4, // 增加透明度变化
            duration: 0.1,
            ease: "none"
          });

          // 服务区域进入效果 - 增强模糊效果
          gsap.to(servicesRef.current, {
            filter: `blur(${(1 - progress) * 25}px) brightness(${0.5 + progress * 0.5}) contrast(${0.7 + progress * 0.3})`, // 大幅增强模糊效果
            rotationX: (1 - progress) * -20, // 增加旋转角度
            y: (1 - progress) * -60, // 增加位移
            scale: 0.9 + progress * 0.1, // 增加缩放变化
            opacity: 0.6 + progress * 0.4, // 调整透明度
            duration: 0.1,
            ease: "none"
          });
        }
      });

      // 服务区域动画 - 增强3D磁吸效果
      gsap.fromTo(servicesRef.current?.children || [],
        { 
          y: 150, 
          opacity: 0,
          scale: 0.6,
          rotationX: 60,
          transformOrigin: "center top"
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          ease: "back.out(2)", // 强烈的反弹效果
          stagger: 0.4,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 服务区域到联系区域的转场 - 增强模糊效果
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 100%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // 服务区域退出效果 - 增强模糊效果
          gsap.to(servicesRef.current, {
            filter: `blur(${progress * 16}px) brightness(${1 - progress * 0.4}) contrast(${1 - progress * 0.2})`, // 增强模糊效果
            rotationY: progress * -15, // 增加旋转角度
            x: progress * -50, // 增加位移
            scale: 1 - progress * 0.12, // 增加缩放
            opacity: 1 - progress * 0.35, // 增加透明度变化
            duration: 0.1,
            ease: "none"
          });

          // 联系区域进入效果 - 增强模糊效果
          gsap.to(contactRef.current, {
            filter: `blur(${(1 - progress) * 18}px) brightness(${0.6 + progress * 0.4}) contrast(${0.8 + progress * 0.2})`, // 增强模糊效果
            rotationY: (1 - progress) * 18, // 增加旋转角度
            x: (1 - progress) * 60, // 增加位移
            scale: 0.88 + progress * 0.12, // 增加缩放变化
            opacity: 0.65 + progress * 0.35, // 调整透明度
            duration: 0.1,
            ease: "none"
          });
        }
      });

      // 服务卡片悬停效果 - 磁吸动画
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach((card) => {
        const image = card.querySelector('.service-image');
        const overlay = card.querySelector('.service-overlay');
        
        card.addEventListener('mouseenter', () => {
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
        });
        
        card.addEventListener('mouseleave', () => {
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
        });
      });

      // 联系区域重力动画
      gsap.fromTo(contactRef.current?.children || [],
        { 
          y: -80, 
          opacity: 0,
          rotationX: -45,
          transformOrigin: "center bottom"
        },
        { 
          y: 0, 
          opacity: 1,
          rotationX: 0,
          duration: 1.0,
          ease: "bounce.out", // 重力反弹效果
          stagger: 0.3,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 滚动视差效果已移除 - ThreeHero组件有自己的3D控制

    }, projectsRef);

    return () => ctx.revert();
  }, []);



  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* 3D Hero区域 */}
      <ThreeHero />

      {/* 精选作品 - qclay.design 风格 */}
      <SectionContainer ref={projectsRef} variant="projects" id="projects" data-section="projects" className="section-transition blur-transition gpu-blur">
        <SectionTitle
          ref={projectsTitleRef}
          title="Selected Work"
          titleZh="精选作品"
          subtitle="A collection of projects spanning digital product design, brand experiences, and creative direction."
          subtitleZh="涵盖数字产品设计、品牌体验和创意指导的项目合集。"
          size="lg"
        />

          {/* 项目网格 */}
          <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card group cursor-pointer"
                onClick={(e) => handleProjectClick(project.id, e)}
              >
                <div>
                  {/* 项目图片 */}
                  <div className="relative aspect-[4/3] mb-8 overflow-hidden bg-black rounded-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image w-full h-full will-change-transform absolute inset-0 rounded-2xl"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        width: '100%',
                        height: '100%',
                        transform: 'scale(1.0)', // 初始状态显示完整图片
                        transformOrigin: 'center center'
                      }}
                    />
                    
                    {/* 悬停遮罩 */}
                    <div className="project-overlay absolute inset-0 bg-black/20 opacity-0 will-change-opacity"></div>
                    
                    {/* 项目编号 */}
                    <div className="project-number absolute top-6 left-6">
                      <span className="text-white/80 text-sm font-light tracking-wider">
                        {project.id}
                      </span>
                    </div>
                    
                    {/* 查看项目图标 */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    </div>
                    
                    {/* 项目信息叠加 */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/90 font-light">
                          {project.category}
                          <br />
                          <span className="text-xs text-white/70">{project.categoryZh}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 项目详情 */}
                  <div className="project-content space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-gray-300 transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-light ml-4 flex-shrink-0">
                        {project.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                      <br />
                      <span className="text-sm text-gray-500">{project.descriptionZh}</span>
                    </p>
                    
                    <div className="pt-2">
                      <span className="text-gray-600 text-sm font-light">
                        {project.category}
                        <br />
                        <span className="text-xs text-gray-700">{project.categoryZh}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </SectionContainer>

      {/* 创意服务区域 - 复制"Let's create"的设计和动画 */}
      <SectionContainer ref={servicesRef} variant="services" id="services" data-section="services" className="section-transition blur-transition gpu-blur">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
            {/* 主要内容 - 复制footer的布局 */}
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

            {/* 服务展示卡片 */}
            <div className="space-y-8">
              {/* 服务卡片1 - Design Thinking Exploration */}
              <Link to="/design-thinking" className="block">
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
                        transform: 'scale(1.0)', // 初始状态显示完整图片
                        transformOrigin: 'center center'
                      }}
                    />
                    <div className="service-overlay absolute inset-0 bg-black/30 opacity-0 will-change-opacity"></div>
                    
                    {/* 服务图标 */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-light text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                      Design Thinking Exploration
                      <br />
                      <span className="text-base text-gray-500">设计思路探索</span>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Exploring innovative design methodologies and creative problem-solving approaches.
                      <br />
                      <span className="text-xs text-gray-600">探索创新设计方法论和创意问题解决途径。</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
      </SectionContainer>

      {/* About区域 */}
      <SectionContainer variant="about" id="about">
          {/* 主标题 */}
          <div className="mb-20">
            <Link to="/about" className="group inline-block">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-12 group-hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                About
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl text-gray-500 group-hover:text-gray-400 transition-colors duration-300">关于</span>
                {/* 悬停箭头图标 */}
                <ArrowUpRight 
                  size={24} 
                  className="inline-block ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-gray-400" 
                />
              </h2>
            </Link>
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

      {/* 联系区域 - qclay.design 风格 */}
      <SectionContainer ref={contactRef} variant="contact" id="contact" data-section="contact" className="section-transition blur-transition gpu-blur">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
                Let's create something interesting
                <br />
                <span className="text-4xl md:text-6xl text-gray-500">一起创造有意思的产品</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                Currently available for new projects and collaborations. 
                Always excited to work with passionate teams and individuals.
                <br />
                <span className="text-base text-gray-600">欢迎咨询合作，始终乐衷与充满激情的团队和个人合作。</span>
              </p>
            </div>
            
            <div className="lg:col-span-5 lg:col-start-8 space-y-8">
              <div>
                <h3 className="text-lg font-light text-white mb-4">
                  Get in touch
                  <br />
                  <span className="text-base text-gray-500">联系方式</span>
                </h3>
                <a 
                  href="mailto:18321445543@163.com"
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-lg"
                >
                  18321445543@163.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-white mb-4">
                  Follow
                  <br />
                  <span className="text-base text-gray-500">关注</span>
                </h3>
                <div className="flex space-x-6">
                  <a 
                    href="https://twitter.com/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://dribbble.com/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Dribbble
                  </a>
                  <a 
                    href="https://linkedin.com/in/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
          </div>

              <Link 
                to="/contact"
                className="inline-flex items-center text-white border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5 group"
              >
                                  Start a project
                <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
      </SectionContainer>

      {/* 页面切换动画 */}
      <PageTransition 
        isActive={isTransitioning}
        triggerElement={triggerElement}
        onComplete={handleTransitionComplete}
      />
      
      {/* 星空引导转场 */}
      <StarGuidedTransition
        isActive={starTransitionActive}
        direction={direction || 'down'}
        onComplete={handleStarTransitionComplete}
      />
    </div>
  );
};

export default Home; 