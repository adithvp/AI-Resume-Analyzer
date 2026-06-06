import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, ShieldCheck, Sparkles, Target, Zap, ArrowRight, 
  MessageSquare, BarChart3, Star, CheckCircle, RefreshCw 
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { resetAnalysis } = useAnalysis();

  const handleGetStarted = () => {
    resetAnalysis();
    navigate('/upload');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const featureCards = [
    {
      icon: <ShieldCheck className="text-primary" size={24} />,
      title: "ATS Score Analysis",
      desc: "Instant ATS compliance parsing checking 10 key rating parameters like keywords, depth, and structure."
    },
    {
      icon: <Sparkles className="text-indigo-500" size={24} />,
      title: "AI Optimization",
      desc: "Actionable itemized feedback to fix weaknesses and measure score gains before applying."
    },
    {
      icon: <Target className="text-emerald-500" size={24} />,
      title: "Career Role Matching",
      desc: "Compare your resume profile with modern tech descriptions and check confidence percentages."
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "Resume Snapshot & Roadmaps",
      desc: "Interactive timeline roadmaps and accordion resume breakdowns for rapid editing references."
    }
  ];

  const steps = [
    { num: "01", title: "Upload Resume", desc: "Drag and drop your PDF or word file. Our parser extracts text in seconds." },
    { num: "02", title: "AI Analysis", desc: "Our engine evaluates keywords, layout, depth, and specific tech gaps." },
    { num: "03", title: "Career Insights", desc: "Compare against recruiter benchmarks and discover roles you match best." },
    { num: "04", title: "Optimize", desc: "Follow step-by-step recommendations and watch your ATS score hit 90+." }
  ];

  const testimonials = [
    {
      quote: "This platform is game-changing. I added AWS details and Docker configurations as recommended, and my call-back rate went up by 300%.",
      author: "Sarah Jenkins",
      role: "AI Engineer @ Stripe",
      rating: 5
    },
    {
      quote: "Extremely intuitive UI. The automated score analysis pinpointed exactly why my resume wasn't passing the initial automated screening.",
      author: "Marcus Chen",
      role: "Backend Lead @ Vercel",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-medium tracking-wide">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
            Powered by Gemini 2.5 Flash
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] font-sans">
            AI Resume <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Intelligence</span> Platform
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Analyze your resume, improve ATS performance, discover career opportunities, and optimize for your dream job.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 group hover:bg-primary/95 transition-all shadow-lg hover:shadow-primary/15 relative overflow-hidden cursor-pointer"
            >
              Upload Resume
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-muted/50 transition-all cursor-pointer"
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Animated Resume -> AI Scan -> Insights Visualisation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full max-w-4xl mt-16 p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-premium dark:shadow-premium-dark flex flex-col md:flex-row items-center gap-8 justify-around relative overflow-hidden"
        >
          {/* Scanning lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-30"></div>

          {/* Block 1: Resume File */}
          <div className="flex flex-col items-center p-6 border border-border rounded-xl bg-card w-48 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
              <FileText size={24} />
            </div>
            <span className="text-xs font-semibold">Resume.pdf</span>
            <span className="text-[10px] text-muted-foreground mt-1">2.4 MB</span>
            <div className="w-full bg-muted h-1 rounded-full overflow-hidden mt-4">
              <div className="bg-emerald-500 h-full w-[80%]"></div>
            </div>
          </div>

          {/* Block 2: Scanning Arrow / Scan animation */}
          <div className="flex flex-col items-center text-primary">
            <span className="text-xs font-mono text-muted-foreground mb-1">SCANNING</span>
            <div className="flex items-center justify-center gap-2">
              <motion.div 
                animate={{ x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="flex gap-1"
              >
                <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </motion.div>
              <RefreshCw size={20} className="animate-spin text-primary" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          {/* Block 3: Dashboard Insights Mock */}
          <div className="flex flex-col p-5 border border-border rounded-xl bg-card w-64 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-bold flex items-center gap-1.5"><BarChart3 size={14} className="text-primary" /> ATS Report</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-bold">Strong</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center text-xs font-bold">
                84
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold">AI Engineer Match</div>
                <div className="text-[9px] text-emerald-500">95% Confidence</div>
              </div>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="h-2 rounded bg-muted w-full flex items-center pl-1 text-[8px] text-muted-foreground font-mono">
                +8 points: Add AWS Deployment
              </div>
              <div className="h-2 rounded bg-muted w-[90%] flex items-center pl-1 text-[8px] text-muted-foreground font-mono">
                +12 points: Add Quantified Metrics
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 bg-muted/30 border-y border-border px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Advanced Analytical Features</h2>
            <p className="text-muted-foreground font-light text-sm">
              We leverage advanced LLM schemas to score, breakdown, and map your profile.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featureCards.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 border border-border rounded-2xl bg-card hover:shadow-md transition-all space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-base">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground font-light text-sm">
            Four simple phases designed to take you from upload to dream job callbacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col space-y-3 relative group">
              <div className="text-4xl font-extrabold text-muted-foreground/15 font-mono select-none transition-colors group-hover:text-primary/20">
                {step.num}
              </div>
              <h3 className="font-bold text-base text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              {idx < 3 && (
                <div className="hidden md:block absolute top-4 right-[-20%] w-[35%] h-[1px] bg-border pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/20 border-t border-border px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Loved by Tech Professionals</h2>
            <p className="text-muted-foreground font-light text-sm">
              Read how developers, product managers, and cloud engineers optimize their career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm relative">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xs italic text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{t.author}</h4>
                    <span className="text-[10px] text-muted-foreground">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 md:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-lg font-sans">
              <Sparkles size={20} />
              <span>Resume Intelligence</span>
            </div>
            <p className="text-[11px] text-muted-foreground max-w-xs leading-relaxed">
              Providing enterprise-level resume insights, ATS score calibrations, and job match metrics powered by AI.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Product</h4>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a></li>
              <li><button onClick={handleGetStarted} className="hover:text-primary transition-colors text-left">Upload resume</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Features</h4>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">ATS Scoring</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Role Matching</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Job Recommendations</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Company</h4>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Resume Intelligence. All rights reserved.</span>
          <span>Designed with absolute precision.</span>
        </div>
      </footer>
    </div>
  );
}
