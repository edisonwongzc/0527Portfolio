import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalCursor from './components/GlobalCursor';
import ContactForm from './components/ContactForm';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import DesignThinking from './pages/DesignThinking';
// import WorkDetail from './pages/WorkDetail';

const App = () => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const currentSectionRef = useRef<HTMLElement | null>(null);
  const contactButtonRef = useRef<HTMLButtonElement | null>(null);

  // 获取当前停留的模块
  useEffect(() => {
    const updateCurrentSection = () => {
      const sections = document.querySelectorAll('section, .hero-section, .three-hero-container');
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollY >= sectionTop && scrollY <= sectionBottom) {
          currentSectionRef.current = section as HTMLElement;
          break;
        }
      }
    };

    updateCurrentSection();
    window.addEventListener('scroll', updateCurrentSection);
    return () => window.removeEventListener('scroll', updateCurrentSection);
  }, []);

  const handleContactFormToggle = () => {
    setIsContactFormVisible(!isContactFormVisible);
  };

  // 简化的导航栏保护机制
  useEffect(() => {
    const protectNavbar = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.position = 'fixed';
        (navbar as HTMLElement).style.top = '0';
        (navbar as HTMLElement).style.left = '0';
        (navbar as HTMLElement).style.right = '0';
        (navbar as HTMLElement).style.zIndex = '2147483647';
        (navbar as HTMLElement).style.visibility = 'visible';
        (navbar as HTMLElement).style.opacity = '1';
        (navbar as HTMLElement).style.pointerEvents = 'auto';
      }
    };

    // 立即执行一次
    protectNavbar();

    // 定期检查（降低频率，避免与光标冲突）
    const interval = setInterval(protectNavbar, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToTop />
        <GlobalCursor />
        <Navbar 
          onContactFormToggle={handleContactFormToggle}
          isContactFormVisible={isContactFormVisible}
          contactButtonRef={contactButtonRef}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/design-thinking" element={<DesignThinking />} />
            {/* <Route path="/work/:id" element={<WorkDetail />} /> */}
          </Routes>
        </main>
        <Footer />
        
        {/* 联系表单 */}
        <ContactForm 
          isVisible={isContactFormVisible}
          onClose={() => setIsContactFormVisible(false)}
          targetElement={currentSectionRef.current}
          triggerButtonRef={contactButtonRef}
        />
      </div>
    </Router>
  );
};

export default App;
