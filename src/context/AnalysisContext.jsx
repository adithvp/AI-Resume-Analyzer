import React, { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext();

const initialMockResult = {
  ats_score: 84,
  strengths: [
    "Expert level Python skills with 4+ years of development experience",
    "Solid production-grade experience building and deploying machine learning pipelines",
    "Strong background in LLMs, LangChain, and RAG architectures",
    "Excellent academic standing with B.S. in Computer Science (GPA 3.8/4.0)"
  ],
  weaknesses: [
    "Lack of clear cloud deployment (AWS/GCP/Azure) evidence in projects",
    "Missing containerization skills like Docker or Kubernetes in resume structure",
    "Limited quantified business impact metrics across project descriptions"
  ],
  improvements: [
    "Add AWS/GCP architecture details to current project descriptions (Priority: High, Est Gain: +8 pts)",
    "Quantify work experience, e.g. 'Improved model inference latency by 35%' (Priority: High, Est Gain: +12 pts)",
    "Integrate Docker and Kubernetes under skills and describe deployment pipeline (Priority: Medium, Est Gain: +6 pts)",
    "Specify vector databases like Pinecone or ChromaDB in Technical Skills section (Priority: Low, Est Gain: +4 pts)"
  ],
  recommended_roles: [
    {
      "role": "AI Engineer",
      "confidence": 95,
      "reason": "Highly aligned due to practical projects in RAG systems, LLM fine-tuning, and Langchain/Gemini integration."
    },
    {
      "role": "Machine Learning Engineer",
      "confidence": 88,
      "reason": "Strong mathematical base and Python toolkit, with experience in model training, PyTorch, and dataset curation."
    },
    {
      "role": "Backend Developer",
      "confidence": 82,
      "reason": "Proficient in Python, FastAPI, database integrations, RESTful APIs, and microservices architecture."
    }
  ],
  parsed_data: {
    "summary": "Innovative and results-driven Software Engineer specialized in AI/ML architectures, large language model implementations, and scalable web solutions. Passionate about building intelligent systems that solve complex real-world challenges.",
    "skills": ["Python", "JavaScript", "React", "PyTorch", "TensorFlow", "FastAPI", "PostgreSQL", "LangChain", "Git", "SQL", "HTML5/CSS3", "Vector Databases (Pinecone)"],
    "education": [
      {
        "degree": "B.S. in Computer Science",
        "institution": "Stanford University",
        "gpa": "3.8/4.0",
        "duration": "2020 - 2024"
      }
    ],
    "experience": [
      {
        "role": "AI Developer Intern",
        "company": "TechInnovate Solutions",
        "duration": "Summer 2023",
        "highlights": [
          "Developed automated document summary workflows using LangChain and Gemini API.",
          "Optimized prompt engineering structures, reducing LLM token consumption and costs by 22%.",
          "Collaborated with senior engineers to implement semantic search engine for enterprise document store."
        ]
      },
      {
        "role": "Software Engineering Fellow",
        "company": "OpenSource Foundation",
        "duration": "Spring 2022",
        "highlights": [
          "Contributed features to PyTorch ecosystem documentation and utility modules.",
          "Designed clean API wrappers for model diagnostics, improving community developer speed by 15%."
        ]
      }
    ],
    "projects": [
      {
        "title": "DocuBot - Intelligent RAG Application",
        "description": "A high-performance retrieval augmented generation system parsing 10,000+ PDFs in real-time, matching semantic similarity using Pinecone.",
        "technologies": ["React", "FastAPI", "Pinecone", "Gemini Pro", "Framer Motion"]
      },
      {
        "title": "VisionFlow - Realtime Object Classifier",
        "description": "Computer vision dashboard processing live video streams at 45fps, utilizing custom YOLO models trained on Edge AI platforms.",
        "technologies": ["Python", "OpenCV", "TensorFlow", "WebSocket"]
      }
    ],
    "certifications": [
      "Google Cloud Certified Associate Cloud Engineer",
      "DeepLearning.AI TensorFlow Developer Professional Certificate"
    ]
  },
  job_match: {
    "match_score": 78,
    "matching_skills": ["Python", "FastAPI", "React", "LangChain", "PostgreSQL"],
    "missing_skills": ["Docker", "AWS", "Kubernetes", "CI/CD Pipelines", "Redis"],
    "role_strengths": "Demonstrates excellent understanding of LLM integration, API development, React UI design, and vector databases.",
    "role_weaknesses": "Lacks production cloud infrastructure (AWS/GCP), containerization, caching (Redis), and automated test-coverage metrics.",
    "recommendations": [
      "Add a Dockerfile and docker-compose.yml configuration to your DocuBot project.",
      "Deploy your FastAPI backend on AWS EC2 or ECS, and document the architecture.",
      "Set up GitHub Actions to run automated testing on commits."
    ]
  }
};

export const AnalysisProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState({ name: 'Resume.pdf', size: '2.4 MB' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(initialMockResult);
  const [jobDescription, setJobDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(5); // 1-5 progress step

  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hi there! I am your AI Career Assistant. I have analyzed your resume. Feel free to ask me questions like "Why is my ATS score low?", "How can I become an AI Engineer?", or "What skills are missing?"'
    }
  ]);

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setJobDescription('');
    setChatHistory([
      {
        id: 1,
        sender: 'ai',
        text: 'Hi there! I am your AI Career Assistant. I have analyzed your resume. Feel free to ask me questions like "Why is my ATS score low?", "How can I become an AI Engineer?", or "What skills are missing?"'
      }
    ]);
  };

  return (
    <AnalysisContext.Provider value={{
      uploadedFile,
      setUploadedFile,
      isAnalyzing,
      setIsAnalyzing,
      analysisResult,
      setAnalysisResult,
      jobDescription,
      setJobDescription,
      currentStep,
      setCurrentStep,
      chatHistory,
      setChatHistory,
      resetAnalysis,
      initialMockResult
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
