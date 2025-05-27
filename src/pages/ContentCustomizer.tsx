import ContentManager from '../components/ContentManager';

/**
 * 内容定制页面
 * 用于管理和预览不同的故事线内容
 */
const ContentCustomizer = () => {
  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-white mb-6">内容定制中心</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            在这里您可以预览和定制不同的故事线版本，选择最适合您品牌和目标的内容风格。
          </p>
        </div>
        
        <ContentManager />
      </div>
    </div>
  );
};

export default ContentCustomizer; 