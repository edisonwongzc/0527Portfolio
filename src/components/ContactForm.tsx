import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Send, User } from 'lucide-react';
import MagneticNavItem from './MagneticNavItem';
import DynamicSiriAvatar from './DynamicSiriAvatar';

interface ContactFormProps {
  isVisible: boolean;
  onClose: () => void;
  targetElement?: HTMLElement | null;
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

/**
 * AI聊天机器人组件
 * @param isVisible - 是否显示聊天窗口
 * @param onClose - 关闭聊天窗口的回调函数
 * @param targetElement - 目标元素（暂时不使用）
 * @param triggerButtonRef - 触发按钮的引用，用于形变动画
 */
const ContactForm = ({ isVisible, onClose, targetElement, triggerButtonRef }: ContactFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 初始化欢迎消息
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Hello! 👋 I\'m Edison\'s AI assistant. I can help you learn about this portfolio and Edison himself. What would you like to know?',
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isVisible, messages.length]);

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!formRef.current || !overlayRef.current) return;

    if (isVisible) {
      // 获取触发按钮的位置
      let startPosition = { x: window.innerWidth - 200, y: 20 };
      if (triggerButtonRef?.current) {
        const buttonRect = triggerButtonRef.current.getBoundingClientRect();
        startPosition = {
          x: buttonRect.left,
          y: buttonRect.top
        };
      }

      // 设置初始状态 - 从按钮位置开始
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(formRef.current, {
        position: 'fixed',
        left: startPosition.x,
        top: startPosition.y,
        width: triggerButtonRef?.current?.offsetWidth || 120,
        height: triggerButtonRef?.current?.offsetHeight || 40,
        zIndex: 1000,
        opacity: 1,
        borderRadius: '20px',
        overflow: 'hidden',
        scale: 1
      });

      // 形变动画到弹窗
      const tl = gsap.timeline();
      
      // 先显示背景遮罩
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, 0);
      
      // 形变动画 - 添加弹性效果
      tl.to(formRef.current, {
        left: window.innerWidth - 400 - 20, // 右侧位置
        top: 20, // EdisonWong文字高度
        width: 400,
        height: 500,
        borderRadius: '16px',
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, 0.1);

    } else {
      // 获取触发按钮的位置
      let endPosition = { x: window.innerWidth - 200, y: 20 };
      if (triggerButtonRef?.current) {
        const buttonRect = triggerButtonRef.current.getBoundingClientRect();
        endPosition = {
          x: buttonRect.left,
          y: buttonRect.top
        };
      }

      // 反向形变动画 - 优化关闭效果
      const tl = gsap.timeline();
      
      // 先缩小一点，然后移动
      tl.to(formRef.current, {
        scale: 0.95,
        duration: 0.15,
        ease: "power2.in"
      });
      
      // 同时开始淡出背景
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0);
      
      // 形变回按钮
      tl.to(formRef.current, {
        left: endPosition.x,
        top: endPosition.y,
        width: triggerButtonRef?.current?.offsetWidth || 120,
        height: triggerButtonRef?.current?.offsetHeight || 40,
        borderRadius: '20px',
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0.1);
      
      // 最后隐藏
      tl.to(formRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, 0.5);
    }
  }, [isVisible, triggerButtonRef]);

  // AI回复数据库
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('你好')) {
      return 'Hello! Nice to meet you! 😊 I\'m here to help you explore Edison\'s portfolio. You can ask me about his projects, skills, or background.';
    }
    
    if (message.includes('project') || message.includes('work') || message.includes('项目')) {
      return 'Edison has worked on several exciting projects! 🚀 Including HMI Design for automotive systems, AI exploration tools, brand design, and system specifications. Which project interests you most?';
    }
    
    if (message.includes('skill') || message.includes('能力') || message.includes('技能')) {
      return 'Edison specializes in HMI Design, Brand Design, UI/UX Design, and Creative Direction. He has experience with Figma, Sketch, After Effects, and various design tools. 🎨';
    }
    
    if (message.includes('contact') || message.includes('email') || message.includes('联系')) {
      return 'You can reach Edison at hello@edisonwong.com 📧 He\'s always excited to discuss new projects and collaborations!';
    }
    
    if (message.includes('experience') || message.includes('background') || message.includes('经验')) {
      return 'Edison has over 10 years of experience in design, working on projects from 2012-2025. He\'s worked with automotive companies like Tinnove and various creative brands. 💼';
    }
    
    if (message.includes('hmi') || message.includes('automotive') || message.includes('汽车')) {
      return 'Edison\'s HMI work focuses on creating intuitive automotive interfaces. His HMI Design Center project improved user task completion by 50% and reduced errors by 35%! 🚗';
    }
    
    if (message.includes('ai') || message.includes('artificial intelligence')) {
      return 'Edison explores AI tools for product experiences! His AI research project increased user engagement by 75% using intelligent linking algorithms. 🤖';
    }
    
    return 'That\'s an interesting question! 🤔 I can tell you about Edison\'s projects, skills, experience, or how to contact him. What would you like to know more about?';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI思考时间
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩 */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 聊天窗口容器 */}
      <div 
        ref={formRef}
        className="pointer-events-auto"
        onClick={(e) => {
          console.log('聊天窗口容器被点击');
          e.stopPropagation();
        }}
      >
        <div className="bg-black border border-gray-600 rounded-2xl shadow-2xl backdrop-blur-sm h-full flex flex-col">
          {/* 聊天头部 */}
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <DynamicSiriAvatar size={32} isActive={isTyping} />
              <div>
                <h3 className="text-sm font-medium text-white">AI Assistant</h3>
                <p className="text-xs text-gray-500">Edison's Portfolio Guide</p>
              </div>
            </div>
            <MagneticNavItem strength={0.4}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('关闭按钮被点击，即将调用onClose');
                  try {
                    onClose();
                    console.log('onClose调用成功');
                  } catch (error) {
                    console.error('onClose调用失败:', error);
                  }
                }}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 z-10 relative cursor-pointer"
                type="button"
              >
                <X size={16} />
              </button>
            </MagneticNavItem>
          </div>

          {/* 消息区域 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? '' : 'w-6 h-6 bg-gray-600 rounded-full'
                  }`}>
                    {message.isBot ? (
                      <DynamicSiriAvatar size={24} isActive={false} />
                    ) : (
                      <User size={12} className="text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-3 py-2 ${
                    message.isBot 
                      ? 'bg-gray-800 text-gray-200' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* AI正在输入指示器 */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="flex items-center justify-center">
                    <DynamicSiriAvatar size={24} isActive={true} />
                  </div>
                  <div className="bg-gray-800 rounded-2xl px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Edison..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none transition-colors duration-300 text-sm"
              />
              <MagneticNavItem strength={0.3}>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Send size={16} className="text-white" />
                </button>
              </MagneticNavItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 