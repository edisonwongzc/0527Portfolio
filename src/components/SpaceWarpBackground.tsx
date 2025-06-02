import React, { useEffect, useRef } from 'react';

/**
 * 静态闪烁星星类
 */
class TwinkleStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDirection: number;
  baseOpacity: number;
  
  constructor(canvasWidth: number, canvasHeight: number, layer: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    
    // 根据层级设置不同的星星属性
    switch(layer) {
      case 0: // 背景层 - 小星星
        this.size = Math.random() * 0.4 + 0.1;
        this.baseOpacity = Math.random() * 0.3 + 0.2;
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
        break;
      case 1: // 中景层 - 中等星星
        this.size = Math.random() * 0.6 + 0.3;
        this.baseOpacity = Math.random() * 0.4 + 0.3;
        this.twinkleSpeed = Math.random() * 0.015 + 0.008;
        break;
      case 2: // 前景层 - 大星星
        this.size = Math.random() * 0.8 + 0.5;
        this.baseOpacity = Math.random() * 0.5 + 0.4;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        break;
      default:
        this.size = 0.5;
        this.baseOpacity = 0.5;
        this.twinkleSpeed = 0.01;
    }
    
    this.opacity = this.baseOpacity;
    this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
  }
  
  /**
   * 更新闪烁效果
   */
  update() {
    this.opacity += this.twinkleSpeed * this.twinkleDirection;
    
    // 控制闪烁范围
    const maxOpacity = Math.min(this.baseOpacity + 0.4, 1.0);
    const minOpacity = Math.max(this.baseOpacity - 0.2, 0.1);
    
    if (this.opacity >= maxOpacity || this.opacity <= minOpacity) {
      this.twinkleDirection *= -1;
    }
  }
  
  /**
   * 绘制闪烁星星
   */
  draw(ctx: CanvasRenderingContext2D) {
    // 绘制星星光晕 - 减小发光范围
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
    gradient.addColorStop(0.4, `rgba(200, 220, 255, ${this.opacity * 0.6})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制星星核心 - 减小核心大小
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 1.2})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * 星星粒子类（原有的时空穿越效果）
 */
class Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = (Math.random() - 0.5) * 2000;
    this.y = (Math.random() - 0.5) * 2000;
    this.z = Math.random() * 1000;
    this.prevX = this.x / (this.z * 0.0001);
    this.prevY = this.y / (this.z * 0.0001);
  }
  
  /**
   * 更新星星位置
   */
  update(speed: number, canvasWidth: number, canvasHeight: number) {
    this.prevX = this.x / (this.z * 0.0001);
    this.prevY = this.y / (this.z * 0.0001);
    
    this.z -= speed;
    
    if (this.z <= 0) {
      this.x = (Math.random() - 0.5) * 2000;
      this.y = (Math.random() - 0.5) * 2000;
      this.z = 1000;
      this.prevX = this.x / (this.z * 0.0001);
      this.prevY = this.y / (this.z * 0.0001);
    }
  }
  
  /**
   * 绘制星星和拖尾
   */
  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    const x = this.x / (this.z * 0.0001);
    const y = this.y / (this.z * 0.0001);
    
    const centerX = canvasWidth / 2 + (canvasWidth * 0.2); // 向右偏移20%
    const centerY = canvasHeight / 2;
    
    const screenX = x + centerX;
    const screenY = y + centerY;
    const prevScreenX = this.prevX + centerX;
    const prevScreenY = this.prevY + centerY;
    
    // 计算星星大小和亮度
    const size = (1 - this.z / 1000) * 2;
    const opacity = (1 - this.z / 1000) * 0.8;
    
    if (screenX >= 0 && screenX <= canvasWidth && 
        screenY >= 0 && screenY <= canvasHeight && 
        size > 0) {
      
      // 绘制拖尾线条
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(prevScreenX, prevScreenY);
      ctx.lineTo(screenX, screenY);
      ctx.stroke();
      
      // 绘制星星光点
      const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 2);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(100, 200, 255, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * 时空穿越粒子背景组件
 */
const SpaceWarpBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<Star[]>([]);
  const twinkleStarsRef = useRef<TwinkleStar[]>([]);
  const speedRef = useRef(5);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // 初始化时空穿越星星
    const initStars = () => {
      starsRef.current = [];
      const starCount = 1600; // 增加星星数量到1600个
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push(new Star(canvas.width, canvas.height));
      }
    };
    
    // 初始化闪烁星空背景
    const initTwinkleStars = () => {
      twinkleStarsRef.current = [];
      
      // 三层星空
      const layers = [
        { count: 80, layer: 0 },  // 背景层 - 小星星
        { count: 50, layer: 1 },  // 中景层 - 中等星星
        { count: 30, layer: 2 }   // 前景层 - 大星星
      ];
      
      layers.forEach(({ count, layer }) => {
        for (let i = 0; i < count; i++) {
          twinkleStarsRef.current.push(new TwinkleStar(canvas.width, canvas.height, layer));
        }
      });
    };
    
    initStars();
    initTwinkleStars();
    
    // 鼠标移动控制速度
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      speedRef.current = 5 + (mouseX * mouseY) * 10; // 速度范围 5-15
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    /**
     * 动画循环
     */
    const animate = () => {
      // 清除画布，创建拖尾效果
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制闪烁星空背景（最底层）
      twinkleStarsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });
      
      // 更新和绘制时空穿越星星（上层）
      starsRef.current.forEach(star => {
        star.update(speedRef.current, canvas.width, canvas.height);
        star.draw(ctx, canvas.width, canvas.height);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // 开始动画
    animate();
    
    // 窗口大小变化处理
    const handleResize = () => {
      resizeCanvas();
      initStars();
      initTwinkleStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        background: 'radial-gradient(ellipse at center, #001122 0%, #000000 70%)'
      }}
    />
  );
};

export default SpaceWarpBackground; 