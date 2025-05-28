import { motion } from 'framer-motion';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resume = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <h1 className="text-5xl font-light text-white mb-6">Edison Wong</h1>
        <p className="text-xl text-gray-400 mb-8">Digital Designer & Creative Director</p>
        <Link to="/about" className="text-gray-400 hover:text-white">← Back to About</Link>
      </div>
    </div>
  );
};

export default Resume;
