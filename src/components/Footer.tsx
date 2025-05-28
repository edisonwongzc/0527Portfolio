import { ArrowUpRight } from 'lucide-react';

/**
 * Footer组件 - 页面底部版权信息
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 lg:px-12 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* 底部版权信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>
            © {currentYear} Edison Wong. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span>Shanghai, CN</span>
            <span>Available worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;