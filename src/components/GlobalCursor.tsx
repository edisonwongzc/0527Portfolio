import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * 简化版全局光标组件
 * 移除复杂的监控机制，专注于核心功能
 */
const GlobalCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);

  /**
   * 清理残留的调试样式和元素
   */
  const cleanupDebugElements = useCallback(() => {
    // 移除所有可能的调试光标
    const debugSelectors = [
      '.emergency-cursor',
      '.super-visible-cursor', 
      '.stability-test-cursor',
      '.blink-test-cursor',
      '.nuclear-cursor'
    ];
    
    debugSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // 移除调试样式表
    const debugStyleIds = [
      'super-test-styles',
      'blink-test-styles', 
      'super-cursor-styles'
    ];
    
    debugStyleIds.forEach(id => {
      const style = document.getElementById(id);
      if (style) style.remove();
    });

    console.log('🧹 调试元素和样式已清理');
  }, []);

  /**
   * 更新光标位置
   */
  const updateCursorPosition = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;

    // 使用transform而不是x,y，确保在滚动时正确定位
    gsap.set(cursorRef.current, {
      left: x,
      top: y,
      duration: 0
    });
  }, []);

  /**
   * 检测交互元素
   */
  const isInteractiveElement = useCallback((target: HTMLElement): boolean => {
    const interactiveSelectors = [
      'a', 'button', 'input', 'textarea', 'select',
      '.cursor-scale', '.magnetic-nav-item', '.project-card', 
      '.service-card', '.skill-tag', '[role="button"]'
    ];

    return interactiveSelectors.some(selector => target.closest(selector)) ||
           window.getComputedStyle(target).cursor === 'pointer' ||
           target.onclick !== null;
  }, []);

  /**
   * 处理鼠标移动
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateCursorPosition(e.pageX, e.pageY);;
  }, [updateCursorPosition]);

  /**
   * 处理鼠标悬停
   */
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const target = e.target as HTMLElement;
    
        if (isInteractiveElement(target)) {
      // 悬停状态 - 变大
    gsap.to(cursor, {
        width: 60,
        height: 60,
        background: '#ffffff',
        border: '2px solid #000000',
      duration: 0.3,
      ease: "power2.out"
    });
    } else {
      // 正常状态
    gsap.to(cursor, {
        width: 20,
        height: 20,
        background: '#ffffff',
        border: '2px solid #000000',
        duration: 0.3,
      ease: "power2.out"
    });
    }
  }, [isInteractiveElement]);

  /**
   * 处理鼠标离开
   */
  const handleMouseOut = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 恢复正常状态
    gsap.to(cursor, {
      width: 20,
      height: 20,
      background: '#ffffff',
      border: '2px solid #000000',
      duration: 0.3,
      ease: "power2.out"
    });
  }, []);

  /**
   * 初始化光标
   */
  const initializeCursor = useCallback(() => {
    if (isInitializedRef.current) return;

    // 先清理调试元素
    cleanupDebugElements();

    // 创建光标元素
    const cursor = document.createElement('div');
    cursor.className = 'global-cursor';
    
    // 设置基础样式 - 原始白色光标
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      background: #ffffff;
      border: 2px solid #000000;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
      opacity: 1;
      visibility: visible !important;
      display: block !important;
      will-change: transform, left, top;
      transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
      mix-blend-mode: difference;
      isolation: isolate;
    `;

    // 添加到DOM
    document.body.appendChild(cursor);
    cursorRef.current = cursor;
    isInitializedRef.current = true;

    // 初始定位
    updateCursorPosition(window.innerWidth / 2, window.innerHeight / 2);

    console.log('✅ 简化版光标初始化完成');
  }, [updateCursorPosition, cleanupDebugElements]);

  /**
   * 确保光标始终可见的监控函数
   */
  const ensureCursorVisibility = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 强制设置可见性
    cursor.style.visibility = 'visible';
    cursor.style.display = 'block';
    cursor.style.opacity = '1';
    cursor.style.zIndex = '999999';
    cursor.style.position = 'fixed';
    
    // 确保光标在body中
    if (!document.body.contains(cursor)) {
      document.body.appendChild(cursor);
    }
  }, []);

  useEffect(() => {
    // 检查设备类型
    const isDesktop = window.innerWidth >= 768 && 
                     !('ontouchstart' in window) && 
                     !navigator.maxTouchPoints;

    if (!isDesktop) {
      console.log('📱 移动设备或触摸设备，跳过光标初始化');
        return;
      }
      
    // 初始化光标
      initializeCursor();

    // 添加事件监听器
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    // 添加滚动监听，确保光标在滚动时保持可见
    const handleScroll = () => {
      ensureCursorVisibility();
    };
    document.addEventListener('scroll', handleScroll, { passive: true });

    // 定期检查光标可见性
    const visibilityInterval = setInterval(ensureCursorVisibility, 1000);

    // 清理函数
      return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('scroll', handleScroll);
      clearInterval(visibilityInterval);
      
        if (cursorRef.current && document.body.contains(cursorRef.current)) {
          document.body.removeChild(cursorRef.current);
        }

        cursorRef.current = null;
        isInitializedRef.current = false;
        
      console.log('🧹 光标组件已清理');
    };
  }, [initializeCursor, handleMouseMove, handleMouseOver, handleMouseOut, ensureCursorVisibility]);

  // 不渲染任何React元素，光标直接操作DOM
  return null;
};

export default GlobalCursor; 