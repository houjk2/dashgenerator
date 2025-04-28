import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, FileCode, FileText, FileJson, Maximize2, Minimize2 } from 'lucide-react';

const CodeEditorDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const demoCode = {
    html: [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <title>AI-Powered Website</title>',
      '  <link rel="stylesheet" href="styles.css">',
      '</head>',
      '<body>',
      '  <div class="hero">',
      '    <h1>Welcome to the Future</h1>',
      '    <p>AI-Powered Web Development</p>',
      '  </div>',
      '  <script src="script.js"></script>',
      '</body>',
      '</html>'
    ],
    css: [
      'body {',
      '  margin: 0;',
      '  font-family: Arial, sans-serif;',
      '  background: linear-gradient(135deg, #1a1a2e, #16213e);',
      '  color: white;',
      '}',
      '',
      '.hero {',
      '  height: 100vh;',
      '  display: flex;',
      '  flex-direction: column;',
      '  justify-content: center;',
      '  align-items: center;',
      '  text-align: center;',
      '}',
      '',
      'h1 {',
      '  font-size: 4rem;',
      '  margin-bottom: 1rem;',
      '  background: linear-gradient(45deg, #00dbde, #fc00ff);',
      '  -webkit-background-clip: text;',
      '  -webkit-text-fill-color: transparent;',
      '}'
    ],
    js: [
      '// AI-Powered Animation',
      'const hero = document.querySelector(".hero");',
      '',
      'function animateElements() {',
      '  const elements = document.querySelectorAll("h1, p");',
      '  elements.forEach((el, index) => {',
      '    setTimeout(() => {',
      '      el.style.opacity = "1";',
      '      el.style.transform = "translateY(0)";',
      '    }, index * 200);',
      '  });',
      '}',
      '',
      '// Initialize animations',
      'window.addEventListener("load", animateElements);'
    ]
  };

  const startWriting = () => {
    setIsWriting(true);
    setCodeLines([]);
    setCurrentLine(0);
  };

  useEffect(() => {
    if (isWriting) {
      const interval = setInterval(() => {
        if (currentLine < demoCode[activeTab].length) {
          setCodeLines(prev => [...prev, demoCode[activeTab][currentLine]]);
          setCurrentLine(prev => prev + 1);
        } else {
          clearInterval(interval);
          setIsWriting(false);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [activeTab, currentLine, isWriting]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      startWriting();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`bg-gray-900 rounded-xl overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
    >
      <div className="flex items-center justify-between bg-gray-800 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setActiveTab('html');
              startWriting();
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'html' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            HTML
          </button>
          <button
            onClick={() => {
              setActiveTab('css');
              startWriting();
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'css' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 mr-2" />
            CSS
          </button>
          <button
            onClick={() => {
              setActiveTab('js');
              startWriting();
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'js' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileJson className="w-4 h-4 mr-2" />
            JavaScript
          </button>
        </div>
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm h-[500px] overflow-y-auto">
        <AnimatePresence>
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start"
            >
              <span className="text-gray-500 w-8 select-none">{index + 1}</span>
              <span className="text-gray-300">{line}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {isWriting && currentLine < demoCode[activeTab].length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="flex items-start"
          >
            <span className="text-gray-500 w-8 select-none">{currentLine + 1}</span>
            <span className="text-gray-300">|</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CodeEditorDemo; 