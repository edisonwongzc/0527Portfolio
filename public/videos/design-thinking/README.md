# 设计思维页面视频资源

## 📁 视频文件说明

### 未来设计趋势视频
- **文件名**: `future-trends.mp4`
- **完整路径**: `/portfolio/public/videos/design-thinking/future-trends.mp4`
- **用途**: 设计思维页面"未来展望"模块的背景视频
- **尺寸比例**: 1:1 (正方形)
- **建议分辨率**: 800x800 或更高
- **时长**: 建议10-30秒循环
- **文件大小**: 建议 < 10MB

## 🎬 视频要求

### 技术规格
- **格式**: MP4 (H.264编码)
- **帧率**: 30fps
- **比特率**: 2-5 Mbps
- **音频**: 可选（页面会静音播放）

### 内容建议
- 展示未来设计趋势相关的视觉内容
- AI设计工具演示
- VR/AR设计场景
- 未来科技界面动画
- 抽象的科技感动效

### 视觉风格
- 现代科技感
- 偏暗色调（与网站整体风格一致）
- 流畅的动画效果
- 避免过于闪烁的内容

## 🚀 使用方式

1. **准备视频文件**
   - 按照上述要求制作或选择视频
   - 重命名为 `future-trends.mp4`

2. **放置文件**
   ```
   portfolio/public/videos/design-thinking/future-trends.mp4
   ```

3. **测试效果**
   - 访问设计思维页面 `/design-thinking`
   - 滚动到"设计思维的未来"部分
   - 视频会自动播放、循环、静音

## 📝 注意事项

- 视频会自动播放，请确保内容适合自动播放
- 视频会循环播放，确保首尾衔接自然
- 移动设备上会静音播放
- 如果视频文件不存在，会显示渐变背景作为占位符

## 🔧 技术细节

视频标签配置：
```html
<video 
  src="/videos/design-thinking/future-trends.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
/>
```

- `autoPlay`: 自动播放
- `loop`: 循环播放
- `muted`: 静音播放
- `playsInline`: 移动设备内联播放
- `object-cover`: 保持比例填充容器 