import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/AnimatedSection';
import { designThinkingImages } from '../config/designThinkingImages';

gsap.registerPlugin(ScrollTrigger);

/**
 * 设计思路探索页面
 */
const DesignThinking: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 页面进入动画 - Hero区域3D模糊效果
    const tl = gsap.timeline();
    
    tl.fromTo(heroRef.current, 
      { 
        opacity: 0, 
        y: 50,
        filter: "blur(20px)",
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.5, 
        ease: "power3.out"
      }
    );

    // 3D模糊动画 - 为每个模块设置不同的模糊强度
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, sectionIndex) => {
      // 为每个模块内的元素设置不同的模糊效果
      const titles = section.querySelectorAll('h3, h4');
      const paragraphs = section.querySelectorAll('p');
      const lists = section.querySelectorAll('ul, ol');
      const cards = section.querySelectorAll('.aspect-\\[3\\/4\\], .bg-gradient-to-br');
      const images = section.querySelectorAll('img');
      const otherElements = section.querySelectorAll('div:not(.space-y-12):not(.space-y-6):not(.space-y-4)');

      // 创建模糊效果时间线
      const blurTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // 标题 - 强烈模糊效果
      blurTl.fromTo(titles,
        {
          opacity: 0,
          y: 30,
          filter: "blur(25px)",
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.2
        }, 0
      );

      // 段落文字 - 中等模糊效果
      blurTl.fromTo(paragraphs,
        {
          opacity: 0,
          y: 20,
          filter: "blur(15px)",
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.1
        }, 0.2
      );

      // 列表 - 轻微模糊效果
      blurTl.fromTo(lists,
        {
          opacity: 0,
          y: 25,
          filter: "blur(10px)",
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.05
        }, 0.3
      );

      // 卡片元素 - 强烈模糊效果
      blurTl.fromTo(cards,
        {
          opacity: 0,
          y: 40,
          filter: "blur(30px)",
          scale: 0.85
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.4,
          ease: "back.out(1.2)",
          stagger: 0.15
        }, 0.4
      );

      // 图片 - 深度模糊效果
      blurTl.fromTo(images,
        {
          opacity: 0,
          filter: "blur(40px) brightness(1.5)",
          scale: 0.8
        },
        {
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.2
        }, 0.5
      );

      // 其他元素 - 轻微模糊效果
      blurTl.fromTo(otherElements,
        {
          opacity: 0,
          y: 15,
          filter: "blur(8px)",
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.03
        }, 0.6
      );

      // 为特定模块添加额外的模糊效果
      if (sectionIndex === 1) { // 五个阶段模块
        // 连接箭头的模糊动画
        const arrows = section.querySelectorAll('.absolute.-right-3');
        blurTl.fromTo(arrows,
          {
            opacity: 0,
            filter: "blur(5px)",
            scaleX: 0.5
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
          }, 1.0
        );
      }

      if (sectionIndex === 3) { // 工具方法树状图模块
        // 树状图连接线的模糊动画
        const lines = section.querySelectorAll('[class*="bg-"]');
        blurTl.fromTo(lines,
          {
            opacity: 0,
            filter: "blur(3px)",
            scaleY: 0,
            transformOrigin: "top center"
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scaleY: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.05
          }, 1.2
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero区域 */}
      <div ref={heroRef} className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-sm text-gray-500 font-light tracking-wider uppercase">
              Design Philosophy
              <br />
              <span className="text-xs text-gray-600 normal-case">设计哲学</span>
            </span>
            <h1 className="text-6xl md:text-8xl font-light leading-tight">
              Design Thinking
              <br />
              <span className="text-5xl md:text-7xl text-gray-400">Exploration</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-gray-500 mt-4">
              设计思路探索
            </h2>
          </div>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            探索创新设计方法论的深度思考，从用户需求出发，通过系统性的设计思维过程，
            创造出既美观又实用的解决方案。
          </p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div ref={contentRef} className="px-8 max-w-6xl mx-auto space-y-20 pb-20">
        
        {/* 第一部分：设计思维的本质 - 左对齐布局 */}
        <AnimatedSection className="content-section">
          <div className="space-y-12">
            <h3 className="text-3xl md:text-4xl font-light text-white">
              设计思维的本质
              <br />
              <span className="text-2xl md:text-3xl text-gray-500">The Essence of Design Thinking</span>
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4 text-gray-300 leading-relaxed max-w-4xl">
                <p>
                  设计思维不仅仅是一种方法论，更是一种以人为中心的创新思维模式。它强调通过深度理解用户需求，
                  运用创意和逻辑相结合的方式来解决复杂问题。
                </p>
                
                <p>
                  在我的设计实践中，我发现最有效的设计往往来自于对问题本质的深刻洞察。
                  这需要我们跳出传统的思维框架，从多个角度审视问题，寻找创新的解决路径。
                </p>
                
                <p>
                  <strong className="text-white">核心原则：</strong>
                  以用户为中心、迭代优化、跨学科协作、原型验证。
                  这些原则指导着我在每个项目中的设计决策。
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 第二部分：五个阶段 - 横向排列，黄到红渐变 */}
        <AnimatedSection className="content-section">
          <div className="space-y-12">
            <div className="text-left space-y-4">
              <h3 className="text-3xl md:text-4xl font-light text-white">
                设计思维的五个阶段
                <br />
                <span className="text-2xl md:text-3xl text-gray-500">Five Stages of Design Thinking</span>
              </h3>
              
              {/* 流程说明 - 标题下方 */}
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                设计思维是一个循环迭代的过程，每个阶段都可能回到前面的步骤进行优化
                <br />
                <span className="text-xs text-gray-500">Design thinking is an iterative process where each stage may loop back for optimization</span>
              </p>
            </div>
            
            {/* 横向排列的五个阶段 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  stage: "01",
                  title: "共情",
                  titleEn: "Empathize",
                  description: "深入理解用户的需求、想法和情感，建立用户画像和用户旅程地图。",
                  color: "from-yellow-400/30 to-yellow-500/30",
                  borderColor: "border-yellow-400/50"
                },
                {
                  stage: "02", 
                  title: "定义",
                  titleEn: "Define",
                  description: "基于共情阶段的发现，明确定义核心问题和设计挑战。",
                  color: "from-orange-400/30 to-orange-500/30",
                  borderColor: "border-orange-400/50"
                },
                {
                  stage: "03",
                  title: "构思",
                  titleEn: "Ideate", 
                  description: "通过头脑风暴等方法，产生大量创意解决方案。",
                  color: "from-red-400/30 to-red-500/30",
                  borderColor: "border-red-400/50"
                },
                {
                  stage: "04",
                  title: "原型",
                  titleEn: "Prototype",
                  description: "快速构建可测试的原型，将想法转化为可触摸的解决方案。",
                  color: "from-red-500/30 to-red-600/30",
                  borderColor: "border-red-500/50"
                },
                {
                  stage: "05",
                  title: "测试",
                  titleEn: "Test",
                  description: "与用户一起测试原型，收集反馈并持续迭代优化。",
                  color: "from-red-600/30 to-red-700/30",
                  borderColor: "border-red-600/50"
                }
              ].map((item, index) => (
                <div key={index} className="space-y-4">
                  <div className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor} p-6 flex flex-col justify-between relative overflow-hidden`}>
                    {/* 背景装饰 */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>
                    
                    <div className="text-3xl font-light text-white/80">
                      {item.stage}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-light text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/70">
                        {item.titleEn}
                      </p>
                    </div>
                    
                    {/* 连接箭头 */}
                    {index < 4 && (
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                        <div className="w-6 h-0.5 bg-gradient-to-r from-white/40 to-transparent"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                          <div className="w-0 h-0 border-l-4 border-l-white/40 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 第三部分：实践案例 */}
        <AnimatedSection className="content-section">
          <div className="space-y-12 relative">
            {/* 添加光束效果 */}
            <div 
              className="absolute -inset-x-[600px] -top-12 flex h-[500px] grow opacity-50" 
              style={{
                maskImage: 'linear-gradient(to top, rgba(255, 255, 255, 0), rgb(255, 255, 255))',
                opacity: '0.5',
                transform: 'none'
              }}
            >
              <div 
                className="grow" 
                style={{
                  background: 'conic-gradient(from 90deg at 35% -1% in lab, rgb(255, 255, 255) 7.2deg, rgb(156 184 221) 14.4deg, rgba(17, 17, 17, 0) 36deg, rgba(17, 17, 17, 0) 342deg, rgb(255, 255, 255) 360deg)'
                }}
              />
              <div 
                className="grow" 
                style={{
                  background: 'conic-gradient(from -90deg at 65% -1% in lab, rgb(255, 255, 255) 0deg, rgba(17, 17, 17, 0) 18deg, rgba(17, 17, 17, 0) 324deg, rgb(156 184 221) 345.6deg, rgb(255, 255, 255) 352.8deg)'
                }}
              />
            </div>

            {/* 内容区域 */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-light text-white">
                关于AI在座舱内的畅想
                <br />
                <span className="text-2xl md:text-3xl text-gray-500">Case Study Analysis</span>
              </h3>
              
              <div className="max-w-4xl mt-12">
                <div className="space-y-6">
                  <h4 className="text-2xl font-light text-white">
                    HMI体验的重塑和车内旅程的Update
                  </h4>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      <strong className="text-white">挑战：</strong>
                      传统汽车界面复杂难用，驾驶员在行驶过程中难以快速找到所需功能，在AI浪潮的驱动下，智能汽车有什么新的变革
                    </p>
                    
                    <p>
                      <strong className="text-white">"座舱全局体验"的核心特质：</strong>
                    </p>
                    
                    <ul className="space-y-2 ml-4">
                      <li>• <strong>高度主动性 (Proactive)：</strong> 系统能预知您的需求，在您开口之前就提供服务或建议。</li>
                      <li>• <strong>极致流畅性 (Fluid)：</strong>各种交互方式（语音、手势、HMI）无缝融合，信息和功能在最需要的时候以最自然的方式呈现。</li>
                      <li>• <strong>深度个性化 (Deeply Personalized)：</strong>充分理解每一位乘客的独特性，并据此调整服务和体验的方方面面</li>
                      <li>• <strong>情境自适应 (Contextually Adaptive)：</strong>实时感知并响应车内外环境、乘客状态以及旅程动态的变化。</li>
                      <li>• <strong>生成创造性 (Generative & Creative)：</strong>界面、内容、甚至部分体验本身，都可以由AI根据情境动态生成，而非仅仅是预设。</li>
                      <li>• <strong>情感连接性 (Emotionally Connected)：</strong>AI能理解并适度回应乘客的情感，提供更具人文关怀的互动。</li>
                    </ul>
                    
                    <p>
                      <strong className="text-white">我们可能可以做的：</strong>
                    </p>
                    <p>
                      主动式情境感知与任务智能协同 (Proactive Contextual Awareness & Intelligent Task Orchestration)
                    </p>
                    <p>
                      座舱AI能主动洞察用户潜在需求和当前情境，智能发起并协同完成如旅行规划、日程管理等复杂任务，实现从日常对话到具体行动的无缝转换。
                    </p>
                    <p>
                      生成式多模态人机界面共创 (Generative Multimodal HMI Co-Creation)
                    </p>
                    <p>
                      用户可通过自然语言或手势与AI共同设计座舱界面，AI实时生成动态、个性化的人机交互元素与视觉内容（如AR导航、氛围影像），打造"心随意动"的HMI体验。
                    </p>
                    <p>
                      深度个性化自适应体验引擎 (Deeply Personalized Adaptive Experience Engine)
                    </p>
                    <p>
                      AI深度融合乘客画像、历史偏好、实时情境及OMS数据，为每位乘客动态调整并提供高度个性化的信息娱乐、座舱环境及健康舒适服务。
                    </p>
                    <p>
                      "规划即体验"的无缝旅程管理 (Seamless "Planning-is-Experiencing" Journey Management)
                    </p>
                    <p>
                      AI将行程规划、自动驾驶导航、途中动态调整与情境信息服务（如"随境解说家"）融为一体，实现从方案共创到沉浸式旅程体验的无缝衔接与智能护航。
                    </p>
                    <p>
                      座舱化身"创享体验中心" (Cockpit as a "Co-Creative Experience Hub")
                    </p>
                    <p>
                      AI将座舱转变为支持多用户协作、内容共创（如旅行Vlog智能剪辑、AR互动游戏）及共享娱乐的智能空间，增强人际连接与出行乐趣。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 第四部分：工具与方法 - 树状图 */}
        <AnimatedSection className="content-section">
          <div className="space-y-12">
            <h3 className="text-3xl md:text-4xl font-light text-white">
              常用工具与方法
              <br />
              <span className="text-2xl md:text-3xl text-gray-500">Tools & Methods</span>
            </h3>
            
            {/* 树状图结构 */}
            <div className="relative">
              {/* 主干 */}
              <div className="flex flex-col items-center">
                {/* 根节点 */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl px-8 py-4 mb-8">
                  <h4 className="text-xl font-light text-white text-center">
                    设计思维工具库
                    <br />
                    <span className="text-sm text-gray-400">Design Thinking Toolkit</span>
                  </h4>
                </div>
                
                {/* 主分支连接线 */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400/50 to-transparent mb-4"></div>
                
                {/* 四个主要分类 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                  {[
                    {
                      category: "用户研究工具",
                      categoryEn: "User Research",
                      tools: ["用户访谈", "问卷调研", "用户观察", "焦点小组", "用户画像", "用户旅程地图"],
                      color: "from-yellow-400/20 to-orange-400/20",
                      borderColor: "border-yellow-400/40",
                      lineColor: "bg-yellow-400/50"
                    },
                    {
                      category: "创意生成工具", 
                      categoryEn: "Ideation Tools",
                      tools: ["头脑风暴", "思维导图", "SCAMPER法", "六顶思考帽", "故事板", "角色扮演"],
                      color: "from-orange-400/20 to-red-400/20",
                      borderColor: "border-orange-400/40",
                      lineColor: "bg-orange-400/50"
                    },
                    {
                      category: "原型制作工具",
                      categoryEn: "Prototyping Tools",
                      tools: ["纸质原型", "数字原型", "交互原型", "服务蓝图", "线框图", "高保真原型"],
                      color: "from-red-400/20 to-red-500/20",
                      borderColor: "border-red-400/40",
                      lineColor: "bg-red-400/50"
                    },
                    {
                      category: "测试验证工具",
                      categoryEn: "Testing Tools",
                      tools: ["可用性测试", "A/B测试", "专家评审", "启发式评估", "眼动追踪", "数据分析"],
                      color: "from-red-500/20 to-red-600/20",
                      borderColor: "border-red-500/40",
                      lineColor: "bg-red-500/50"
                    }
                  ].map((category, categoryIndex) => (
                    <div key={categoryIndex} className="relative flex flex-col items-center">
                      {/* 分支连接线到根节点 */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className={`w-0.5 h-8 ${category.lineColor}`}></div>
                      </div>
                      
                      {/* 水平连接线 */}
                      {categoryIndex < 3 && (
                        <div className="absolute -top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400/30 to-blue-400/10 hidden lg:block"></div>
                      )}
                      
                      {/* 分类节点 */}
                      <div className={`bg-gradient-to-br ${category.color} border ${category.borderColor} rounded-xl px-6 py-4 mb-6 w-full`}>
                        <h5 className="text-lg font-light text-white text-center mb-1">
                          {category.category}
                        </h5>
                        <p className="text-xs text-gray-400 text-center">
                          {category.categoryEn}
                        </p>
                      </div>
                      
                      {/* 子分支连接线 */}
                      <div className={`w-0.5 h-4 ${category.lineColor} mb-4`}></div>
                      
                      {/* 工具叶子节点 */}
                      <div className="space-y-3 w-full">
                        {category.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="relative">
                            {/* 连接线到分类节点 */}
                            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                              <div className={`w-3 h-0.5 ${category.lineColor}`}></div>
                              <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-1 ${category.lineColor} rounded-full`}></div>
                            </div>
                            
                            {/* 工具节点 */}
                            <div className="bg-gray-900/50 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/50 rounded-lg px-3 py-2 ml-4 transition-all duration-300 group">
                              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                {tool}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 树状图说明 */}
              <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm">
                  每个阶段都有对应的工具集合，可根据项目需求灵活选择和组合使用
                  <br />
                  <span className="text-xs text-gray-600">Each stage has corresponding tool sets that can be flexibly selected and combined based on project needs</span>
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 第五部分：未来展望 */}
        <AnimatedSection className="content-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                <video 
                  src={designThinkingImages.futureDesign}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-3xl md:text-4xl font-light text-white">
                设计思维的未来
                <br />
                <span className="text-2xl md:text-3xl text-gray-500">Future of Design Thinking</span>
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  随着人工智能、虚拟现实等新技术的发展，设计思维也在不断演进。
                  未来的设计思维将更加注重：
                </p>
                
                <ul className="space-y-2 ml-4">
                  <li>• <strong className="text-white">AI辅助设计：</strong>利用机器学习优化设计决策</li>
                  <li>• <strong className="text-white">沉浸式体验：</strong>VR/AR技术增强用户共情</li>
                  <li>• <strong className="text-white">可持续设计：</strong>环保和社会责任导向</li>
                  <li>• <strong className="text-white">包容性设计：</strong>为所有用户群体设计</li>
                  <li>• <strong className="text-white">系统性思维：</strong>从产品设计到服务生态</li>
                </ul>
                
                <p>
                  作为设计师，我们需要保持开放的心态，持续学习新的工具和方法，
                  同时坚持以人为中心的设计理念，创造更有意义的用户体验。
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 相关链接 */}
        <AnimatedSection className="content-section">
          <div className="border-t border-gray-800 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              <div>
                <h4 className="text-xl font-light text-white mb-2">
                  继续探索
                  <br />
                  <span className="text-lg text-gray-500">Continue Exploring</span>
                </h4>
                <p className="text-gray-400">
                  了解更多设计方法论和实践案例
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Link 
                  to="/project/01"
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 group"
                >
                  <span>查看HMI项目</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
                
                <Link 
                  to="/"
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 group"
                >
                  <span>返回首页</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DesignThinking; 