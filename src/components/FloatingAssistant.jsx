import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { analysisResult, chatHistory, setChatHistory } = useAnalysis();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen, isTyping]);

  const quickQuestions = [
    { text: "Why is my ATS score low?", key: "ats" },
    { text: "How can I become an AI Engineer?", key: "role" },
    { text: "What skills are missing?", key: "skills" }
  ];

  const generateAIResponse = (text) => {
    const query = text.toLowerCase();
    const result = analysisResult;

    if (!result) {
      return "Please upload a resume first so I can analyze it and help you optimize your career!";
    }

    if (query.includes('ats') || query.includes('score') || query.includes('low')) {
      const weaknessesList = result.weaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n');
      return `Your ATS score is currently ${result.ats_score}/100. While it is competitive, here are the main factors holding it back:\n\n${weaknessesList}\n\nI recommend working on the high-priority improvements listed in your Roadmap. Let me know if you want detailed steps on any of them!`;
    }

    if (query.includes('ai engineer') || query.includes('become') || query.includes('role') || query.includes('recommend')) {
      const aiRole = result.recommended_roles.find(r => r.role === 'AI Engineer') || result.recommended_roles[0];
      return `Based on your resume, you are recommended for an **${aiRole.role}** role with a **${aiRole.confidence}% confidence score**.\n\n**Reasoning:** ${aiRole.reason}\n\nTo increase your alignment, you should focus on adding cloud deployment and containerization skills to your projects, which are highly sought after for production AI environments.`;
    }

    if (query.includes('skill') || query.includes('missing') || query.includes('technology')) {
      const missingSkills = result.job_match?.missing_skills || ['Docker', 'AWS', 'Kubernetes', 'CI/CD Pipelines'];
      return `Based on our industry comparison, the main skills missing from your resume are:\n\n${missingSkills.map(s => `- ${s}`).join('\n')}\n\nAdding these to your technical skills bank and describing how you used them in your projects will significantly boost your ATS keyword matches.`;
    }

    return `I can help you analyze your resume and prep for your career. Ask me about your "ATS score", "missing skills", or "how to become an AI Engineer".`;
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: generateAIResponse(text)
      };
      setChatHistory(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="mb-4 w-96 max-w-[calc(100vw-2rem)] h-[500px] rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden bg-card/95 backdrop-blur-md"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight text-foreground">AI Career Advisor</h3>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online • Ready to optimize
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted/70 text-foreground rounded-tl-none border border-border/50'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-muted/70 text-foreground border border-border/50 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 border-t border-border/50 bg-muted/20 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-left"
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-border flex items-center gap-2 bg-card">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask about your resume..."
                className="flex-1 bg-muted/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center cursor-pointer relative group"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur group-hover:blur-md transition-all duration-300"></div>
        {isOpen ? <X size={22} className="relative z-10" /> : <MessageSquare size={22} className="relative z-10" />}
      </motion.button>
    </div>
  );
}
