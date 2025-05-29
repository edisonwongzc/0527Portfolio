/**
 * 设计思路探索页面图片配置
 */
export const designThinkingImages = {
  // HMI重设计案例
  hmiRedesignCase: '/images/design-thinking/hmi-case-study.jpg',
  
  // 界面对比图
  beforeInterface: '/images/design-thinking/before-interface.jpg',
  afterInterface: '/images/design-thinking/after-interface.jpg',
  
  // 未来设计趋势 - 视频文件
  futureDesign: '/videos/design-thinking/future-trends.mp4',
  
  // 用户研究过程
  userResearchProcess: '/images/design-thinking/user-research.jpg',
  
  // 原型制作过程
  prototypingProcess: '/images/design-thinking/prototyping.jpg',
  
  // 测试验证过程
  testingProcess: '/images/design-thinking/testing.jpg'
};

/**
 * 获取设计思路探索图片
 */
export const getDesignThinkingImage = (imageName: keyof typeof designThinkingImages): string => {
  return designThinkingImages[imageName] || '/images/placeholder.jpg';
}; 