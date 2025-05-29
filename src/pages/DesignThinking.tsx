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
    // 页面进入动画
    const tl = gsap.timeline();
    
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // 滚动触发的内容动画
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
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
          <div className="space-y-12">
            <h3 className="text-3xl md:text-4xl font-light text-white">
              实践案例分析
              <br />
              <span className="text-2xl md:text-3xl text-gray-500">Case Study Analysis</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h4 className="text-2xl font-light text-white">
                  汽车HMI界面重设计
                </h4>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    <strong className="text-white">挑战：</strong>
                    传统汽车界面复杂难用，驾驶员在行驶过程中难以快速找到所需功能，
                    存在安全隐患。
                  </p>
                  
                  <p>
                    <strong className="text-white">设计思维应用：</strong>
                  </p>
                  
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>共情：</strong>深度访谈50+驾驶员，观察真实驾驶行为</li>
                    <li>• <strong>定义：</strong>核心问题是信息层级混乱和操作路径冗长</li>
                    <li>• <strong>构思：</strong>提出"一键直达"和"情境感知"概念</li>
                    <li>• <strong>原型：</strong>制作交互原型，模拟真实驾驶场景</li>
                    <li>• <strong>测试：</strong>驾驶模拟器测试，操作效率提升40%</li>
                  </ul>
                  
                  <p>
                    <strong className="text-white">成果：</strong>
                    新界面将常用功能的操作步骤从平均3.2步减少到1.4步，
                    用户满意度提升65%。
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img 
                    src={designThinkingImages.hmiRedesignCase}
                    alt="HMI重设计案例"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <img 
                      src={designThinkingImages.beforeInterface}
                      alt="改进前界面"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <img 
                      src={designThinkingImages.afterInterface}
                      alt="改进后界面"
                      className="w-full h-full object-cover"
                    />
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
                <img 
                  src={designThinkingImages.futureDesign}
                  alt="未来设计趋势"
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