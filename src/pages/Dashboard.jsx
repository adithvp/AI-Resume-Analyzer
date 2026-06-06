import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  Sparkles, CheckCircle2, AlertTriangle, ListTodo, Briefcase, 
  BookOpen, Code, Trophy, Map, ArrowRight, RefreshCw, FileText, ChevronDown, ChevronUp, Star, Award 
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

// Custom Count Up Component
function AnimatedCounter({ target, duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { analysisResult, uploadedFile, resetAnalysis, jobDescription } = useAnalysis();
  const [expandedRole, setExpandedRole] = useState(null);
  const [expandedSnapshot, setExpandedSnapshot] = useState(null);
  
  useEffect(() => {
    if (!analysisResult) {
      navigate('/upload');
    }
  }, [analysisResult, navigate]);

  if (!analysisResult) return null;

  const getATSBadge = (score) => {
    if (score >= 90) return { label: 'Exceptional', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
    if (score >= 80) return { label: 'Strong', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' };
    if (score >= 70) return { label: 'Competitive', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
    if (score >= 60) return { label: 'Average', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' };
    return { label: 'Needs Improvement', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' };
  };

  const badge = getATSBadge(analysisResult.ats_score);

  // Health KPIs based on mock values or calculated from scores
  const kpiData = [
    { title: "Skills Quality", score: "88%", desc: "Rich technical alignment" },
    { title: "Project Quality", score: "82%", desc: "High production value" },
    { title: "Keyword Match", score: "79%", desc: "Solid search relevance" },
    { title: "Readability", score: "94%", desc: "Perfect clean formatting" }
  ];

  const handleReset = () => {
    resetAnalysis();
    navigate('/upload');
  };

  const getPriorityColor = (priority) => {
    const p = priority.toLowerCase();
    if (p.includes('high')) return 'bg-rose-500/10 text-rose-500 border-rose-500/25';
    if (p.includes('medium')) return 'bg-amber-500/10 text-amber-500 border-amber-500/25';
    return 'bg-blue-500/10 text-blue-500 border-blue-500/25';
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-10 font-sans">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <Sparkles className="text-primary animate-pulse" size={24} />
            Analysis Results
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review your resume evaluation report for <span className="font-semibold">{uploadedFile?.name || 'Resume.pdf'}</span>
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors flex items-center justify-center gap-1.5 font-semibold cursor-pointer w-fit"
        >
          <RefreshCw size={14} /> Analyze Another Resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ATS Hero + KPIs */}
        <div className="space-y-8 lg:col-span-1">
          
          {/* Section 1: ATS Score Hero */}
          <div className="p-6 border border-border rounded-2xl bg-card shadow-sm flex flex-col items-center text-center space-y-6">
            <h2 className="text-sm font-bold tracking-tight text-foreground/80 w-full text-left">ATS Score</h2>
            <div className="w-36 h-36">
              <CircularProgressbar
                value={analysisResult.ats_score}
                text={`${analysisResult.ats_score}/100`}
                strokeWidth={8}
              />
            </div>
            <div className="space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                {badge.label}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your resume performs better than 78% of analyzed resumes in this tech sector.
              </p>
            </div>
          </div>

          {/* Section 2: Resume Health KPIs */}
          <div className="grid grid-cols-2 gap-4">
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="p-4 border border-border rounded-xl bg-card flex flex-col justify-between space-y-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{kpi.title}</span>
                <div>
                  <h4 className="text-xl font-bold leading-none mb-1 text-foreground">{kpi.score}</h4>
                  <span className="text-[9px] text-muted-foreground block">{kpi.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Target Job Match Score (If job description was entered) */}
          {jobDescription && analysisResult.job_match && (
            <div className="p-5 border border-border rounded-2xl bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-wider uppercase text-foreground">JD Matching Analysis</h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-bold">Matched</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center font-bold text-sm">
                  {analysisResult.job_match.match_score}%
                </div>
                <div>
                  <div className="text-xs font-bold">Target Alignment Score</div>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">Calculated based on custom description parameters.</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-border/50">
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block mb-1">Matching Technical Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.job_match.matching_skills.map((skill, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/15">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-1">Missing Keyword Gaps</span>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.job_match.missing_skills.map((skill, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/15">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Roadmaps, Strengths, Weaknesses, Recommendations, Career Roles */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Section 8: Resume Improvement Roadmap (Timeline) */}
          <div className="p-6 border border-border rounded-2xl bg-card space-y-6">
            <h2 className="text-sm font-bold tracking-tight flex items-center gap-1.5 text-foreground/80">
              <Map size={16} className="text-primary" />
              Resume Improvement Roadmap
            </h2>
            <div className="relative border-l border-border pl-6 ml-3 space-y-6">
              {analysisResult.improvements.map((imp, idx) => {
                // Parse priority and score from improvement string
                const matchPriority = imp.match(/\(Priority:\s*(\w+)/i);
                const matchGain = imp.match(/Gain:\s*([^)]+)/i);
                const priority = matchPriority ? matchPriority[1] : 'Medium';
                const gain = matchGain ? matchGain[1] : '+5 pts';
                const description = imp.replace(/\([^)]+\)/g, '').trim();

                return (
                  <div key={idx} className="relative">
                    <span className="absolute left-[-31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-primary bg-card flex items-center justify-center text-[8px] font-bold text-primary">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-foreground">{description}</h4>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-primary/10 text-primary">{gain}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground block font-light leading-relaxed">
                        Implement this update under your corresponding project or professional summary.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3 & 4: Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="p-6 border border-border rounded-2xl bg-card space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Strongest Aspects
              </h3>
              <div className="space-y-3">
                {analysisResult.strengths.map((str, idx) => (
                  <div key={idx} className="flex gap-2 text-xs leading-relaxed text-foreground/90 bg-emerald-500/5 p-2.5 rounded-xl border border-emerald-500/10">
                    <span className="font-bold text-emerald-500 shrink-0">•</span>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="p-6 border border-border rounded-2xl bg-card space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-amber-500 uppercase flex items-center gap-1.5">
                <AlertTriangle size={14} /> Score Gaps & Weaknesses
              </h3>
              <div className="space-y-3">
                {analysisResult.weaknesses.map((weak, idx) => (
                  <div key={idx} className="flex gap-2 text-xs leading-relaxed text-foreground/90 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/10">
                    <span className="font-bold text-amber-500 shrink-0">•</span>
                    <span>{weak}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: AI Recommendations Task List */}
          <div className="p-6 border border-border rounded-2xl bg-card space-y-4">
            <h2 className="text-sm font-bold tracking-tight flex items-center gap-1.5 text-foreground/80">
              <ListTodo size={16} className="text-primary" />
              Prioritized Optimization Checklist
            </h2>
            <div className="divide-y divide-border/60">
              {analysisResult.improvements.map((imp, idx) => {
                const matchPriority = imp.match(/\(Priority:\s*(\w+)/i);
                const matchGain = imp.match(/Gain:\s*([^)]+)/i);
                const priority = matchPriority ? matchPriority[1] : 'Medium';
                const gain = matchGain ? matchGain[1] : '+5 pts';
                const description = imp.replace(/\([^)]+\)/g, '').trim();

                return (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer" 
                      />
                      <span className="text-xs text-foreground/90 font-medium">{description}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(priority)}`}>
                        {priority}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground font-semibold">{gain}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 6: Career Role Matching */}
          <div className="p-6 border border-border rounded-2xl bg-card space-y-4">
            <h2 className="text-sm font-bold tracking-tight flex items-center gap-1.5 text-foreground/80">
              <Briefcase size={16} className="text-primary" />
              Recommended Roles & Matching Confidence
            </h2>
            <div className="space-y-3">
              {analysisResult.recommended_roles.map((roleObj, idx) => {
                const isExpanded = expandedRole === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-border rounded-xl bg-card/50 overflow-hidden transition-all hover:bg-card"
                  >
                    <button
                      onClick={() => setExpandedRole(isExpanded ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {roleObj.confidence}%
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground">{roleObj.role}</h4>
                          <span className="text-[10px] text-muted-foreground">Confidence Rating</span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t border-border/50 text-xs text-muted-foreground leading-relaxed bg-muted/10 font-light">
                            {roleObj.reason}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 7: Resume Snapshot (Accordions) */}
          <div className="p-6 border border-border rounded-2xl bg-card space-y-4">
            <h2 className="text-sm font-bold tracking-tight flex items-center gap-1.5 text-foreground/80">
              <FileText size={16} className="text-primary" />
              Extracted Resume Snapshot
            </h2>
            <div className="space-y-3">
              {/* Snapshot Item: Skills */}
              <div className="border border-border rounded-xl bg-card/40 overflow-hidden">
                <button
                  onClick={() => setExpandedSnapshot(expandedSnapshot === 'skills' ? null : 'skills')}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Code size={14} className="text-muted-foreground" /> Core Skills</span>
                  {expandedSnapshot === 'skills' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {expandedSnapshot === 'skills' && (
                  <div className="p-4 pt-0 border-t border-border/50 bg-muted/10 flex flex-wrap gap-1.5">
                    {analysisResult.parsed_data.skills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-card text-foreground border border-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Snapshot Item: Education */}
              <div className="border border-border rounded-xl bg-card/40 overflow-hidden">
                <button
                  onClick={() => setExpandedSnapshot(expandedSnapshot === 'education' ? null : 'education')}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2"><BookOpen size={14} className="text-muted-foreground" /> Education Details</span>
                  {expandedSnapshot === 'education' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {expandedSnapshot === 'education' && (
                  <div className="p-4 pt-0 border-t border-border/50 bg-muted/10 space-y-4">
                    {analysisResult.parsed_data.education.map((edu, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-foreground">{edu.degree}</h4>
                          <span className="text-[10px] text-muted-foreground font-mono">{edu.duration}</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-light">{edu.institution} • GPA {edu.gpa}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Snapshot Item: Work Experience */}
              <div className="border border-border rounded-xl bg-card/40 overflow-hidden">
                <button
                  onClick={() => setExpandedSnapshot(expandedSnapshot === 'experience' ? null : 'experience')}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Briefcase size={14} className="text-muted-foreground" /> Experience & Internships</span>
                  {expandedSnapshot === 'experience' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {expandedSnapshot === 'experience' && (
                  <div className="p-4 pt-0 border-t border-border/50 bg-muted/10 space-y-4">
                    {analysisResult.parsed_data.experience.map((exp, i) => (
                      <div key={i} className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-foreground">{exp.role} <span className="text-muted-foreground font-normal">at {exp.company}</span></h4>
                          <span className="text-[10px] text-muted-foreground font-mono">{exp.duration}</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-[11px] pl-1 font-light">
                          {exp.highlights.map((high, hIdx) => <li key={hIdx}>{high}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Snapshot Item: Projects */}
              <div className="border border-border rounded-xl bg-card/40 overflow-hidden">
                <button
                  onClick={() => setExpandedSnapshot(expandedSnapshot === 'projects' ? null : 'projects')}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Award size={14} className="text-muted-foreground" /> Key Projects</span>
                  {expandedSnapshot === 'projects' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {expandedSnapshot === 'projects' && (
                  <div className="p-4 pt-0 border-t border-border/50 bg-muted/10 space-y-4">
                    {analysisResult.parsed_data.projects.map((proj, i) => (
                      <div key={i} className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-foreground">{proj.title}</h4>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-light leading-relaxed">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded bg-card text-muted-foreground border border-border">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Snapshot Item: Certifications */}
              <div className="border border-border rounded-xl bg-card/40 overflow-hidden">
                <button
                  onClick={() => setExpandedSnapshot(expandedSnapshot === 'certs' ? null : 'certs')}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Trophy size={14} className="text-muted-foreground" /> Certifications</span>
                  {expandedSnapshot === 'certs' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {expandedSnapshot === 'certs' && (
                  <div className="p-4 pt-0 border-t border-border/50 bg-muted/10 space-y-2">
                    {analysisResult.parsed_data.certifications.map((cert, i) => (
                      <div key={i} className="text-[11px] text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
