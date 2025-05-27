import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticNavItem from './MagneticNavItem';

interface NavbarProps {
  onContactFormToggle?: () => void;
  isContactFormVisible?: boolean;
  contactButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

const Navbar = ({ onContactFormToggle, isContactFormVisible, contactButtonRef }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems: { name: string; path: string }[] = [
    // 移除导航按钮
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800/50' : 'bg-transparent'
      }`}
      style={{
        zIndex: 2147483647,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        pointerEvents: 'auto'
      }}
    >
      <div className="px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo - 保持左侧 */}
          <MagneticNavItem strength={0.15}>
            <Link 
              to="/" 
              className="font-medium text-white hover:text-gray-300 transition-colors duration-300 tracking-wide cursor-scale"
              style={{ fontSize: '20px', textShadow: 'none' }}
            >
              EdisonWong Design 2025
          </Link>
          </MagneticNavItem>

          <div className="flex items-center space-x-16">
            {/* Desktop Menu - 移到右侧 */}
            <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
                <MagneticNavItem key={item.name} strength={0.4}>
                  {item.name === 'About' ? (
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        const aboutSection = document.getElementById('about');
                        if (aboutSection) {
                          aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`text-sm font-light transition-colors duration-300 tracking-wide cursor-scale ${
                        location.pathname === '/' && location.hash === '#about'
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-sm font-light transition-colors duration-300 tracking-wide cursor-scale ${
                        location.pathname === item.path
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </MagneticNavItem>
            ))}
              
              {/* 联系按钮 - 增强磁吸效果 */}
              {!isContactFormVisible && (
                <MagneticNavItem strength={0.5}>
                  <button
                    ref={contactButtonRef}
                    onClick={onContactFormToggle}
                    className="text-sm font-light text-gray-400 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-full hover:bg-white/5 cursor-scale"
                  >
                    Say Hello
                  </button>
                </MagneticNavItem>
              )}
          </div>

          {/* Mobile Menu Button */}
            <MagneticNavItem strength={0.3}>
          <button
            onClick={handleToggle}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-scale"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
          >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
          </button>
            </MagneticNavItem>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }
          }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-gray-800/50"
        >
          <div className="py-8 space-y-6">
            {navItems.map((item) => (
              <MagneticNavItem key={item.name} strength={0.3}>
                {item.name === 'About' ? (
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      const aboutSection = document.getElementById('about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsOpen(false);
                    }}
                    className={`block text-lg font-light transition-colors duration-300 cursor-scale ${
                      location.pathname === '/' && location.hash === '#about'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`block text-lg font-light transition-colors duration-300 cursor-scale ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </MagneticNavItem>
            ))}
            
            {/* 移动端联系按钮 */}
            {!isContactFormVisible && (
              <MagneticNavItem strength={0.3}>
                <button
                  onClick={() => {
                    onContactFormToggle?.();
                    setIsOpen(false);
                  }}
                  className="block text-lg font-light text-gray-400 hover:text-white transition-colors duration-300 pt-4 cursor-scale"
                >
                  Say Hello
                </button>
              </MagneticNavItem>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar; 