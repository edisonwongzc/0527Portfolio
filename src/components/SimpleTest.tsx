import { Canvas } from '@react-three/fiber';

/**
 * 简单的测试组件，用于排查3D渲染问题
 */
const SimpleTest = () => {
  return (
    <div className="w-full h-screen bg-red-500 flex items-center justify-center">
      <div className="text-white text-4xl">
        Simple Test - 这个应该显示红色背景
      </div>
      <div className="w-1/2 h-1/2 bg-blue-500">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
};

export default SimpleTest; 