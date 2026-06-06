import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AnalysisProvider } from './context/AnalysisContext';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import Dashboard from './pages/Dashboard';
import FloatingAssistant from './components/FloatingAssistant';
import { Sparkles, Sun, Moon, FileText, UploadCloud } from 'lucide-react';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground">
          <Sparkles size={16} className="text-primary animate-pulse" />
          <span>Resume Intelligence</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-xs font-medium transition-colors hover:text-foreground ${
              isLinkActive('/') ? 'text-primary font-bold' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/upload" 
            className={`text-xs font-medium transition-colors hover:text-foreground ${
              isLinkActive('/upload') ? 'text-primary font-bold' : 'text-muted-foreground'
            }`}
          >
            Upload
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-xs font-medium transition-colors hover:text-foreground ${
              isLinkActive('/dashboard') ? 'text-primary font-bold' : 'text-muted-foreground'
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          
          <Link
            to="/upload"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition-all shadow-md cursor-pointer"
          >
            <UploadCloud size={13} />
            Scan Resume
          </Link>
        </div>
      </div>
    </header>
  );
}

function MainApp() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <FloatingAssistant />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AnalysisProvider>
        <MainApp />
      </AnalysisProvider>
    </ThemeProvider>
  );
}
