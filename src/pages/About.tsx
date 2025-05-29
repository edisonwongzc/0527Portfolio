import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlowingLinesBackground from '../components/FlowingLinesBackground';

const About = () => {
  console.log('About page rendered'); // 调试信息
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 流光线条动态背景 - 覆盖整个首屏 */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <FlowingLinesBackground />
      </div>
      
      <section className="px-6 lg:px-12 py-32 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 - 左对齐 */}
          <div className="mb-16 relative">
            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-extralight text-white leading-none tracking-tighter mb-8 text-left">
                About Me
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl">
                Experience Creative Designer specializing in cockpit experience design and digital product design.
                <br />
                <span className="text-lg text-gray-500 mt-2 block">专注于座舱体验设计和数字产品设计的体验创意设计师。</span>
              </p>
            </div>
          </div>

          {/* 职业概述 */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Professional Overview
              <br />
              <span className="text-2xl md:text-3xl text-gray-500">职业概述</span>
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                With over 15 years of experience in user experience research and digital product design, I have driven digital transformation across multiple industries including finance, healthcare, new energy vehicles, and smart hardware. I excel in product analysis, user experience, and AI applications, with expertise in establishing product experience evaluation systems.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                I possess extensive experience in product design and implementation, having led numerous industry-leading product innovation projects. With deep research in intelligent cockpit design and multimodal experiences, I excel at optimizing products and experiences through data-driven insights and user research. I am passionate about exploring new technologies and emerging fields.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mt-4">
                拥有15+年以上用户体验研究与数字化产品设计，在金融、医疗、新能源汽车及智能硬件等多个行业推动数字化转型。精通产品分析、用户体验及AI应用，擅长建立产品体验评估体系。具备丰富的产品设计及落地经验，主导过多个行业领先的产品创新项目。对智能座舱设计和多模态体验有深入研究，善于通过数据驱动产品和用户洞察优化产品及体验。乐于专业新技术和新领域探索。
              </p>
            </div>
          </div>

          {/* 工作经历区域 */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Work Experience
              <br />
              <span className="text-2xl md:text-3xl text-gray-500">工作经历</span>
            </h2>

            {/* 工作经历列表 */}
            <div className="space-y-8">
              {/* 工作经历1 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">上海墨芸信息科技有限公司</h3>
                    <p className="text-sm text-gray-500">202406 - Present</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">合伙人</h4>
                    <p className="text-sm text-gray-500">Partner</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 帮助客户完成ToB/ToC（HMI、OS、APP、小程序、移动终端大屏等）产品规划与设计，制定体验战略框架和产品评估体系，推动产品体验创新</li>
                      <li>• 通过数据驱动的方法，设计用户行为分析体系，识别用户痛点与机会点，制定改进策略</li>
                      <li>• 将用户洞察转化为可执行的设计解决方案，并推动重点项目落地（魏桥新能源HMI、平安智慧养老、犀重商用车操作系统、远景能源内部管理系统、上海进博会宣传应用、湖南省医协会控费软件相关产品设计及体验设计等）</li>
                      <li>• 帮助客户建立用户体验与商业价值的评估体系，优化产品策略。并协作客户建立跨部门用户反馈和分析机制，持续推动组织用户体验能力提升，并显著提升产品用户满意度</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历2 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">Viatris.</h3>
                    <p className="text-sm text-gray-500">202303 - 202406</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Product Experience Director</h4>
                    <p className="text-sm text-gray-500">产品体验总监</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 主导产品体验体系重构，建立"产品-体验-数据"闭环系统，推动企业数字化转型体验提升及产品设计落地。建立用户需求洞察机制，分析用户反馈数据，构建用户画像画像，打造慢病管理和医患沟通平台，通过提升药品使⽤者健康管理⼼智和培养健康管理习惯，逐步提升药物依从性和治疗DOT，为有消费能⼒的药品使⽤者，提供定制化的专业健康服务。</li>
                      <li>• 运用服务蓝图整合线上线下触点，针对策划针对从业者（医院、零售药店、医⽣、药师）的⾏业提效⼯具，通过提升医疗体系和零售体系效率，实现同渠道合作伙伴的⾼效协同。</li>
                      <li>• 利用AI工具建立敏捷开发与设计协同机制，推动产研协作效率提升50%及部门协作机制，推动设计驱动业务创新。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历3 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">HozonAuto</h3>
                    <p className="text-sm text-gray-500">202109 - 202303</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Senior Design Director</h4>
                    <p className="text-sm text-gray-500">高级设计总监</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 主导智能座舱系统产品（Neta OS1.0-2.0）、移动端产品及前瞻概念设计，并带领系统开发团队完成落地推广。</li>
                      <li>• 打造爆款车型（哪吒X/L）车型产品定义及座舱交互体验定义，实现用户满意度提升78%和日订单3W+。</li>
                      <li>• 结合场景分析与用户行为数据，推导并设计出智能功能矩阵，使核心功能（智驾地图、语音、0重力座舱座椅、头枕环绕音响等）使用率提40%，并构建用户行为分析体系，结合市场调研与竞品分析，为产品迭代提供数据支持，最大限度完成产品的商业价值。</li>
                      <li>• 推动跨部门协作与AI工具应用，确保多个创新项目并行交付。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历4 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">腾讯车联 / 梧桐车联</h3>
                    <p className="text-sm text-gray-500">201810 - 202107</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Product Design Director</h4>
                    <p className="text-sm text-gray-500">产品设计总监</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 协助CEO制定车联网创新产品战略、设计规划、概念设定及项目落地，并主导座舱智能系统（TOS1.0-3.0）全局系统设计。</li>
                      <li>• 重新定义产品定位并构建数据分析体系，深度采集用户行为数据，制定数据驱动的产品及设计优化策略。通过用户研究与A/B测试，评估产品迭代效果，提升用户体验与市场竞争力。</li>
                      <li>• 从0到1组建产设团队，推动跨部门协作。确保核心项目按时交付，建立项目优先级评估机制，提升资源配置效率与项目推进速度。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历5 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">阿里巴巴/斑马汽车</h3>
                    <p className="text-sm text-gray-500">201707-201810</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Design Expert</h4>
                    <p className="text-sm text-gray-500">设计专家</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 协助产品VP完成智能座舱产品规划及对外概念设计，并带领团队高效执行（斑马OS2.0、地图桌面、云栖大会展会等）。从而推动产品创新与行业影响力提升。</li>
                      <li>• 结合数据分析体系（红黑榜），通过定量与定性数据，制定产品体验评价标准。并使用用户反馈与数据分析，建立用户体验改进机制，提升用户满意度15%。</li>
                      <li>• 统一平台产品规发，制定一致性标准，确保产品体验的持续优化。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历6 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">ARK Design</h3>
                    <p className="text-sm text-gray-500">201701-201707</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Creative Director</h4>
                    <p className="text-sm text-gray-500">创意总监</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 负为客户（KFC、招商银行、麦当劳、得道、NIKE等）提供用户体验及产品战略咨询，制定可量化的提升策略与路线图。通过用户研究与市场分析，识别关键机会点，推动产品创新。</li>
                      <li>• 构建用户体验度量体系，持续监测改进效果，提升用户满意度。</li>
                      <li>• 协调并提升客户团队的用户体验设计与产品管理能力，推动团队能力建设。</li>
                      <li>• 推动设计创新和跨媒体整合营销解决方案</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历7 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">平安集团</h3>
                    <p className="text-sm text-gray-500">201304-201701</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Design Director</h4>
                    <p className="text-sm text-gray-500">设计总监</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 制定金融科技产品战略设计及用户体验设计，推动产品创新与业务目标达成。</li>
                      <li>• 主导平安银行、平安保险等核心业务的移动端产品设计</li>
                      <li>• 建立集团级设计规范和标准化流程，提升设计效率</li>
                      <li>• 推动金融科技产品的用户体验创新和数字化转型</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历8 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">火星时代</h3>
                    <p className="text-sm text-gray-500">2011-2013</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Project Manager</h4>
                    <p className="text-sm text-gray-500">项目负责人</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 主导火星时代官网与线上教育平台的开发与升级，推动用户体验创新。</li>
                      <li>• 负责多个场馆项目空间设计和多媒体设计（如中国文物服饰馆、袜子博物馆），提升品牌影响力。</li>
                      <li>• 协同教育业务负责人，自主研发互动多媒体课程，成功实现单专业学费收入4亿元。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 工作经历9 */}
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-light text-white mb-2">奥美广告</h3>
                    <p className="text-sm text-gray-500">2010-2011</p>
                  </div>
                  <div className="lg:col-span-1">
                    <h4 className="text-base font-light text-gray-300 mb-2">Interactive Designer</h4>
                    <p className="text-sm text-gray-500">创意互动设计师</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
                      <li>• 负责大众甲壳虫中国品牌传播、NBA09中国行线上媒体设计、香港公交公司、香港中文大学、李宁跑鞋、故宫博物院、香港管弦乐团、香港交强公积金、可口可乐网站和媒体互动设计设计。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 技能与专长 */}
            <div className="mt-16 pt-12 border-t border-gray-800">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                Skills & Expertise
                <br />
                <span className="text-2xl md:text-3xl text-gray-500">技能与专长</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Core Competencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'User Experience & Interaction Design', 
                      'Conceptual Innovation Design', 
                      'Intelligent Cockpit Product Design'
                    ].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 
                                 hover:bg-gray-800 hover:border-gray-600 hover:text-white hover:scale-105 
                                 transition-all duration-300 ease-out cursor-pointer
                                 hover:shadow-lg hover:shadow-gray-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Design & Strategy</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Brand Design', 
                      'Product Strategy Design', 
                      'Design System Development'
                    ].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300
                                 hover:bg-gray-800 hover:border-gray-600 hover:text-white hover:scale-105 
                                 transition-all duration-300 ease-out cursor-pointer
                                 hover:shadow-lg hover:shadow-gray-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Research & Innovation</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'User Research & Data Analysis', 
                      'AI Exploration & Application'
                    ].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300
                                 hover:bg-gray-800 hover:border-gray-600 hover:text-white hover:scale-105 
                                 transition-all duration-300 ease-out cursor-pointer
                                 hover:shadow-lg hover:shadow-gray-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 教育背景 */}
            <div className="mt-16 pt-12 border-t border-gray-800">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                Education
                <br />
                <span className="text-2xl md:text-3xl text-gray-500">教育背景</span>
              </h2>
              
              <div className="border-l-2 border-gray-800 pl-8 py-6 hover:border-gray-600 transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-light text-white mb-2">University of Sunderland</h3>
                    <p className="text-base text-gray-300 mb-2">Master of Arts in Design</p>
                    <p className="text-sm text-gray-500">英国桑德兰大学 硕士</p>
                  </div>
                  <div className="lg:col-span-1">
                  </div>
                  <div className="lg:col-span-1">
                    <p className="text-sm text-gray-400">Shanghai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 联系信息 */}
            <div className="mt-16 pt-12 border-t border-gray-800">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                Get in Touch
                <br />
                <span className="text-2xl md:text-3xl text-gray-500">联系方式</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 mb-4">
                    Currently available for new projects and collaborations.
                    <br />
                    <span className="text-sm text-gray-500">目前接受新项目和合作机会。</span>
                  </p>
                  <a 
                    href="mailto:18321445543@163.com"
                    className="text-white hover:text-gray-300 transition-colors duration-300 text-lg"
                  >
                    18321445543@163.com
                  </a>
                </div>
                
                <div className="flex space-x-6">
                  <a 
                    href="https://linkedin.com/in/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://dribbble.com/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Dribbble
                  </a>
                  <a 
                    href="https://twitter.com/edisonwong" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
