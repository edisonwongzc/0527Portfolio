export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "1",
    title: "UI/UX设计",
    description: "专业的用户界面和用户体验设计，注重用户需求和商业目标的平衡",
    icon: "Palette",
    features: [
      "用户研究与分析",
      "信息架构设计", 
      "交互原型制作",
      "视觉界面设计",
      "可用性测试"
    ]
  },
  {
    id: "2",
    title: "品牌设计",
    description: "从品牌策略到视觉实现，打造独特且具有辨识度的品牌形象",
    icon: "Zap",
    features: [
      "品牌策略分析",
      "Logo设计",
      "视觉识别系统",
      "品牌应用设计",
      "品牌指导手册"
    ]
  },
  {
    id: "3",
    title: "产品设计",
    description: "端到端的产品设计服务，从概念到实现的全流程支持",
    icon: "Smartphone",
    features: [
      "产品策略规划",
      "功能设计",
      "交互设计",
      "视觉设计",
      "开发协作"
    ]
  },
  {
    id: "4",
    title: "设计系统",
    description: "构建可扩展的设计系统，提高团队效率和产品一致性",
    icon: "Grid",
    features: [
      "设计原则制定",
      "组件库构建",
      "设计规范文档",
      "团队培训",
      "系统维护"
    ]
  }
]; 