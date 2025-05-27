import ScrollEffects from '../components/ScrollEffects';

/**
 * ScrollTrigger演示页面
 * 展示各种高级滚动动画效果
 */
const ScrollDemo = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* 页面标题 */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-light text-white mb-8">
          ScrollTrigger
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          探索GSAP ScrollTrigger的强大功能，体验各种令人惊艳的滚动动画效果
        </p>
      </section>

      {/* ScrollTrigger效果组件 */}
      <ScrollEffects />
    </div>
  );
};

export default ScrollDemo; 