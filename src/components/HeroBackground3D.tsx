import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, speed = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  speed?: number; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const particlesPosition = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 10;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[particlesPosition, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#0ea5e9" transparent opacity={0.6} />
    </points>
  );
};

const HeroBackground3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* 环境光 */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* 粒子场 */}
        <ParticleField />

        {/* 动画球体 */}
        <AnimatedSphere position={[-3, 2, -2]} color="#0ea5e9" speed={0.8} />
        <AnimatedSphere position={[3, -1, -3]} color="#7dd3fc" speed={1.2} />
        <AnimatedSphere position={[0, 3, -4]} color="#38bdf8" speed={0.6} />

        {/* 浮动几何体 */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={[4, 0, -2]}>
            <octahedronGeometry args={[0.8]} />
            <meshStandardMaterial 
              color="#0284c7" 
              transparent 
              opacity={0.7} 
              wireframe 
            />
          </mesh>
        </Float>

        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={[-4, -2, -1]}>
            <icosahedronGeometry args={[0.6]} />
            <meshStandardMaterial 
              color="#0369a1" 
              transparent 
              opacity={0.8} 
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroBackground3D; 