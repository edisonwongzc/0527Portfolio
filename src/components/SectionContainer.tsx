import { ReactNode, forwardRef } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: 'default' | 'hero' | 'projects' | 'services' | 'about' | 'contact';
  withBorder?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * SectionContainer组件
 * 统一管理页面各个模块的布局和样式
 */
const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(({
  children,
  id,
  className = '',
  variant = 'default',
  withBorder = true,
  padding = 'lg'
}, ref) => {
  
  // 根据variant设置不同的样式
  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return 'min-h-screen flex items-center justify-center relative overflow-hidden';
      case 'projects':
        return 'relative transform-gpu';
      case 'services':
        return 'relative transform-gpu';
      case 'about':
        return 'relative';
      case 'contact':
        return 'relative transform-gpu';
      default:
        return 'relative';
    }
  };

  // 根据padding设置内边距
  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm':
        return variant === 'services' ? 'pl-6 lg:pl-12 pr-2 lg:pr-4 py-16' : 'px-6 lg:px-12 py-16';
      case 'md':
        return variant === 'services' ? 'pl-6 lg:pl-12 pr-2 lg:pr-4 py-24' : 'px-6 lg:px-12 py-24';
      case 'lg':
        return variant === 'services' ? 'pl-6 lg:pl-12 pr-2 lg:pr-4 py-32' : 'px-6 lg:px-12 py-32';
      case 'xl':
        return variant === 'services' ? 'pl-6 lg:pl-12 pr-2 lg:pr-4 py-40' : 'px-6 lg:px-12 py-40';
      default:
        return variant === 'services' ? 'pl-6 lg:pl-12 pr-2 lg:pr-4 py-32' : 'px-6 lg:px-12 py-32';
    }
  };

  // 组合所有样式
  const combinedClassName = [
    getVariantStyles(),
    variant !== 'hero' ? getPaddingStyles() : '',
    withBorder && variant !== 'hero' ? 'border-t border-gray-800' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <section
      ref={ref}
      id={id}
      className={combinedClassName}
    >
      {variant !== 'hero' && (
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      )}
      {variant === 'hero' && children}
    </section>
  );
});

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer; 