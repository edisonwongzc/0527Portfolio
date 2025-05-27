import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text, Environment } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Project } from '../data/projects';

interface Project3DCardProps {
  project: Project;
  index: number;
}

const FloatingCard3D = ({ project }: { project: Project }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* 主卡片 */}
        <RoundedBox args={[3, 2, 0.1]} radius={0.1}>
          <meshStandardMaterial 
            color={hovered ? "#0ea5e9" : "#f8fafc"} 
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* 项目标题 */}
        <Text
          position={[0, 0.5, 0.06]}
          fontSize={0.2}
          color="#1e293b"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {project.title}
        </Text>

        {/* 项目类别 */}
        <Text
          position={[0, 0.1, 0.06]}
          fontSize={0.12}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {project.category}
        </Text>

        {/* 年份标识 */}
        <RoundedBox args={[0.8, 0.3, 0.05]} position={[0, -0.6, 0.06]} radius={0.05}>
          <meshStandardMaterial color="#0284c7" />
        </RoundedBox>
        
        <Text
          position={[0, -0.6, 0.11]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.year}
        </Text>
      </group>
    </Float>
  );
};

const Project3DCard = ({ project, index }: Project3DCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        <FloatingCard3D project={project} />
      </Canvas>
      
      {/* 传统卡片信息作为覆盖层 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-sm mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project3DCard; 