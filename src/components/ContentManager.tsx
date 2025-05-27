import { useState } from 'react';
import { 
  classicStoryline, 
  problemSolutionStoryline, 
  emotionalStoryline,
  contentOptions 
} from '../data/storyContent';

/**
 * 内容管理组件
 * 用于预览和切换不同的故事线版本
 */
const ContentManager = () => {
  const [selectedStoryline, setSelectedStoryline] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState('professional');
  
  const storylines = {
    classic: {
      name: '经典个人品牌',
      description: '从个人介绍到专业展示的经典叙事线',
      data: classicStoryline,
      bestFor: '专业作品集、个人网站'
    },
    problem: {
      name: '问题解决方案',
      description: '商业导向，强调价值主张和解决方案',
      data: problemSolutionStoryline,
      bestFor: '商业提案、客户展示'
    },
    emotional: {
      name: '情感驱动',
      description: '个人化叙事，强调情感连接',
      data: emotionalStoryline,
      bestFor: '个人品牌、创意展示'
    }
  };

  const currentStoryline = storylines[selectedStoryline as keyof typeof storylines];

  return (
    <div className="content-manager max-w-6xl mx-auto p-8 bg-gray-900 rounded-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-white mb-4">内容定制中心</h2>
        <p className="text-gray-400">选择最适合您的故事线和主题风格</p>
      </div>

      {/* 故事线选择 */}
      <div className="mb-12">
        <h3 className="text-xl font-light text-white mb-6">故事线版本</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(storylines).map(([key, storyline]) => (
            <div
              key={key}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedStoryline === key
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
              onClick={() => setSelectedStoryline(key)}
            >
              <h4 className="text-lg font-medium text-white mb-2">{storyline.name}</h4>
              <p className="text-gray-400 text-sm mb-3">{storyline.description}</p>
              <div className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full inline-block">
                {storyline.bestFor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 主题色彩选择 */}
      <div className="mb-12">
        <h3 className="text-xl font-light text-white mb-6">视觉主题</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(contentOptions.themes).map(([key, theme]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedTheme === key
                  ? 'border-white/30 bg-white/5'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
              onClick={() => setSelectedTheme(key)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.secondary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <h4 className="text-white font-medium capitalize">{key}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* 内容预览 */}
      <div className="mb-8">
        <h3 className="text-xl font-light text-white mb-6">内容预览</h3>
        <div className="space-y-4">
          {currentStoryline.data.map((module, index) => (
            <div
              key={module.id}
              className="p-6 rounded-xl border border-gray-700 bg-gray-800/30"
              style={{
                background: `linear-gradient(135deg, ${module.background.split('(')[1].split(')')[0]})`,
                opacity: 0.9
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-sm text-white/60 mb-1">模块 {index + 1}</div>
                  <h4 className="text-2xl font-light text-white mb-2">{module.title}</h4>
                  <h5 className="text-lg text-white/80 mb-4">{module.subtitle}</h5>
                </div>
                <div className="text-sm text-white/40">
                  {module.meta?.duration ? `${module.meta.duration/1000}s` : '3s'}
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">{module.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 个人信息定制 */}
      <div className="mb-8">
        <h3 className="text-xl font-light text-white mb-6">个人信息定制</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">姓名</label>
              <input
                type="text"
                defaultValue={contentOptions.personal.name}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">职位</label>
              <input
                type="text"
                defaultValue={contentOptions.personal.title}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">工作年限</label>
              <input
                type="number"
                defaultValue={contentOptions.personal.yearsOfExperience}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">项目数量</label>
              <input
                type="number"
                defaultValue={contentOptions.personal.projectCount}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">客户满意度</label>
              <input
                type="number"
                defaultValue={contentOptions.personal.clientSatisfaction}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">邮箱</label>
              <input
                type="email"
                defaultValue={contentOptions.personal.email}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 行业特化选择 */}
      <div className="mb-8">
        <h3 className="text-xl font-light text-white mb-6">行业特化</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(contentOptions.industries).map(([key, description]) => (
            <div
              key={key}
              className="p-4 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-gray-600 transition-colors duration-300 cursor-pointer"
            >
              <h4 className="text-white font-medium capitalize mb-2">{key}</h4>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
          应用更改
        </button>
        <button className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-all duration-300">
          预览效果
        </button>
        <button className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-all duration-300">
          导出配置
        </button>
      </div>
    </div>
  );
};

export default ContentManager; 