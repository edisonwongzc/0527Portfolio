import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 检测设备性能
 */
const useDevicePerformance = () => {
  const [performance, setPerformance] = useState<'high' | 'medium' | 'low'>('medium');
  
  useEffect(() => {
    // 简单的性能检测
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    
    if (!gl) {
      setPerformance('low');
      return;
    }
    
    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 检测内存
    const memory = (navigator as any).deviceMemory || 4;
    
    if (isMobile || memory < 4) {
      setPerformance('low');
    } else if (memory >= 8 && !isMobile) {
      setPerformance('high');
    } else {
      setPerformance('medium');
    }
  }, []);
  
  return performance;
};

/**
 * 星空粒子组件
 */
const Stars = () => {
  const meshRef = useRef<THREE.Points>(null);
  const performance = useDevicePerformance();
  
  // 根据性能调整星星数量
  const starCount = useMemo(() => {
    switch (performance) {
      case 'high': return 5000;
      case 'medium': return 3000;
      case 'low': return 2000;
      default: return 3000;
    }
  }, [performance]);
  
  // 创建星星纹理
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    
    // 创建径向渐变
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);
  
  // 生成随机星星位置
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      // 随机分布在球形空间内
      const radius = Math.random() * 100 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // 星星颜色变化（白色到淡蓝色）
      const intensity = Math.random() * 0.5 + 0.5;
      colors[i * 3] = intensity; // R
      colors[i * 3 + 1] = intensity; // G
      colors[i * 3 + 2] = intensity + Math.random() * 0.3; // B (稍微偏蓝)
    }
    
    return [positions, colors];
  }, [starCount]);
  
  // 动画：缓慢旋转
  useFrame((state) => {
    if (meshRef.current) {
      const speed = performance === 'low' ? 0.0001 : 0.0002;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 2;
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={performance === 'low' ? 0.3 : 0.4}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={performance === 'low' ? 0.6 : 0.8}
        blending={THREE.AdditiveBlending}
        map={starTexture}
        alphaTest={0.01}
      />
    </points>
  );
};

/**
 * 流星效果组件
 */
const ShootingStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  const performance = useDevicePerformance();
  
  // 根据性能调整流星数量 - 增加10倍
  const meteorCount = performance === 'low' ? 10 : performance === 'medium' ? 20 : 30;
  
  // 生成流星轨迹
  const meteors = useMemo(() => {
    const meteorData = [];
    for (let i = 0; i < meteorCount; i++) {
      meteorData.push({
        startPos: [
          Math.random() * 400 - 200, // 扩大范围
          Math.random() * 200 + 100,
          Math.random() * 400 - 200
        ],
        endPos: [
          Math.random() * 400 - 200,
          Math.random() * 200 - 100,
          Math.random() * 400 - 200
        ],
        speed: Math.random() * 0.03 + 0.005, // 调整速度范围
        delay: Math.random() * 20 // 增加延迟范围，避免同时出现
      });
    }
    return meteorData;
  }, [meteorCount]);
  
  useFrame((state) => {
    if (groupRef.current) {
      meteors.forEach((meteor, index) => {
        const child = groupRef.current!.children[index];
        if (child) {
          const time = (state.clock.elapsedTime + meteor.delay) * meteor.speed;
          const progress = (time % 1);
          
          child.position.x = THREE.MathUtils.lerp(meteor.startPos[0], meteor.endPos[0], progress);
          child.position.y = THREE.MathUtils.lerp(meteor.startPos[1], meteor.endPos[1], progress);
          child.position.z = THREE.MathUtils.lerp(meteor.startPos[2], meteor.endPos[2], progress);
          
          // 淡入淡出效果
          const opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;
          (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: opacity * 0.4 // 降低透明度，避免过于明亮
          });
        }
      });
    }
  });
  
  // 低性能设备也显示流星，但数量较少
  return (
    <group ref={groupRef}>
      {meteors.map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.08, 6, 6]} /> {/* 稍微减小尺寸 */}
          <meshBasicMaterial color={0xffffff} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 星空背景主组件
 */
const StarfieldBackground: React.FC = () => {
  const performance = useDevicePerformance();
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 0], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        dpr={performance === 'low' ? 1 : window.devicePixelRatio}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.1} />
        
        {/* 星空粒子 */}
        <Stars />
        
        {/* 流星效果 */}
        <ShootingStars />
        
        {/* 雾效果增加深度感 - 高性能设备才启用 */}
        {performance !== 'low' && (
          <fog attach="fog" args={['#000000', 50, 200]} />
        )}
      </Canvas>
    </div>
  );
};

export default StarfieldBackground;