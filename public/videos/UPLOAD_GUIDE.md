# 🎬 视频上传指南 / Video Upload Guide

## 📁 文件夹结构 / Folder Structure

```
portfolio/public/videos/
├── README.md                    # 基本说明
├── UPLOAD_GUIDE.md             # 详细上传指南（本文件）
├── hmi-demo.mp4                # HMI项目主视频
├── hmi-demo.webm               # HMI项目备用视频（可选）
└── projects/                   # 其他项目视频文件夹
    ├── 01/                     # HMI Design Center
    │   ├── main-demo.mp4       # 主演示视频
    │   ├── interaction-demo.mp4 # 交互演示视频
    │   └── overview.mp4        # 项目概览视频
    ├── 02/                     # Design Analysis
    ├── 03/                     # AI Explore and Research
    ├── 04/                     # Brand / illustrate
    └── 05/                     # System specification Design
```

## 🎯 HMI Design Center 视频要求

### 主要视频文件
- **文件名**: `hmi-demo.mp4`
- **位置**: `/portfolio/public/videos/hmi-demo.mp4`
- **格式**: MP4 (H.264编码)
- **分辨率**: 1920x1080 或更高
- **时长**: 建议2-5分钟
- **文件大小**: 建议小于50MB
- **帧率**: 30fps
- **比特率**: 5-10 Mbps

### 备用视频文件（可选）
- **文件名**: `hmi-demo.webm`
- **位置**: `/portfolio/public/videos/hmi-demo.webm`
- **格式**: WebM (VP9编码)
- **用途**: 提高浏览器兼容性

### 视频封面图
- **文件名**: `video-poster.jpg`
- **位置**: `/portfolio/public/images/projects/01/video-poster.jpg`
- **分辨率**: 1920x1080
- **格式**: JPG
- **用途**: 视频加载前的预览图

## 📋 上传步骤 / Upload Steps

### 1. 准备视频文件
1. **压缩视频**: 确保文件大小合适（建议<50MB）
2. **检查格式**: MP4格式，H.264编码
3. **重命名文件**: 按照规范命名（如：`hmi-demo.mp4`）

### 2. 上传到正确位置
```bash
# 主要视频文件
portfolio/public/videos/hmi-demo.mp4

# 备用视频文件（可选）
portfolio/public/videos/hmi-demo.webm

# 视频封面图
portfolio/public/images/projects/01/video-poster.jpg
```

### 3. 验证文件路径
确保文件路径与代码中的配置一致：
```typescript
// 在 ProjectDetail.tsx 中的配置
<source src="/videos/hmi-demo.mp4" type="video/mp4" />
<source src="/videos/hmi-demo.webm" type="video/webm" />
```

## 🎨 视频内容建议

### HMI Design Center 演示内容
1. **界面概览** (0-30秒)
   - 主界面展示
   - 整体设计风格介绍

2. **交互演示** (30秒-2分钟)
   - 触摸交互
   - 语音控制
   - 手势操作

3. **模式切换** (2-3分钟)
   - 自动驾驶模式
   - 手动驾驶模式
   - 模式间的平滑切换

4. **环境适应** (3-4分钟)
   - 日间模式
   - 夜间模式
   - 不同天气条件下的界面调整

5. **用户体验流程** (4-5分钟)
   - 完整的用户操作流程
   - 关键功能演示

## 🔧 技术规格 / Technical Specifications

### 视频编码设置
```
视频编码: H.264 (MP4) / VP9 (WebM)
音频编码: AAC (MP4) / Opus (WebM)
分辨率: 1920x1080 (推荐) 或 1280x720 (最低)
帧率: 30fps
比特率: 5-10 Mbps (视频) + 128-256 kbps (音频)
```

### 压缩建议
- 使用 **HandBrake** 或 **FFmpeg** 进行压缩
- 保持画质与文件大小的平衡
- 测试在不同设备上的播放效果

## 🚀 快速测试 / Quick Test

### 1. 上传后测试
1. 启动开发服务器：`npm run dev`
2. 访问 HMI Design Center 项目详情页
3. 点击 "View Video" 按钮
4. 检查视频是否正常播放

### 2. 检查清单
- [ ] 视频文件已上传到正确位置
- [ ] 文件名与代码配置一致
- [ ] 视频可以正常播放
- [ ] 封面图显示正确
- [ ] 视频控制按钮工作正常
- [ ] 全屏功能正常

## 🔍 故障排除 / Troubleshooting

### 视频不显示？
1. **检查文件路径**: 确保文件在 `/portfolio/public/videos/` 目录下
2. **检查文件名**: 必须是 `hmi-demo.mp4`
3. **检查文件格式**: 确保是 MP4 格式
4. **清除缓存**: 刷新浏览器或清除缓存

### 视频加载慢？
1. **压缩文件**: 减小视频文件大小
2. **降低分辨率**: 如果必要，可以降到 1280x720
3. **优化编码**: 使用更高效的编码设置

### 浏览器兼容性问题？
1. **添加 WebM 格式**: 创建 `hmi-demo.webm` 备用文件
2. **检查编码**: 确保使用标准的 H.264 编码
3. **测试多个浏览器**: Chrome, Firefox, Safari, Edge

## 📞 需要帮助？ / Need Help?

如果遇到问题，请检查：
1. 文件路径是否正确
2. 文件名是否符合规范
3. 视频格式是否支持
4. 开发服务器是否已重启

### 联系方式
- 检查控制台错误信息
- 查看网络请求是否成功
- 确认文件权限设置正确 