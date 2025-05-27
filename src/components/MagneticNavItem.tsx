import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

// 磁吸导航项组件
interface MagneticNavItemProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const MagneticNavItem = ({ children, className = "", strength = 0.3 }: MagneticNavItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // 磁吸偏移量
      const offsetX = x * strength;
      const offsetY = y * strength;
      
      // 使用GSAP快速更新transform
      gsap.set(item, {
        x: offsetX,
        y: offsetY
      });
    };

    const handleMouseLeave = () => {
      // 使用GSAP平滑回到原位
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    item.addEventListener('mousemove', handleMouseMove);
    item.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
      item.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div 
      ref={itemRef}
      className={`magnetic-nav-item ${className}`}
      style={{
        willChange: 'transform',
        pointerEvents: 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default MagneticNavItem; 