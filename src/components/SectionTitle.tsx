import { ReactNode, forwardRef } from 'react';

interface SectionTitleProps {
  title: string;
  titleZh?: string;
  subtitle?: string;
  subtitleZh?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode;
}

/**
 * SectionTitle组件
 * 统一管理各个模块的标题样式
 */
const SectionTitle = forwardRef<HTMLDivElement, SectionTitleProps>(({
  title,
  titleZh,
  subtitle,
  subtitleZh,
  size = 'lg',
  align = 'left',
  className = '',
  children
}, ref) => {
  
  // 根据size设置标题大小
  const getTitleSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-3xl md:text-4xl';
      case 'md':
        return 'text-4xl md:text-5xl';
      case 'lg':
        return 'text-4xl md:text-6xl';
      case 'xl':
        return 'text-5xl md:text-7xl';
      default:
        return 'text-4xl md:text-6xl';
    }
  };

  // 根据size设置中文标题大小
  const getZhTitleSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-2xl md:text-3xl';
      case 'md':
        return 'text-3xl md:text-4xl';
      case 'lg':
        return 'text-3xl md:text-5xl';
      case 'xl':
        return 'text-4xl md:text-6xl';
      default:
        return 'text-3xl md:text-5xl';
    }
  };

  // 根据align设置对齐方式
  const getAlignStyles = () => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const containerClassName = [
    'mb-20',
    getAlignStyles(),
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={containerClassName}>
      <h2 className={`${getTitleSizeStyles()} font-light text-white leading-tight mb-6`}>
        {title}
        {titleZh && (
          <>
            <br />
            <span className={`${getZhTitleSizeStyles()} text-gray-500`}>
              {titleZh}
            </span>
          </>
        )}
      </h2>
      
      {(subtitle || subtitleZh) && (
        <div className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          {subtitle && <p>{subtitle}</p>}
          {subtitleZh && (
            <p className="text-base text-gray-600 mt-2">{subtitleZh}</p>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
});

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle; 