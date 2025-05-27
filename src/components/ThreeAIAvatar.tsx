import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ThreeAIAvatarProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

/**
 * 基于Three.js的立体AI头像组件
 * @param size - 头像大小，默认32
 * @param isActive - 是否激活状态（影响动画强度）
 * @param className - 额外的CSS类名
 */
const ThreeAIAvatar = ({ size = 32, isActive = false, className = '' }: ThreeAIAvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // 创建主球体
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    
    // 创建渐变材质
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isActive: { value: isActive ? 1.0 : 0.0 },
        color1: { value: new THREE.Color(0x3b82f6) }, // 蓝色
        color2: { value: new THREE.Color(0x9333ea) }, // 紫色
        color3: { value: new THREE.Color(0xdb2777) }, // 粉色
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform float isActive;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          // 添加波形变形
          vec3 newPosition = position;
          float wave = sin(position.y * 10.0 + time * 2.0) * 0.02 * (1.0 + isActive * 2.0);
          newPosition += normal * wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float isActive;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // 基于位置的渐变
          float gradient = (vPosition.y + 1.0) * 0.5;
          vec3 color = mix(color1, color2, gradient);
          color = mix(color, color3, sin(time + vPosition.x * 5.0) * 0.5 + 0.5);
          
          // 添加边缘光效
          float fresnel = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          color += fresnel * 0.3 * (1.0 + isActive);
          
          // 添加脉冲效果
          float pulse = sin(time * 3.0) * 0.1 + 0.9;
          color *= pulse * (1.0 + isActive * 0.5);
          
          gl_FragColor = vec4(color, 0.8 + fresnel * 0.2);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;

    // 创建粒子系统
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // 在球体周围随机分布粒子
      const radius = 0.8 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // 随机颜色
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.23; // 蓝色
        colors[i * 3 + 1] = 0.51;
        colors[i * 3 + 2] = 0.96;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.58; // 紫色
        colors[i * 3 + 1] = 0.20;
        colors[i * 3 + 2] = 0.92;
      } else {
        colors[i * 3] = 0.86; // 粉色
        colors[i * 3 + 1] = 0.15;
        colors[i * 3 + 2] = 0.47;
      }

      sizes[i] = Math.random() * 2 + 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isActive: { value: isActive ? 1.0 : 0.0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform float isActive;
        
        void main() {
          vColor = color;
          
          // 粒子轨道运动
          vec3 newPosition = position;
          float angle = time * 0.5 + position.x * 10.0;
          newPosition.x += sin(angle) * 0.1 * (1.0 + isActive);
          newPosition.y += cos(angle) * 0.1 * (1.0 + isActive);
          
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + isActive * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - distance * 2.0;
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // 动画循环
    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const time = (currentTime - startTime) * 0.001;

      // 更新shader uniforms
      if (sphereMaterial.uniforms) {
        sphereMaterial.uniforms.time.value = time;
        sphereMaterial.uniforms.isActive.value = isActive ? 1.0 : 0.0;
      }

      if (particleMaterial.uniforms) {
        particleMaterial.uniforms.time.value = time;
        particleMaterial.uniforms.isActive.value = isActive ? 1.0 : 0.0;
      }

      // 旋转球体
      if (sphere) {
        sphere.rotation.x = time * 0.2;
        sphere.rotation.y = time * 0.3;
      }

      // 旋转粒子系统
      if (particles) {
        particles.rotation.y = time * 0.1;
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 清理函数
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // 清理Three.js资源
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [size, isActive]);

  // 响应isActive状态变化
  useEffect(() => {
    if (sphereRef.current && particlesRef.current) {
      const sphereMaterial = sphereRef.current.material as THREE.ShaderMaterial;
      const particleMaterial = particlesRef.current.material as THREE.ShaderMaterial;
      
      if (sphereMaterial.uniforms) {
        gsap.to(sphereMaterial.uniforms.isActive, {
          value: isActive ? 1.0 : 0.0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
      
      if (particleMaterial.uniforms) {
        gsap.to(particleMaterial.uniforms.isActive, {
          value: isActive ? 1.0 : 0.0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    }
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        borderRadius: '50%',
        overflow: 'hidden'
      }}
    />
  );
};

export default ThreeAIAvatar; 