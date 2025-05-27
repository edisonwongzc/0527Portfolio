import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop组件
 * 在路由变化时自动滚动到页面顶部
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 立即滚动到顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 使用instant而不是smooth，确保立即到达顶部
    });

    // 备用方案：确保页面确实在顶部
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // 重置body的滚动位置
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop; 