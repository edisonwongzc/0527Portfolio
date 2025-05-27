# 🎬 视频管理系统 / Video Management System

## 📁 完整文件夹结构 / Complete Folder Structure

```
portfolio/public/
├── videos/                          # 视频根目录
│   ├── README.md                    # 基本说明
│   ├── UPLOAD_GUIDE.md             # 详细上传指南
│   ├── VIDEO_MANAGEMENT.md         # 视频管理说明（本文件）
│   ├── hmi-demo.mp4                # HMI主演示视频 ⭐
│   ├── hmi-demo.webm               # HMI备用视频（可选）
│   └── projects/                   # 项目视频分类
│       ├── 01/                     # HMI Design Center
│       │   ├── README.md           # 项目视频说明
│       │   ├── main-demo.mp4       # 主演示视频
│       │   ├── interaction-demo.mp4 # 交互演示
│       │   └── overview.mp4        # 项目概览
│       ├── 02/                     # Design Analysis
│       ├── 03/                     # AI Explore and Research
│       ├── 04/                     # Brand / illustrate
│       └── 05/                     # System specification Design
└── images/
    └── projects/
        └── 01/
            ├── video-poster.jpg     # 视频封面图 ⭐
            └── gallery/             # 项目图片库
```

## 🎯 当前视频配置 / Current Video Configuration

### HMI Design Center (项目 01)
**当前状态**: ✅ 已配置视频播放功能

**必需文件**:
1. **主视频**: `/videos/projects/01/Hozon Framedesign 2.mp4` ⭐ **已上传**
2. **封面图**: `/images/projects/01/video-poster.jpg` ⭐ **推荐**
3. **备用视频**: `/videos/hmi-demo.webm` (可选)

**功能特点**:
- 点击 "View Video" 按钮弹出视频播放器
- 支持全屏播放
- 自动播放和播放控制
- 如果没有视频文件会显示占位内容

### 其他项目 (02-05)
**当前状态**: 🔄 使用图片画廊模式

**按钮显示**: "View Details" (查看详情)
**功能**: 显示项目图片画廊

## 🚀 快速开始 / Quick Start

### 为 HMI Design Center 添加视频

1. **准备视频文件**
   ```bash
   # 文件要求
   文件名: hmi-demo.mp4
   格式: MP4 (H.264编码)
   分辨率: 1920x1080 或 1280x720
   文件大小: < 50MB
   时长: 2-5分钟
   ```

2. **上传到正确位置**
   ```bash
   # 将视频文件放到这里（已完成）
   portfolio/public/videos/projects/01/Hozon Framedesign 2.mp4
   ```

3. **添加封面图（推荐）**
   ```bash
   # 将封面图放到这里
   portfolio/public/images/projects/01/video-poster.jpg
   ```

4. **测试效果**
   ```bash
   # 启动开发服务器
   cd portfolio
   npm run dev
   
   # 访问 HMI Design Center 详情页
   # 点击 "View Video" 按钮测试
   ```

## 🔧 为其他项目添加视频功能

如果您想为其他项目（02-05）也添加视频功能，需要修改代码：

### 1. 修改 ProjectDetail.tsx
```typescript
// 在第396行附近，将条件改为支持更多项目
{['01', '02', '03'].includes(project.id) ? (
  <button onClick={() => setIsVideoModalOpen(true)}>
    View Video
  </button>
) : (
  <button onClick={() => setIsGalleryModalOpen(true)}>
    View Details  
  </button>
)}
```

### 2. 添加视频文件
```bash
# 为项目02添加视频
portfolio/public/videos/design-analysis-demo.mp4

# 为项目03添加视频  
portfolio/public/videos/ai-explore-demo.mp4
```

### 3. 更新视频源路径
```typescript
// 在视频播放器中添加动态路径
<source src={`/videos/${getVideoFileName(project.id)}`} type="video/mp4" />
```

## 📋 视频文件命名规范 / Naming Convention

### 主视频文件
- `hmi-demo.mp4` - HMI Design Center
- `design-analysis-demo.mp4` - Design Analysis
- `ai-explore-demo.mp4` - AI Explore and Research
- `brand-illustrate-demo.mp4` - Brand / illustrate
- `system-design-demo.mp4` - System specification Design

### 封面图文件
- `/images/projects/01/video-poster.jpg` - HMI
- `/images/projects/02/video-poster.jpg` - Design Analysis
- `/images/projects/03/video-poster.jpg` - AI Explore
- `/images/projects/04/video-poster.jpg` - Brand
- `/images/projects/05/video-poster.jpg` - System Design

## 🎨 视频内容建议 / Content Suggestions

### HMI Design Center
- 汽车界面交互演示
- 自动/手动驾驶模式切换
- 语音和手势控制
- 日夜模式适应

### Design Analysis
- 数据分析过程展示
- 设计决策流程
- 用户研究方法
- 设计改进对比

### AI Explore and Research
- AI工具使用演示
- 智能设计流程
- 机器学习应用
- 未来设计趋势

## 🔍 故障排除 / Troubleshooting

### 视频不播放？
1. 检查文件路径: `/portfolio/public/videos/hmi-demo.mp4`
2. 检查文件格式: 必须是 MP4
3. 检查文件大小: 建议 < 50MB
4. 清除浏览器缓存

### 封面图不显示？
1. 检查文件路径: `/portfolio/public/images/projects/01/video-poster.jpg`
2. 检查文件格式: JPG 或 PNG
3. 检查文件大小: 建议 < 500KB

### 播放器问题？
1. 检查浏览器控制台错误
2. 测试不同浏览器
3. 检查网络连接
4. 重启开发服务器

## 📞 技术支持 / Technical Support

如果遇到问题，请检查：
1. 文件路径是否正确
2. 文件名是否完全匹配
3. 文件格式是否支持
4. 开发服务器是否运行

### 调试步骤
1. 打开浏览器开发者工具
2. 查看 Console 标签页的错误信息
3. 查看 Network 标签页的文件加载状态
4. 确认文件确实存在于指定路径 