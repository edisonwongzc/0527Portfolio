import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Twitter', href: 'https://twitter.com/edisonwong' },
    { name: 'Dribbble', href: 'https://dribbble.com/edisonwong' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/edisonwong' },
    { name: 'Instagram', href: 'https://instagram.com/edisonwong' }
  ];

  return (
    <footer className="px-6 lg:px-12 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
            {/* 品牌信息 */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                Let's create something
                <br />
                remarkable together
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Currently available for new projects and collaborations. 
                Always excited to work with passionate teams and individuals.
              </p>
            </div>
            
            <a
              href="mailto:hello@edisonwong.com"
              className="inline-flex items-center text-white border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5 group"
            >
              Start a project
              <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>

          {/* 联系信息 */}
          <div className="space-y-12">
            <div>
              <h4 className="text-lg font-light text-white mb-6">Get in touch</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:hello@edisonwong.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300 block text-lg"
                >
                  hello@edisonwong.com
                </a>
                <a 
                  href="tel:+1-555-0123"
                  className="text-gray-400 hover:text-white transition-colors duration-300 block"
                >
                  +1 (555) 012-3456
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-light text-white mb-6">Follow</h4>
              <div className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-gray-800 pt-8">
          <p>
            © {currentYear} Edison Wong. All rights reserved.
            </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span>San Francisco, CA</span>
            <span>Available worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 