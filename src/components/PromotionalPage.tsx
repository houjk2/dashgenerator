import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles, Rocket, Target, Shield, Trophy, Code } from 'lucide-react';
import CodeEditorDemo from './CodeEditorDemo';

const PromotionalPage: React.FC = () => {
  useEffect(() => {
    document.title = "DashGenerator - The Future of Web Development";
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate beautiful websites in seconds with our advanced AI technology"
    },
    {
      icon: Sparkles,
      title: "Stunning Designs",
      description: "Professional, modern, and responsive designs that impress"
    },
    {
      icon: Rocket,
      title: "Instant Deployment",
      description: "One-click deployment to your preferred hosting platform"
    },
    {
      icon: Target,
      title: "Precision Code",
      description: "Clean, optimized, and maintainable code every time"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and reliability built-in"
    },
    {
      icon: Trophy,
      title: "Award-Winning",
      description: "Recognized as a leader in AI-powered web development"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <motion.h1 
          className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Transform Your Ideas into Reality
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The most advanced AI-powered website generator on the market
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Started Now
        </motion.button>
      </motion.div>

      {/* Code Editor Demo Section */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Code className="w-12 h-12 text-purple-400" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">AI-Powered Code Generation</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Watch as our AI writes clean, optimized code in real-time
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <CodeEditorDemo />
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <motion.h2 
              className="text-4xl font-bold text-purple-400"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              10,000+
            </motion.h2>
            <p className="text-gray-300 mt-2">Websites Generated</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <motion.h2 
              className="text-4xl font-bold text-purple-400"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              99.9%
            </motion.h2>
            <p className="text-gray-300 mt-2">Uptime</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <motion.h2 
              className="text-4xl font-bold text-purple-400"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              24/7
            </motion.h2>
            <p className="text-gray-300 mt-2">Support</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromotionalPage; 