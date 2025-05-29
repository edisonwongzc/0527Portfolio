import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { getProjectImage } from '../../config/images';
import SectionContainer from '../SectionContainer';
import SectionTitle from '../SectionTitle';

interface ProjectsSectionProps {
  onProjectClick: (projectId: string, event: React.MouseEvent<HTMLDivElement>) => void;
  projectsTitleRef?: React.RefObject<HTMLDivElement>;
  projectsGridRef?: React.RefObject<HTMLDivElement>;
}

/**
 * 项目数据
 */
const projects = [
  {
    id: '01',
    title: 'HMI Design Center',
    category: 'Automotive Space design',
    categoryZh: '汽车空间设计',
    year: '2022',
    image: getProjectImage('01'),
    description: 'Redesigning the HMI experience in the automotive space',
    descriptionZh: '重新设计汽车空间中的人机交互体验'
  },
  {
    id: '02', 
    title: 'Design Analysis',
    category: 'Design Analysis',
    categoryZh: '设计分析',
    year: '2018-2021',
    image: getProjectImage('02'),
    description: 'Leveraging data correctly to enhance products through design',
    descriptionZh: '正确的利用数据，通过设计提升产品'
  },
  {
    id: '03',
    title: 'Ai Explore and Research',
    category: 'Ai Explore',
    categoryZh: 'AI探索',
    year: '2017-2018',
    image: getProjectImage('03'),
    description: 'Leveraging AI linking tools to create new era product experiences',
    descriptionZh: '利用AI链接工具，打造新时代的产品体验'
  },
  {
    id: '04',
    title: 'Brand / illustrate',
    category: 'Brand Design',
    categoryZh: '品牌设计',
    year: '2012-2025',
    image: getProjectImage('04'),
    description: 'Filling every brand detail with creativity',
    descriptionZh: '用创意填补每个品牌的细节'
  },
  {
    id: '05',
    title: 'System specification Design',
    category: 'System Design',
    categoryZh: '系统设计',
    year: '2017-2018',
    image: getProjectImage('05'),
    description: 'Enhancing team efficiency and reducing costs with unified standards',
    descriptionZh: '为团队增效降本，统一标准'
  }
];

/**
 * 项目区域组件
 */
const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ onProjectClick, projectsTitleRef, projectsGridRef }, ref) => {
    
    // 组件内部动画效果
    useEffect(() => {
      // 项目卡片悬停效果 - 多层3D变换
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const number = card.querySelector('.project-number');
        const content = card.querySelector('.project-content');
        
        // 鼠标进入效果
        const handleMouseEnter = () => {
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
        };
        
        // 鼠标离开效果
        const handleMouseLeave = () => {
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
        };

        // 鼠标移动视差效果
        const handleMouseMove = (e: Event) => {
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
        };

        // 添加事件监听器
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);

        // 清理函数
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
          card.removeEventListener('mousemove', handleMouseMove);
        };
      });
    }, []);

    return (
      <SectionContainer ref={ref} variant="projects" id="projects" data-section="projects">
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
              onClick={(e) => onProjectClick(project.id, e)}
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
                      transform: 'scale(1.0)',
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
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection; 