import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 lg:px-12 py-32 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-6">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extralight text-white leading-none tracking-tighter mb-8">
                About
              </h1>
              <Link to="/resume" className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 border-gray-600 rounded-full hover:border-white transition-all duration-300 hover:bg-white/5 mb-8" title="View detailed resume">
                <ArrowUpRight size={24} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </Link>
            </div>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Digital Designer & Creative Director based in Shanghai, working with clients worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
