export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  year: number;
  client?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "电商平台重设计",
    description: "为知名电商平台重新设计用户界面，提升用户体验和转化率",
    longDescription: "这是一个综合性的电商平台重设计项目，重点关注用户体验优化、界面现代化和转化率提升。项目包括用户调研、信息架构设计、交互原型制作和视觉设计等完整流程。最终实现了30%的用户满意度提升和25%的转化率增长。",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "UI/UX设计",
    tags: ["UI设计", "UX设计", "电商", "用户体验"],
    demoUrl: "https://demo.example.com",
    year: 2024,
    client: "某知名电商平台"
  },
  {
    id: "2", 
    title: "移动应用设计系统",
    description: "构建统一的设计系统，提高团队协作效率和产品一致性",
    longDescription: "为大型科技公司构建完整的移动端设计系统，包括设计原则、组件库、图标系统、颜色规范等。该项目大大提高了设计团队的工作效率，确保了产品在不同平台间的一致性，并为后续产品迭代奠定了坚实基础。",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    category: "设计系统",
    tags: ["设计系统", "移动端", "组件库", "规范"],
    year: 2024,
    client: "科技公司"
  },
  {
    id: "3",
    title: "品牌视觉识别设计",
    description: "为初创公司打造完整的品牌视觉识别系统",
    longDescription: "从零开始为一家新兴科技初创公司设计完整的品牌视觉识别系统，包括logo设计、配色方案、字体规范、应用系统等。项目涵盖了品牌策略分析、竞品调研、概念开发、视觉实现等各个环节，最终帮助客户建立了独特且具有辨识度的品牌形象。",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    category: "品牌设计",
    tags: ["品牌设计", "Logo设计", "视觉识别", "初创公司"],
    year: 2023,
    client: "Tech Startup"
  },
  {
    id: "4",
    title: "智能家居控制界面",
    description: "设计直观易用的智能家居控制应用界面",
    longDescription: "为智能家居产品设计用户友好的控制界面，重点解决复杂功能的简化表达和多设备统一管理的问题。通过深入的用户研究和多轮迭代测试，创造了直观、高效的交互体验，获得了用户的广泛好评。",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "产品设计",
    tags: ["产品设计", "智能家居", "IoT", "交互设计"],
    demoUrl: "https://demo.smarthome.com",
    year: 2023,
    client: "智能家居公司"
  },
  {
    id: "5",
    title: "在线教育平台界面",
    description: "为在线教育平台设计现代化、易用的学习界面",
    longDescription: "在疫情背景下，为在线教育平台设计了全新的用户界面，重点关注学习体验的优化和教学效果的提升。项目包括学生端、教师端和管理端的完整设计，通过创新的交互方式和清晰的信息架构，大大提升了在线学习的参与度和效果。",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    category: "教育科技",
    tags: ["教育", "在线学习", "界面设计", "用户体验"],
    year: 2023,
    client: "在线教育公司"
  },
  {
    id: "6",
    title: "金融应用安全设计",
    description: "为金融应用设计安全可信的用户界面",
    longDescription: "为金融科技公司设计安全、可信赖的移动银行应用界面。项目特别注重安全性设计和用户信任感的建立，通过合理的信息层级、清晰的操作流程和专业的视觉设计，在保证安全性的同时提供了优秀的用户体验。",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    category: "金融科技",
    tags: ["金融", "安全设计", "移动应用", "信任度"],
    year: 2022,
    client: "金融科技公司"
  }
];

export const categories = [
  "全部",
  "UI/UX设计", 
  "设计系统",
  "品牌设计",
  "产品设计",
  "教育科技",
  "金融科技"
]; 