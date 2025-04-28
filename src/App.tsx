import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Loader2, Sparkles, Send, Twitter, Shield, Zap, Trophy, Target, Clock, CheckCircle2, X, Brain, Coins, Eye, Copy, Check } from 'lucide-react';
import PromotionalPage from './components/PromotionalPage';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [earlyAccessForm, setEarlyAccessForm] = useState({ email: '', description: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const messages = [
    'Initializing AI model...',
    'Analyzing requirements...',
    'Generating HTML structure...',
    'Creating responsive styles...',
    'Adding interactive features...',
    'Optimizing code...',
    'Finalizing website...'
  ];

  const features = [
    { icon: Coins, title: 'Free Demo', description: 'We offer a free simplified demo aside from cheap pricing' },
    { icon: Zap, title: 'Instant Deploy', description: 'No webhosting setup, deploy your website instantly' },
    { icon: Brain, title: 'Smart AI (Pro+)', description: 'Enjoy faster and more precise code generation than competitors' },
  ];

  const roadmap = [
    { phase: 'Phase 1', title: 'Launch', status: 'completed', items: ['Website Generator', 'Token Launch'] },
    { phase: 'Phase 2', title: 'Growth', status: 'active', items: ['Marketing', 'Community requests'] },
    { phase: 'Phase 3', title: 'Expansion', status: 'upcoming', items: ['DEX Integration', 'Automated Raids'] },
  ];

  const handleEarlyAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Early Access form submitted:', earlyAccessForm);
    setShowEarlyAccess(false);
    setEarlyAccessForm({ email: '', description: '' });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  useEffect(() => {
    if (isGenerating) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setLoadingMessage(messages[currentIndex]);
        currentIndex = (currentIndex + 1) % messages.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedCode(null);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: `You are a coder AI. You ONLY respond with complete HTML documents containing inline CSS and JavaScript. 
              - If instructions are unclear, create a beautiful, functional website of your choice
              - NEVER include explanations, comments, or non-code text
              - ALWAYS make the UI visually appealing
              - Use modern HTML5/CSS3/ES6+ standards
              - Include all necessary code in a single HTML file`
            },
            { 
              role: "user", 
              content: prompt 
            }
          ],
          temperature: 0.2, // Lower for more deterministic code
          max_tokens: 4096, // For longer code samples
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Code generation failed");
      }

      const data = await response.json();
      const rawCode = data.choices[0]?.message?.content;
      
      // Extract code between ```html ``` markers if present
      const cleanCode = rawCode.includes('```html')
        ? rawCode.split('```html')[1].split('```')[0].trim()
        : rawCode;
        
      setGeneratedCode(cleanCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Code generation error");
    } finally {
      setIsGenerating(false);
    }
  };

  const waveStyle = {
    transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
  };

  const copyToClipboard = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/promo" element={<PromotionalPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 relative overflow-hidden">
            {/* Early Access Button */}
            <button
              onClick={() => setShowEarlyAccess(true)}
              className="absolute top-6 right-6 z-20 px-6 py-3 rounded-full bg-lime-400 text-purple-900 font-bold transition-all duration-300 hover:scale-110 hover:bg-lime-300"
            >
              Early Access
            </button>

            {/* Early Access Form Modal */}
            {showEarlyAccess && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEarlyAccess(false)}></div>
                <div className="relative bg-purple-900 rounded-xl p-8 w-full max-w-md border border-purple-700/50">
                  <button
                    onClick={() => setShowEarlyAccess(false)}
                    className="absolute top-4 right-4 text-purple-200 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-bold text-white mb-6">Pro Early Access Request</h2>
                  <form onSubmit={handleEarlyAccessSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-purple-200 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={earlyAccessForm.email}
                        onChange={(e) => setEarlyAccessForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-purple-950/50 text-white rounded-lg border border-purple-700/50 p-3 focus:outline-none focus:ring-2 focus:ring-lime-400/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-purple-200 mb-2">Project Description</label>
                      <textarea
                        id="description"
                        value={earlyAccessForm.description}
                        onChange={(e) => setEarlyAccessForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-purple-950/50 text-white rounded-lg border border-purple-700/50 p-3 h-32 focus:outline-none focus:ring-2 focus:ring-lime-400/50 resize-none"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-lime-400 text-purple-900 font-bold py-3 rounded-lg hover:bg-lime-300 transition-colors"
                    >
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Success Message Popup */}
            {showSuccessMessage && (
              <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
                <div className="bg-lime-400 text-purple-900 font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Request submitted successfully!</span>
                </div>
              </div>
            )}

            {/* X Logo Link */}
            <a
              href="https://x.com/DashGenerator_"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-6 py-3 rounded-full bg-purple-900/50 backdrop-blur-lg border border-purple-700/30 transition-all duration-300 hover:scale-110 hover:bg-purple-800/50 hover:border-purple-600/50 group flex items-center gap-2"
            >
              <span className="text-white font-semibold group-hover:text-lime-400 transition-colors">Follow us on</span>
              <Twitter className="w-6 h-6 text-white group-hover:text-lime-400 transition-colors" />
            </a>

            {/* Animated background waves */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={waveStyle}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              </div>
            </div>

            {/* Grid texture */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 pt-32">
              {/* Logo */}
              <div className="mb-8 w-100 h-100 relative">
                <img 
                  src="https://i.imgur.com/gus3kTm.png" 
                  alt="Dash Logo" 
                  className="w-full h-full object-contain animate-float"
                />
                <div className="absolute inset-0 bg-lime-400 blur-3xl opacity-20 animate-pulse"></div>
              </div>

              <p className="text-xl text-purple-200 mb-12 text-center max-w-2xl">
                The Next Generation Web3 site generator
              </p>

              {!isGenerating ? (
                <div className="w-full max-w-2xl">
                  <form onSubmit={handleGenerate} className="space-y-4">
                    <div className="relative">
                      <Sparkles className="absolute left-4 top-4 w-6 h-6 text-purple-400" />
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your memecoin project site in detail"
                        className="w-full h-32 bg-purple-950/50 backdrop-blur-xl text-white placeholder-purple-400 rounded-xl border border-purple-700/50 p-4 pl-14 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-purple-900 font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group resize-none"
                    >
                      Generate Site
                      <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-64 h-2 bg-purple-800 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 animate-loading-bar"></div>
                  </div>
                  <div className="flex items-center text-purple-200 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{loadingMessage}</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-8 w-full max-w-2xl bg-red-500/10 backdrop-blur-xl rounded-xl p-4 border border-red-500/50">
                  <p className="text-red-400">{error}</p>
                </div>
              )}
              {generatedCode && (
                <div className="mt-8 w-full max-w-2xl mx-auto bg-purple-950/50 backdrop-blur-xl rounded-xl p-4 border border-purple-700/50 relative">
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-purple-800/50 hover:bg-purple-700/50 transition-colors text-purple-200 hover:text-white"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-white font-semibold">Generated Code:</h3>
                    {!showCode && (
                      <button
                        onClick={() => setShowCode(true)}
                        className="bg-gradient-to-r from-lime-400 to-emerald-400 text-purple-900 font-bold py-1.5 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                      >
                        <span className="min-w-[80px] text-center">Demo Code</span>
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-2 h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-700/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-purple-700/50">
                    <pre className={`text-purple-200 whitespace-pre-wrap transition-all duration-300 ${showCode ? 'blur-none' : 'blur-md select-none'}`}>
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              )}

              {/* Features Section */}
              <div className="mt-24 w-full max-w-6xl px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-12">What we offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="bg-purple-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-700/30 hover:border-lime-400/30 transition-all group">
                      <Icon className="w-12 h-12 text-lime-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                      <p className="text-purple-200">{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap Section */}
              <div className="mt-24 w-full max-w-6xl px-4 mb-24">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Roadmap</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {roadmap.map(({ phase, title, status, items }) => (
                    <div key={phase} className="bg-purple-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-700/30">
                      <div className="flex items-center gap-2 mb-4">
                        {status === 'completed' && <CheckCircle2 className="w-6 h-6 text-lime-400" />}
                        {status === 'active' && <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />}
                        {status === 'upcoming' && <Target className="w-6 h-6 text-purple-400" />}
                        <h3 className="text-xl font-semibold text-white">{phase}: {title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {items.map((item, index) => (
                          <li key={index} className="text-purple-200 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
