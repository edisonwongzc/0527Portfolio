import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { gsap } from 'gsap';
import { getProjectImage, getProjectGallery } from '../config/images';
import MagneticNavItem from '../components/MagneticNavItem';

/**
 * 项目详情页面组件
 */
const ProjectDetail = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 项目数据（与Home页面保持一致）
  const projects = [
    {
      id: '01',
      title: 'HMI Design Center',
      category: 'Automotive Space design 汽车空间设计',
      year: '2022',
      image: getProjectImage('01'),
      description: 'Redesigning the HMI experience in the automotive space',
      descriptionZh: '重新设计汽车空间中的人机交互体验',
      fullDescription: 'A comprehensive redesign of the Human-Machine Interface for next-generation automotive systems. This project focuses on creating intuitive, safe, and aesthetically pleasing interfaces that enhance the driving experience while maintaining safety standards.',
      fullDescriptionZh: '对下一代汽车系统人机界面的全面重新设计。该项目专注于创造直观、安全且美观的界面，在保持安全标准的同时增强驾驶体验。',
      technologies: ['Figma', 'Principle', 'After Effects', 'Unity'],
      client: 'Hozon Automobile',
      clientZh: '合众汽车',
      duration: '6 months',
      durationZh: '6个月',
      role: 'Senior Experience Design Director',
      roleZh: '高级体验设计总监',
      challenges: [
        'Creating HMI suitable for various environments (autonomous/non-autonomous) and driving conditions',
        'Ensuring all user groups can effectively receive information in any environment and improve accessibility',
        'Balancing information density with safety requirements'
      ],
      challengesZh: [
        '创建适用在各种环境下（自动驾驶/非自驾驶）各种行驶条件的HMI',
        '确保所有用户群体能够在任何环境下有效的接收信息，提高访问性',
        '平衡信息密度与安全要求'
      ],
      solutions: [
        'Developed adaptive multi-modal interaction system supporting both autonomous and manual driving modes',
        'Implemented intelligent information hierarchy that adjusts based on driving context and user capabilities',
        'Created universal design framework with voice, visual, and haptic feedback for enhanced accessibility'
      ],
      solutionsZh: [
        '开发自适应多模态交互系统，支持自动驾驶和手动驾驶模式',
        '实施智能信息层级系统，根据驾驶环境和用户能力进行调整',
        '创建通用设计框架，结合语音、视觉和触觉反馈以增强可访问性'
      ],
      results: [
        '40% reduction in driver distraction incidents',
        '95% user satisfaction rating',
        'Adopted across 3 vehicle models'
      ],
      resultsZh: [
        '驾驶员分心事件减少40%',
        '95%用户满意度',
        '在3个车型中采用'
      ],
      gallery: getProjectGallery('01')
    },
    {
      id: '02',
      title: 'Design Analysis',
      category: 'Design Analysis 设计分析',
      year: '2018-2021',
      image: getProjectImage('02'),
      description: 'Leveraging data correctly to enhance products through design',
      descriptionZh: '正确的利用数据，通过设计提升产品',
      fullDescription: 'A comprehensive design analysis project for Tinnove automotive operating systems, focusing on user interface optimization and interaction pattern analysis across multiple OS versions. Through systematic design analysis, we identified key improvement areas and implemented data-driven design solutions that enhanced overall user experience and system performance.',
      fullDescriptionZh: '针对梧桐车联汽车操作系统的综合设计分析项目，专注于用户界面优化和跨多个操作系统版本的交互模式分析。通过系统性的设计分析，我们识别了关键改进领域并实施了数据驱动的设计解决方案，提升了整体用户体验和系统性能。',
      technologies: ['Figma', 'Sketch', 'Principle', 'After Effects'],
      client: 'Tinnove OS1.0-3.0',
      clientZh: 'Tinnove OS1.0-3.0',
      duration: '1 year',
      durationZh: '1年',
      role: 'HMI Designer',
      roleZh: 'HMI设计师',
      challenges: [
        'Low product user adoption rates, unclear information hierarchy, low user stickiness, outdated design style, lack of brand uniqueness',
        'Identifying design inconsistencies and usability issues',
        'Balancing aesthetic improvements with functional requirements'
      ],
      challengesZh: [
        '产品⽤户使⽤率低，产品信息层级不明确，⽤户粘性低，设计⻛格⽼旧，缺乏品牌独有性',
        '识别设计不一致性和可用性问题',
        '平衡美学改进与功能需求'
      ],
      solutions: [
        'From passive to active, providing confident smooth travel experience, creating personalized and emotional entertainment travel space, providing ecological linkage',
        'Breaking the boundaries of traditional apps and channels, making information more effective and direct through integration',
        'Adapting to meet scenario needs anytime, breaking traditional single-app design approach, personalized for everyone, making target operations more time-saving and worry-free, freely switching between full immersion and high efficiency, flexible content display volume'
      ],
      solutionsZh: [
        '从被动到主动，提供⾃信的畅⾏体验，打造个性化、情感化的娱乐出⾏空间，提供⽣态联动',
        '打破传统APP和渠道的边界，以融合的⽅式让信息更加有效直接',
        '随时变换满⾜场景所需打破传统单应⽤设计⽅式，千⼈千⾯，让⽬标操作更省时省⼼，在全沉浸和⾼效中⾃如切换，灵活的内容显示体量'
      ],
      results: [
        '50% improvement in user task completion rates',
        '35% reduction in user error rates',
        '85% increase in overall user satisfaction scores'
      ],
      resultsZh: [
        '用户任务完成率提升50%',
        '用户错误率降低35%',
        '整体用户满意度评分提升85%'
      ],
      gallery: getProjectGallery('02')
    },
    {
      id: '03',
      title: 'Ai Explore and Research',
      category: 'Ai Explore AI探索',
      year: '2023',
      image: getProjectImage('03'),
      description: 'Leveraging AI linking tools to create new era product experiences',
      descriptionZh: '利用AI链接工具，打造新时代的产品体验',
      fullDescription: 'An innovative approach to product experience design using AI-powered linking tools and intelligent systems. This project explores how artificial intelligence can enhance user interactions and create more intuitive, personalized experiences.',
      fullDescriptionZh: '使用AI驱动的链接工具和智能系统进行产品体验设计的创新方法。该项目探索人工智能如何增强用户交互并创造更直观、个性化的体验。',
      technologies: ['React', 'TensorFlow', 'Python', 'OpenAI API'],
      client: 'Research Lab',
      clientZh: '研究实验室',
      duration: '8 months',
      durationZh: '8个月',
      role: 'AI Product Designer',
      roleZh: 'AI产品设计师',
      challenges: [
        'Seamlessly integrating AI capabilities into user workflows',
        'Ensuring AI recommendations feel natural and helpful',
        'Balancing automation with user control'
      ],
      challengesZh: [
        '将AI功能无缝集成到用户工作流程中',
        '确保AI推荐感觉自然且有用',
        '平衡自动化与用户控制'
      ],
      solutions: [
        'Developed intelligent linking algorithms for experience discovery',
        'Created adaptive UI components that learn from user behavior',
        'Implemented transparent AI decision-making processes'
      ],
      solutionsZh: [
        '开发智能链接算法进行体验发现',
        '创建从用户行为中学习的自适应UI组件',
        '实施透明的AI决策过程'
      ],
      results: [
        '75% increase in user engagement with AI-powered features',
        '50% reduction in time to find relevant experiences',
        '92% user satisfaction with AI recommendations'
      ],
      resultsZh: [
        'AI驱动功能用户参与度提升75%',
        '找到相关体验的时间减少50%',
        'AI推荐92%用户满意度'
      ],
      gallery: getProjectGallery('03')
    },
    {
      id: '05',
      title: 'System specification Design',
      category: 'System Design 系统设计',
      year: '2023',
      image: getProjectImage('05'),
      description: 'Enhancing team efficiency and reducing costs with unified standards',
      descriptionZh: '为团队增效降本，统一标准',
      fullDescription: 'A comprehensive system design approach focused on creating unified standards and specifications that enhance team efficiency while reducing operational costs. This project demonstrates how systematic design thinking can streamline workflows and improve collaboration.',
      fullDescriptionZh: '专注于创建统一标准和规范的综合系统设计方法，在降低运营成本的同时提高团队效率。该项目展示了系统性设计思维如何简化工作流程并改善协作。',
      technologies: ['Figma', 'Miro', 'Notion', 'Slack API'],
      client: 'Enterprise Teams',
      clientZh: '企业团队',
      duration: '5 months',
      durationZh: '5个月',
      role: 'System Design Lead',
      roleZh: '系统设计负责人',
      challenges: [
        'Standardizing diverse team workflows across departments',
        'Reducing operational overhead while maintaining flexibility',
        'Creating scalable design systems for growing teams'
      ],
      challengesZh: [
        '标准化跨部门的多样化团队工作流程',
        '在保持灵活性的同时减少运营开销',
        '为成长中的团队创建可扩展的设计系统'
      ],
      solutions: [
        'Developed modular specification frameworks',
        'Implemented automated workflow optimization tools',
        'Created comprehensive documentation and training systems'
      ],
      solutionsZh: [
        '开发模块化规范框架',
        '实施自动化工作流程优化工具',
        '创建全面的文档和培训系统'
      ],
      results: [
        '40% reduction in project delivery time',
        '60% decrease in operational costs',
        '95% team adoption rate of new standards'
      ],
      resultsZh: [
        '项目交付时间减少40%',
        '运营成本降低60%',
        '新标准95%团队采用率'
      ],
      gallery: getProjectGallery('05')
    },
    {
      id: '04',
      title: 'Brand / illustrate',
      category: 'Brand Design 品牌设计',
      year: '2012-2025',
      image: getProjectImage('04'),
      description: 'Filling every brand detail with creativity',
      descriptionZh: '用创意填补每个品牌的细节',
      fullDescription: 'A comprehensive brand design and illustration project that focuses on infusing creativity into every aspect of brand identity. This project demonstrates how thoughtful design and illustration can transform brand perception and create memorable experiences.',
      fullDescriptionZh: '专注于将创意注入品牌识别各个方面的综合品牌设计和插画项目。该项目展示了深思熟虑的设计和插画如何改变品牌认知并创造难忘的体验。',
      technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Procreate'],
      client: 'Creative Brands',
      clientZh: '创意品牌',
      duration: '10 years',
      durationZh: '10年',
      role: 'Brand Designer & Illustrator',
      roleZh: '品牌设计师和插画师',
      challenges: [
        'Creating unique brand identities that stand out in saturated markets',
        'Balancing creative expression with commercial viability',
        'Maintaining brand consistency across multiple touchpoints'
      ],
      challengesZh: [
        '在饱和市场中创造独特的品牌识别',
        '平衡创意表达与商业可行性',
        '在多个接触点保持品牌一致性'
      ],
      solutions: [
        'Developed comprehensive brand identity systems with flexible guidelines',
        'Created distinctive visual languages that reflect brand personality',
        'Implemented scalable design frameworks for consistent application'
      ],
      solutionsZh: [
        '开发具有灵活指导原则的综合品牌识别系统',
        '创造反映品牌个性的独特视觉语言',
        '实施可扩展的设计框架以确保一致应用'
      ],
      results: [
        '200% increase in brand recognition',
        '150% improvement in customer engagement',
        '90% client satisfaction with brand outcomes'
      ],
      resultsZh: [
        '品牌认知度提升200%',
        '客户参与度改善150%',
        '品牌成果90%客户满意度'
      ],
      gallery: getProjectGallery('04')
    }
  ];

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // 页面进入动画
      gsap.fromTo(heroRef.current, 
        { 
          scale: 0.8, 
          opacity: 0,
          y: 100 
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      gsap.fromTo(contentRef.current?.children || [], 
        { 
          y: 80, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-2">Project not found</h1>
          <p className="text-lg text-gray-500 mb-4">项目未找到</p>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
            <span className="text-sm ml-1">返回首页</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black pt-20">
      {/* 返回按钮 */}
      <div className="fixed top-24 left-6 lg:left-12 z-50">
        <MagneticNavItem strength={0.3}>
          <Link 
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
            <span className="text-sm ml-1">返回项目</span>
          </Link>
        </MagneticNavItem>
      </div>

      {/* Hero区域 */}
      <section ref={heroRef} className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 项目信息 */}
            <div className="space-y-8">
              <div>
                <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                  {project.category} • {project.year}
                </div>
                <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-6">
                  {project.title}
                </h1>
                <div className="text-xl text-gray-300 leading-relaxed space-y-2">
                  <p>{project.fullDescription}</p>
                  <p className="text-lg text-gray-500">{project.fullDescriptionZh}</p>
                </div>
              </div>

              {/* 项目详情 */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-light text-white mb-2 uppercase tracking-wider">Project / 项目</h3>
                  <p className="text-gray-400">{project.client} / {project.clientZh}</p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-white mb-2 uppercase tracking-wider">Duration / 时长</h3>
                  <p className="text-gray-400">{project.duration} / {project.durationZh}</p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-white mb-2 uppercase tracking-wider">Role / 角色</h3>
                  <p className="text-gray-400">{project.role} / {project.roleZh}</p>
                </div>
                <div>
                  <h3 className="text-sm font-light text-white mb-2 uppercase tracking-wider">Year / 年份</h3>
                  <p className="text-gray-400">{project.year}</p>
                </div>
              </div>

              {/* 技术栈 */}
              <div>
                <h3 className="text-sm font-light text-white mb-4 uppercase tracking-wider">Technologies / 技术</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <MagneticNavItem key={index} strength={0.3}>
                      <span className="px-3 py-1 bg-white/5 border border-gray-800 rounded-full text-gray-300 text-sm font-light hover:bg-white/10 hover:border-gray-700 transition-all duration-300 cursor-pointer block">
                        {tech}
                      </span>
                    </MagneticNavItem>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <MagneticNavItem strength={0.4}>
                  {project.id === '01' ? (
                    <button 
                      onClick={() => setIsVideoModalOpen(true)}
                      className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                      </svg>
                      View Video
                      <span className="text-xs ml-1">查看视频</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsGalleryModalOpen(true)}
                      className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Details
                      <span className="text-xs ml-1">查看详情</span>
                    </button>
                  )}
                </MagneticNavItem>
              </div>
            </div>

            {/* 主要图片 */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section ref={contentRef} className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* 挑战与解决方案 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light text-white mb-8">Challenges / 挑战</h2>
              <ul className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="space-y-2">
                    <p className="text-gray-300 leading-relaxed">• {challenge}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">• {project.challengesZh[index]}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-light text-white mb-8">Solutions / 解决方案</h2>
              <ul className="space-y-6">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="space-y-2">
                    <p className="text-gray-300 leading-relaxed">• {solution}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">• {project.solutionsZh[index]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 结果 */}
          <div>
            <h2 className="text-3xl font-light text-white mb-8">Results / 成果</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.results.map((result, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-2xl border border-gray-800 space-y-2">
                  <p className="text-gray-300 leading-relaxed">{result}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{project.resultsZh[index]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 更多作品赏析 */}
          <div>
            <h2 className="text-3xl font-light text-white mb-8">More / 更多作品赏析</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {project.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className="relative w-full h-48 overflow-hidden rounded-xl bg-black cursor-pointer group"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsGalleryModalOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* 悬停时显示放大图标 */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 下一个项目 */}
      <section className="px-6 lg:px-12 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white mb-2">Next Project</h2>
          <p className="text-base text-gray-600 mb-8">下一个项目</p>
          <MagneticNavItem strength={0.3}>
            <Link 
              to="/project/02"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            >
              Explore more work
              <span className="text-sm ml-1">探索更多作品</span> →
            </Link>
          </MagneticNavItem>
        </div>
      </section>

      {/* 视频播放弹窗 - 仅限HMI项目 */}
      {isVideoModalOpen && project.id === '01' && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={() => setIsVideoModalOpen(false)}
        >
          {/* 关闭按钮 */}
          <div className="absolute top-24 right-6 z-10">
            <MagneticNavItem strength={0.4}>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </MagneticNavItem>
          </div>
          
          {/* 视频播放区域 - 第一屏居中 */}
          <div 
            className="w-full h-screen flex items-center justify-center px-16 pt-16 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="max-w-full max-h-full object-contain"
              controls
              autoPlay
              poster="/images/projects/01/video-poster.jpg"
            >
              <source src="/videos/projects/01/Hozon Framedesign 2.mp4" type="video/mp4" />
              <source src="/videos/hmi-demo.webm" type="video/webm" />
              {/* 如果没有视频文件，显示占位内容 */}
              <div className="flex flex-col items-center justify-center h-full text-white">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mb-4 text-gray-400">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
                <p className="text-lg mb-2">HMI Design Demo Video</p>
                <p className="text-sm text-gray-400">演示视频加载中...</p>
              </div>
            </video>
          </div>
        </div>
      )}

      {/* 图片详情弹窗 */}
      {isGalleryModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-start justify-center"
          onClick={() => setIsGalleryModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-6xl h-screen bg-black overflow-hidden flex flex-col pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex justify-end items-center p-6">
              <MagneticNavItem strength={0.4}>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                >
                  <X size={20} />
                </button>
              </MagneticNavItem>
            </div>
            
            {/* 图片展示区域 */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={project.gallery[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
                
                {/* 左右导航按钮 */}
                {project.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : project.gallery.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < project.gallery.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                    >
                      <ArrowLeft size={20} className="rotate-180" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* 底部分页指示器 */}
            <div className="p-6 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {currentImageIndex + 1} / {project.gallery.length}
                </div>
                
                {/* 分页点 */}
                <div className="flex space-x-2">
                  {project.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="text-sm text-gray-400">
                  Page {Math.floor(currentImageIndex / 6) + 1} of {Math.ceil(project.gallery.length / 6)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail; 