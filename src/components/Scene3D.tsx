import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import { Suspense } from 'react';

interface Scene3DProps {
  className?: string;
}

const FloatingGeometry = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
    </Float>
  );
};

const RotatingTorus = () => {
  return (
    <mesh position={[-2, 0, 0]} rotation={[0.5, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshStandardMaterial color="#7dd3fc" />
    </mesh>
  );
};

const Scene3D = ({ className = '' }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          {/* 环境光照 */}
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />

          {/* 3D对象 */}
          <FloatingGeometry />
          <RotatingTorus />

          {/* 3D文字 */}
          <Center>
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={0.8}
              height={0.1}
              position={[0, 1.5, 0]}
            >
              Designer
              <meshStandardMaterial color="#0284c7" />
            </Text3D>
          </Center>

          {/* 控制器 */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D; 