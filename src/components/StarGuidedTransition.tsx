import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface StarGuidedTransitionProps {
  isActive: boolean;
  direction: 'up' | 'down';
  onComplete?: () => void;
}

/**
 * 引导星星组件
 */
const GuidingStars = ({ isActive, direction, onComplete }: { 
  isActive: boolean; 
  direction: 'up' | 'down'; 
  onComplete?: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [stars, setStars] = useState<Array<{
    position: [number, number, number];
    targetPosition: [number, number, number];
    delay: number;
    speed: number;
  }>>([]);

  // 生成引导星星路径
  useEffect(() => {
    if (!isActive) return;

    const starCount = 30;
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      const progress = i / (starCount - 1);
      
      // 创建箭头形状的路径
      const arrowPath = createArrowPath(progress, direction);
      
      newStars.push({
        position: [
          Math.random() * 200 - 100, // 随机起始位置
          Math.random() * 200 - 100,
          Math.random() * 100 - 50
        ] as [number, number, number],
        targetPosition: arrowPath,
        delay: progress * 0.5, // 错位动画
        speed: 0.02 + Math.random() * 0.01
      });
    }
    
    setStars(newStars);
  }, [isActive, direction]);

  // 创建箭头路径
  const createArrowPath = (progress: number, direction: 'up' | 'down'): [number, number, number] => {
    const centerX = 0;
    const centerY = direction === 'down' ? 50 : -50;
    const centerZ = 0;
    
    // 箭头主体 (70%的星星)
    if (progress < 0.7) {
      const lineProgress = progress / 0.7;
      return [
        centerX,
        centerY + (direction === 'down' ? -lineProgress * 100 : lineProgress * 100),
        centerZ
      ];
    }
    
    // 箭头头部 (30%的星星)
    const headProgress = (progress - 0.7) / 0.3;
    const headY = centerY + (direction === 'down' ? -70 : 70);
    const headSpread = 30;
    
    // 左右箭头翼
    const side = Math.sin(headProgress * Math.PI * 4) > 0 ? 1 : -1;
    return [
      centerX + side * headSpread * (1 - headProgress),
      headY + (direction === 'down' ? headProgress * 20 : -headProgress * 20),
      centerZ
    ];
  };

  // 动画循环
  useFrame((state) => {
    if (!groupRef.current || !isActive) return;

    stars.forEach((star, index) => {
      const child = groupRef.current!.children[index];
      if (child) {
        const time = state.clock.elapsedTime + star.delay;
        const progress = Math.min((time * star.speed) % 2, 1); // 2秒循环
        
        // 从起始位置移动到目标位置
        child.position.x = THREE.MathUtils.lerp(star.position[0], star.targetPosition[0], progress);
        child.position.y = THREE.MathUtils.lerp(star.position[1], star.targetPosition[1], progress);
        child.position.z = THREE.MathUtils.lerp(star.position[2], star.targetPosition[2], progress);
        
        // 增强淡入淡出效果
        const opacity = progress < 0.1 ? progress * 10 : 
                       progress > 0.8 ? (1 - progress) * 5 : 1;
        
        (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0.3 + progress * 0.7, 0.8, 1.0), // 蓝白渐变
          transparent: true,
          opacity: opacity * 1.0 // 增强透明度
        });
        
        // 增大星星尺寸
        child.scale.setScalar(1.0 + progress * 2.0);
      }
    });

    // 动画完成检测
    if (state.clock.elapsedTime > 2.5 && onComplete) {
      onComplete();
    }
  });

  if (!isActive) return null;

  return (
    <group ref={groupRef}>
      {stars.map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.2, 8, 8]} /> {/* 增大基础尺寸 */}
          <meshBasicMaterial 
            color={0x4FC3F7} 
            transparent 
            opacity={1.0} // 增强初始透明度
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 星空引导转场主组件
 */
const StarGuidedTransition: React.FC<StarGuidedTransitionProps> = ({ 
  isActive, 
  direction, 
  onComplete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // 容器淡入动画
    gsap.fromTo(containerRef.current, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.out"
      }
    );

    // 3秒后自动淡出
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            onComplete?.();
          }
        });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50, // 大幅提高z-index，确保在所有内容之上
        pointerEvents: 'none',
        opacity: 0,
        background: 'rgba(0, 0, 0, 0.1)' // 添加轻微背景，增强可见性
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 100], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.3} />
        
        {/* 引导星星 */}
        <GuidingStars 
          isActive={isActive}
          direction={direction}
          onComplete={onComplete}
        />
        
        {/* 点光源增强效果 */}
        <pointLight 
          position={[0, direction === 'down' ? -50 : 50, 50]} 
          intensity={1.0} 
          color={0x4FC3F7}
          distance={200}
        />
      </Canvas>
      
      {/* 方向提示文字 */}
      <div 
        style={{
          position: 'absolute',
          bottom: direction === 'down' ? '20%' : 'auto',
          top: direction === 'up' ? '20%' : 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#4FC3F7',
          fontSize: '16px', // 增大字体
          fontWeight: '400', // 增加字重
          textAlign: 'center',
          textShadow: '0 0 15px rgba(79, 195, 247, 0.8)', // 增强发光效果
          animation: 'pulse 2s ease-in-out infinite',
          background: 'rgba(0, 0, 0, 0.3)', // 添加背景
          padding: '12px 24px',
          borderRadius: '25px',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          {direction === 'down' ? 'Continue exploring' : 'Back to top'}
        </div>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          {direction === 'down' ? '继续探索' : '返回顶部'}
        </div>
      </div>
    </div>
  );
};

export default StarGuidedTransition; 