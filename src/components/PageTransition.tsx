import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  triggerElement?: HTMLElement | null;
}

/**
 * 页面切换动画组件
 * 实现图片展开过渡效果
 */
const PageTransition = ({ isActive, onComplete, triggerElement }: PageTransitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !overlayRef.current || !circleRef.current) return;

    const overlay = overlayRef.current;
    const circle = circleRef.current;

    // 获取触发元素的位置（点击的图片）
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }

    // 计算需要覆盖整个屏幕的圆形半径
    const maxDistance = Math.sqrt(
      Math.pow(Math.max(startX, window.innerWidth - startX), 2) +
      Math.pow(Math.max(startY, window.innerHeight - startY), 2)
    );

    // 设置圆形初始位置
    gsap.set(circle, {
      x: startX,
      y: startY,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    // 显示遮罩
    gsap.set(overlay, { display: 'block' });

    // 动画序列
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // 1. 圆形从点击位置展开
    tl.to(circle, {
      scale: maxDistance / 50, // 50是圆形的基础大小
      duration: 0.8,
      ease: "power2.out"
    })
    // 2. 短暂停留
    .to({}, { duration: 0.2 })
    // 3. 淡出遮罩
    .to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
      }
    });

  }, [isActive, triggerElement, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ display: 'none' }}
    >
      <div
        ref={circleRef}
        className="absolute w-[100px] h-[100px] bg-black rounded-full"
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
};

export default PageTransition; 