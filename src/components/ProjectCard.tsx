import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group"
    >
      <div className="card overflow-hidden h-full relative bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 transition-all duration-700">
        {/* 项目图片 - 苹果风格 */}
        <div className="relative overflow-hidden aspect-[4/3] rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-110"
          />
          
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500">
          </div>

          {/* 悬停时的操作按钮 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex space-x-3">
                  {project.demoUrl && (
                <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                  className="w-14 h-14 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                    >
                  <ExternalLink size={20} className="text-white" />
                </motion.a>
                  )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/project/${project.id}`}
                  className="w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full flex items-center justify-center hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  <ArrowUpRight size={20} className="text-white" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* 类别标签 */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 glass-effect rounded-full text-xs font-medium text-white/90 backdrop-blur-md">
              {project.category}
            </span>
        </div>

          {/* 年份标签 */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center px-3 py-1 glass-effect rounded-full text-xs text-white/80 backdrop-blur-md">
              <Calendar size={12} className="mr-1.5" />
              {project.year}
            </div>
          </div>
        </div>

        {/* 项目信息 - 苹果风格 */}
        <div className="p-8">
          {/* 标题 */}
          <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-gradient transition-all duration-500 leading-tight">
            {project.title}
          </h3>

          {/* 描述 */}
          <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
            {project.description}
          </p>

          {/* 技术标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.1 }}
                className="flex items-center px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-300 transition-all duration-300"
              >
                <Tag size={10} className="mr-1.5 text-purple-400" />
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="flex items-center px-3 py-1.5 text-xs text-gray-500 font-medium">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* 客户信息 */}
          {project.client && (
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm text-gray-500">客户</span>
              <span className="text-sm font-medium text-gray-300">{project.client}</span>
            </div>
          )}

          {/* 底部装饰线 */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 