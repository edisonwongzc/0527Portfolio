import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: AnimatedSectionProps) => {
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.6,
          delay,
          ease: "easeOut"
        }
      }
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseVariants.hidden, y: 50 },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'down':
        return {
          hidden: { ...baseVariants.hidden, y: -50 },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: -50 },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: 50 },
          visible: { ...baseVariants.visible, x: 0 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 