import React, { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionContainer from '../SectionContainer';

interface ContactSectionProps {}

/**
 * 联系区域组件
 */
const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  (props, ref) => {
    return (
      <SectionContainer ref={ref} variant="contact" id="contact" data-section="contact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
              Let's create something interesting
              <br />
              <span className="text-4xl md:text-6xl text-gray-500">一起创造有意思的产品</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Currently available for new projects and collaborations. 
              Always excited to work with passionate teams and individuals.
              <br />
              <span className="text-base text-gray-600">欢迎咨询合作，始终乐衷与充满激情的团队和个人合作。</span>
            </p>
          </div>
          
          <div className="lg:col-span-5 lg:col-start-8 space-y-8">
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Get in touch
                <br />
                <span className="text-base text-gray-500">联系方式</span>
              </h3>
              <a 
                href="mailto:18321445543@163.com"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-lg"
              >
                18321445543@163.com
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Follow
                <br />
                <span className="text-base text-gray-500">关注</span>
              </h3>
              <div className="flex space-x-6">
                <a 
                  href="https://twitter.com/edisonwong" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Twitter
                </a>
                <a 
                  href="https://dribbble.com/edisonwong" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Dribbble
                </a>
                <a 
                  href="https://linkedin.com/in/edisonwong" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <Link 
              to="/contact"
              className="inline-flex items-center text-white border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5 group"
            >
              Start a project
              <ArrowUpRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </SectionContainer>
    );
  }
);

ContactSection.displayName = 'ContactSection';

export default ContactSection; 