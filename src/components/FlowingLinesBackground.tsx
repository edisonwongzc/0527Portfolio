import React, { useEffect, useRef } from 'react';

/**
 * 粒子类 - 完全按照参考代码实现
 */
class Particle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  damp: number;
  accel: number;
  canvasWidth: number;
  canvasHeight: number;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    // changing these parameters can give very different results
    this.damp = 0.00002; // remember a very small amount of the last direction
    this.accel = 100; // move very quickly
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.init();
  }
  
  init() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.vx = this.accel * (Math.random() - Math.random());
    this.vy = this.accel * (Math.random() - Math.random());
  }
  
  step(attractors: Particle[], ctx: CanvasRenderingContext2D) {
    // move towards every attractor
    // at a speed inversely proportional to distance squared
    // (much slower when further away, very fast when close)
    for (const a of attractors) {
      // calculate the square of the distance
      // from this particle to the current attractor
      const dx = a.x - this.x;
      const dy = a.y - this.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > 0.1) {
        // make sure we don't divide by zero
        // accelerate towards each attractor
        this.vx += this.accel * dx / d2;
        this.vy += this.accel * dy / d2;
      }
    }
    // move by the velocity
    this.x += this.vx;
    this.y += this.vy;
    // scale the velocity back for the next frame
    this.vx *= this.damp;
    this.vy *= this.damp;
    // draw particle
    ctx.fillRect(this.x, this.y, 0.5, 0.5);
  }
}

/**
 * Canvas管理类
 */
class CanvasManager {
  elem: HTMLCanvasElement;
  width: number = 0;
  height: number = 0;
  frame: number = 0;
  
  constructor(container: HTMLElement) {
    this.elem = document.createElement("canvas");
    // 添加canvas样式，完全匹配参考代码
    this.elem.style.position = "absolute";
    this.elem.style.width = "100%";
    this.elem.style.height = "100%";
    this.elem.style.background = "#000";
    this.elem.style.cursor = "pointer";
    
    container.appendChild(this.elem);
    this.resize();
  }
  
  resize() {
    this.width = this.elem.width = this.elem.offsetWidth;
    this.height = this.elem.height = this.elem.offsetHeight;
  }
  
  reset(ctx: CanvasRenderingContext2D, particles: Particle[], attractors: Particle[]) {
    ctx.globalCompositeOperation = "source-over";
    this.resize();
    ctx.fillStyle = "#321";
    ctx.globalCompositeOperation = "lighter";
    
    // 更新所有粒子的画布尺寸
    for (const p of particles) {
      p.canvasWidth = this.width;
      p.canvasHeight = this.height;
      p.init();
    }
    for (const a of attractors) {
      a.canvasWidth = this.width;
      a.canvasHeight = this.height;
      a.init();
    }
    this.frame = 0;
  }
}

/**
 * 流光线条背景组件 - 完全按照参考代码实现
 */
const FlowingLinesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasManagerRef = useRef<CanvasManager | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const attractorsRef = useRef<Particle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // init canvas
    const canvasManager = new CanvasManager(container);
    canvasManagerRef.current = canvasManager;
    
    // init pen
    const ctx = canvasManager.elem.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
    
    // 初始化粒子系统
    const initParticles = () => {
      attractorsRef.current = Array.from({ length: 8 }, () => new Particle(canvasManager.width, canvasManager.height));
      particlesRef.current = Array.from({ length: 1000 }, () => new Particle(canvasManager.width, canvasManager.height));
    };
    
    initParticles();
    canvasManager.reset(ctx, particlesRef.current, attractorsRef.current);
    
    // reset on mouse click
    const handleClick = () => {
      if (canvasManager && ctx) {
        canvasManager.reset(ctx, particlesRef.current, attractorsRef.current);
      }
    };
    
    const handleTouchStart = () => {
      if (canvasManager && ctx) {
        canvasManager.reset(ctx, particlesRef.current, attractorsRef.current);
      }
    };
    
    window.addEventListener("click", handleClick, false);
    canvasManager.elem.addEventListener("touchstart", handleTouchStart, false);
    
    // move and draw particles
    const run = () => {
      animationRef.current = requestAnimationFrame(run);
      if (canvasManager.frame++ < 1000) {
        for (const p of particlesRef.current) {
          p.step(attractorsRef.current, ctx);
        }
      }
    };
    
    run();
    
    // 窗口大小变化处理
    const handleResize = () => {
      if (canvasManager && ctx) {
        canvasManager.reset(ctx, particlesRef.current, attractorsRef.current);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener('resize', handleResize);
      if (canvasManager.elem) {
        canvasManager.elem.removeEventListener("touchstart", handleTouchStart);
        if (container.contains(canvasManager.elem)) {
          container.removeChild(canvasManager.elem);
        }
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 1,
        backgroundColor: 'transparent',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden'
      }}
    />
  );
};

export default FlowingLinesBackground; 