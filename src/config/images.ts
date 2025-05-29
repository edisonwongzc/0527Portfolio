/**
 * 图片配置文件
 * 管理项目中的所有图片资源
 */

// 检查图片是否存在的辅助函数
const getImagePath = (localPath: string, fallbackUrl: string) => {
  // 在生产环境中，优先使用本地图片
  // 如果本地图片不存在，则使用在线占位符
  // 这里暂时返回在线图片，你可以逐步替换为本地图片
  return fallbackUrl;
};

/**
 * 项目图片配置
 */
export const projectImages = {
  '01': {
    main: '/images/projects/01/gallery/01.jpg', // ✅ 更新为gallery路径
    gallery: [
      '/images/projects/01/gallery/01.jpg',
      '/images/projects/01/gallery/02.jpg',
      '/images/projects/01/gallery/03.jpg'
    ]
  },
  '02': {
    main: getImagePath(
      '/images/project-02-design-analysis.jpg',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center'
    ),
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&crop=center'
    ]
  },
  '03': {
    main: '/images/project-03-ai-explore.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop&crop=center'
    ]
  },
  '04': {
    main: '/images/project-04-brand-illustrate.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=800&h=600&fit=crop&crop=center'
    ]
  },
  '05': {
    main: '/images/project-05-system-design.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&crop=center'
    ]
  },

};

/**
 * 服务图片配置
 */
export const serviceImages = {
  designThinking: getImagePath(
    '/images/service-design-thinking.jpg',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=450&fit=crop&crop=center'
  )
};

/**
 * 获取项目图片
 */
export const getProjectImage = (projectId: string) => {
  return projectImages[projectId as keyof typeof projectImages]?.main || projectImages['01'].main;
};

/**
 * 获取项目画廊图片（用于"View Details"弹窗）
 * 动态加载 gallery 文件夹中的图片
 */
export const getProjectGallery = (projectId: string) => {
  // 定义每个项目的gallery图片数量
  const galleryCount = {
    '01': 5, // HMI Design Center
    '02': 4, // Design Analysis  
    '03': 6, // AI Explore and Research
    '04': 2, // Brand / illustrate - 只保留01和02两张图
    '05': 3  // System specification Design
  };

  const count = galleryCount[projectId as keyof typeof galleryCount] || 3;
  
  // 生成gallery图片路径
  const galleryImages = [];
  for (let i = 1; i <= count; i++) {
    const imageNumber = i.toString().padStart(2, '0'); // 01, 02, 03...
    galleryImages.push(`/images/projects/${projectId}/gallery/${imageNumber}.jpg`);
  }
  
  // 如果本地图片不存在，回退到配置的在线图片
  return galleryImages.length > 0 ? galleryImages : (projectImages[projectId as keyof typeof projectImages]?.gallery || projectImages['01'].gallery);
};

/**
 * 获取项目更多作品赏析图片（用于页面底部展示）
 * 动态加载 showcase 文件夹中的图片
 */
export const getProjectShowcase = (projectId: string) => {
  // 定义每个项目的showcase图片数量
  const showcaseCount = {
    '01': 5, // HMI Design Center - 更多作品赏析
    '02': 5, // Design Analysis - 更多作品赏析
    '03': 4, // AI Explore and Research - 更多作品赏析 (只保留01-04)
    '04': 0, // Brand / illustrate - 已删除更多作品赏析
    '05': 0  // System specification Design - 已删除更多作品赏析
  };

  const count = showcaseCount[projectId as keyof typeof showcaseCount] || 6;
  
  // 生成showcase图片路径
  const showcaseImages = [];
  for (let i = 1; i <= count; i++) {
    const imageNumber = i.toString().padStart(2, '0'); // 01, 02, 03...
    showcaseImages.push(`/images/projects/${projectId}/showcase/${imageNumber}.jpg`);
  }
  
  return showcaseImages;
}; 