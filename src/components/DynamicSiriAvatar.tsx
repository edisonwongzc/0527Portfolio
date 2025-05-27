import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveBarProps {
  position: [number, number, number];
  index: number;
  isActive: boolean;
}

/**
 * 单个波形条组件
 */
const WaveBar = ({ position, index, isActive }: WaveBarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const baseHeight = isActive ? 0.8 + index * 0.2 : 0.4 + index * 0.1;
    const amplitude = isActive ? 0.4 : 0.2;
    const frequency = isActive ? 2 + index * 0.5 : 1 + index * 0.3;
    
    // 动态高度变化
    const height = baseHeight + Math.sin(time * frequency + index) * amplitude;
    meshRef.current.scale.y = height;
    
    // 轻微的旋转
    meshRef.current.rotation.z = Math.sin(time * 0.5 + index) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.08 - index * 0.01, 0.08 - index * 0.01, 1, 8]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.9}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

/**
 * 粒子系统组件
 */
const ParticleSystem = ({ isActive }: { isActive: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.5 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.1;
    
    // 根据激活状态调整粒子大小
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.size = isActive ? 0.05 : 0.03;
    material.opacity = isActive ? 0.8 : 0.5;
  });

  return (
    <points ref={pointsRef} geometry={particlesGeometry}>
      <pointsMaterial 
        color="#60a5fa" 
        transparent 
        opacity={0.5}
        size={0.03}
        sizeAttenuation
      />
    </points>
  );
};

/**
 * 3D场景组件
 */
const SiriScene = ({ isActive }: { isActive: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    // 整体轻微旋转
    groupRef.current.rotation.y = time * 0.2;
    
    // 激活时的脉冲效果
    const scale = isActive ? 1 + Math.sin(time * 3) * 0.1 : 1;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />
      
      {/* 点光源 */}
      <pointLight position={[2, 2, 2]} intensity={1} color="#ffffff" />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color="#3b82f6" />
      
      {/* 波形条 */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, index) => (
        <WaveBar 
          key={index}
          position={[x, 0, 0]} 
          index={index} 
          isActive={isActive}
        />
      ))}
      
      {/* 粒子系统 */}
      <ParticleSystem isActive={isActive} />
      
      {/* 背景球体 */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          transparent 
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
};

interface DynamicSiriAvatarProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

/**
 * 动态Siri头像组件
 * @param size - 头像大小，默认32
 * @param isActive - 是否激活状态（影响动画强度）
 * @param className - 额外的CSS类名
 */
const DynamicSiriAvatar = ({ size = 32, isActive = false, className = '' }: DynamicSiriAvatarProps) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 50%, #db2777 100%)'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <SiriScene isActive={isActive} />
      </Canvas>
      
      {/* 外层光晕效果 */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 animate-pulse pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default DynamicSiriAvatar; 