/**
 * 故事模块内容配置
 * 基于叙事线设计的个人品牌故事
 */

export interface StoryModule {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  background: string;
  textColor: string;
  meta?: {
    duration?: number;
    transition?: string;
    audio?: string;
  };
}

/**
 * 版本A：经典个人品牌叙事线
 * 从个人介绍到专业展示到未来愿景
 */
export const classicStoryline: StoryModule[] = [
  {
    id: 'awakening',
    title: 'EdisonWong',
    subtitle: 'Where Code Meets Canvas',
    content: 'From engineering backgrounds to digital artistry, I discovered that the most powerful designs happen at the intersection of logic and creativity.',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d2d5a 100%)',
    textColor: 'white',
    meta: {
      duration: 3000,
      transition: 'gentle-fade'
    }
  },
  {
    id: 'philosophy',
    title: 'Design is Storytelling',
    subtitle: 'Every Interface Whispers a Secret',
    content: 'I believe design is not decoration—it\'s communication. Each pixel placement, every micro-interaction, tells part of a larger story about human connection and digital empathy.',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #8b2635 100%)',
    textColor: 'white',
    meta: {
      duration: 4000,
      transition: 'dramatic-zoom'
    }
  },
  {
    id: 'journey',
    title: 'The Path Traveled',
    subtitle: '8 Years, 100+ Projects, Endless Learning',
    content: 'From late-night coding sessions to boardroom presentations. From startup chaos to enterprise precision. Each project taught me that great design solves problems people didn\'t even know they had.',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #0099cc 100%)',
    textColor: 'white',
    meta: {
      duration: 3500,
      transition: 'perspective-shift'
    }
  },
  {
    id: 'impact',
    title: 'Beyond Beautiful',
    subtitle: 'Design That Changes Behavior',
    content: 'I don\'t just make things look good—I make them work better. My designs have increased user engagement by 300%, reduced support tickets by 60%, and most importantly, made people smile.',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #2ecc71 100%)',
    textColor: 'white',
    meta: {
      duration: 4000,
      transition: 'elastic-bounce'
    }
  },
  {
    id: 'invitation',
    title: 'Your Story Awaits',
    subtitle: 'Let\'s Write the Next Chapter Together',
    content: 'Don\'t wait until tomorrow to tell the story your brand deserves. Every great design starts with a conversation.',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #ff9800 100%)',
    textColor: 'white',
    meta: {
      duration: 3000,
      transition: 'warm-glow'
    }
  }
];

/**
 * 版本B：问题-解决方案导向叙事
 * 更商业化，强调价值主张
 */
export const problemSolutionStoryline: StoryModule[] = [
  {
    id: 'problem',
    title: 'The Digital Disconnect',
    subtitle: 'When Technology Feels Cold',
    content: 'We live in a world where digital interfaces are everywhere, yet most feel mechanical, impersonal, disconnected from human needs.',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #3d4f62 100%)',
    textColor: 'white'
  },
  {
    id: 'insight',
    title: 'EdisonWong',
    subtitle: 'Bridging Human & Digital',
    content: 'I specialize in creating interfaces that don\'t just function—they connect, inspire, and feel genuinely human.',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8b5a9a 100%)',
    textColor: 'white'
  },
  {
    id: 'approach',
    title: 'The Method',
    subtitle: 'Psychology + Technology + Art',
    content: 'By combining user psychology, cutting-edge technology, and artistic sensibility, I create experiences that users don\'t just use—they love.',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #d63384 100%)',
    textColor: 'white'
  },
  {
    id: 'results',
    title: 'Proven Impact',
    subtitle: 'Metrics That Matter',
    content: '300% increase in user engagement • 60% reduction in support tickets • 95% client satisfaction rate • Designs that deliver real business results.',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #17a2b8 100%)',
    textColor: 'white'
  },
  {
    id: 'future',
    title: 'Your Success Story',
    subtitle: 'Ready to Transform Your Digital Presence?',
    content: 'Let\'s create something that your users will remember, your competitors will envy, and your business will thank you for.',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #20c997 100%)',
    textColor: 'white'
  }
];

/**
 * 版本C：情感驱动叙事
 * 更个人化，强调情感连接
 */
export const emotionalStoryline: StoryModule[] = [
  {
    id: 'beginning',
    title: 'Once Upon a Time',
    subtitle: 'A Kid Who Loved Both Math and Art',
    content: 'They said I had to choose. Logic or creativity. Code or canvas. But what if the most beautiful solutions happen when you refuse to choose?',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: 'white'
  },
  {
    id: 'discovery',
    title: 'The Eureka Moment',
    subtitle: 'When Pixels Became Poetry',
    content: 'That first time I coded an animation that made someone smile. That\'s when I knew: design isn\'t just what it looks like—it\'s how it makes people feel.',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: 'white'
  },
  {
    id: 'mastery',
    title: 'EdisonWong',
    subtitle: 'Crafting Digital Emotions',
    content: 'Eight years of turning complex problems into simple, beautiful solutions. Each project is a chance to create joy, spark curiosity, and connect hearts through screens.',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: 'white'
  },
  {
    id: 'purpose',
    title: 'Why I Design',
    subtitle: 'Because Technology Should Feel Human',
    content: 'In a world of endless notifications and digital overwhelm, I create spaces that feel calm, purposeful, and genuinely helpful.',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    textColor: 'white'
  },
  {
    id: 'together',
    title: 'Our Story Begins Now',
    subtitle: 'What Will We Create Together?',
    content: 'Every great design starts with a dream. Share yours with me, and let\'s bring it to life.',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    textColor: 'white'
  }
];

/**
 * 当前激活的故事线
 */
export const activeStoryline = classicStoryline;

/**
 * 内容定制选项
 */
export const contentOptions = {
  // 个人信息定制
  personal: {
    name: 'EdisonWong',
    title: 'Digital Designer & Creative Director',
    yearsOfExperience: 8,
    projectCount: 100,
    clientSatisfaction: 95,
    location: 'Shanghai',
    email: '18321445543@163.com'
  },
  
  // 品牌色彩主题
  themes: {
    professional: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#4facfe'
    },
    creative: {
      primary: '#f093fb',
      secondary: '#f5576c',
      accent: '#43e97b'
    },
    minimal: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db'
    }
  },
  
  // 行业特化内容
  industries: {
    tech: 'SaaS platforms, mobile apps, and developer tools',
    healthcare: 'Patient-centered digital health solutions',
    finance: 'Fintech apps and trading platforms',
    ecommerce: 'Online stores and marketplace experiences',
    education: 'Learning platforms and educational tools'
  }
};

export default {
  classicStoryline,
  problemSolutionStoryline,
  emotionalStoryline,
  activeStoryline,
  contentOptions
}; 