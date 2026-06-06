import os
import io
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pypdf import PdfReader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

# Try to load environment variables from a local .env file if it exists
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

# Pydantic Schemas matching frontend requirements and prompt details
class RoleRecommendation(BaseModel):
    role: str = Field(description="Name of recommended role")
    confidence: int = Field(description="Confidence score 0-100 based on resume evidence")
    reason: str = Field(description="Reasoning detail for the recommendation")

class ParsedEducation(BaseModel):
    degree: str = Field(description="Degree or level of education")
    institution: str = Field(description="School/University name")
    gpa: str = Field(description="GPA achieved, or N/A if not listed")
    duration: str = Field(description="Year range or graduation date")

class ParsedExperience(BaseModel):
    role: str = Field(description="Job title/role name")
    company: str = Field(description="Employer company name")
    duration: str = Field(description="Dates or duration of employment")
    highlights: List[str] = Field(description="Key bulleted contributions and metrics")

class ParsedProject(BaseModel):
    title: str = Field(description="Project title")
    description: str = Field(description="Details on what was built and why")
    technologies: List[str] = Field(description="List of technologies used in the project")

class ParsedData(BaseModel):
    summary: str = Field(description="Professional summary or inferred statement")
    skills: List[str] = Field(description="List of technical skills and soft skills extracted")
    education: List[ParsedEducation] = Field(description="Education history")
    experience: List[ParsedExperience] = Field(description="Professional experience timeline")
    projects: List[ParsedProject] = Field(description="Featured personal or group projects")
    certifications: List[str] = Field(description="List of professional certifications")

class JobMatch(BaseModel):
    match_score: int = Field(description="Fit score 0-100 comparing resume with the target job description")
    matching_skills: List[str] = Field(description="List of skills that exist in both resume and JD")
    missing_skills: List[str] = Field(description="Required/preferred skills in JD that are missing on resume")
    role_strengths: str = Field(description="Strengths of candidate specifically for this role")
    role_weaknesses: str = Field(description="Gaps or weaknesses specifically for this role")
    recommendations: List[str] = Field(description="Actionable updates to improve the match score")

class ResumeAnalysisResult(BaseModel):
    ats_score: int = Field(description="ATS score between 0 and 100")
    strengths: List[str] = Field(description="Top resume strengths")
    weaknesses: List[str] = Field(description="Weaknesses reducing ATS score")
    improvements: List[str] = Field(description="Actionable recommendations formatted as: Description (Priority: High/Medium/Low, Est Gain: +X pts)")
    recommended_roles: List[RoleRecommendation] = Field(description="List of recommended career paths")
    parsed_data: ParsedData = Field(description="Parsed sections of the resume")
    job_match: Optional[JobMatch] = Field(default=None, description="Job description alignment metrics if JD was provided")

# Initialize FastAPI App
app = FastAPI(title="AI Resume Intelligence API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        pdf_file = io.BytesIO(file_bytes)
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse PDF file: {str(e)}")

@app.post("/api/analyze", response_model=ResumeAnalysisResult)
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(default="")
):
    # Validate file type
    filename = file.filename.lower()
    if not filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF resume files are currently supported for live parsing.")

    # Read bytes and extract text
    file_bytes = await file.read()
    resume_text = extract_text_from_pdf(file_bytes)
    
    if not resume_text:
        raise HTTPException(status_code=400, detail="The PDF file appears to be empty or image-only. Make sure it contains selectable text.")

    # Get Google API Key
    api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="Google GEMINI_API_KEY environment variable is not configured on the server."
        )

    # Initialize Langchain LLM
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.1,
            google_api_key="paste_your_api_key_here"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initialize Gemini LLM: {str(e)}")

    # Prompt template for analysis
    prompt_template = """You are an expert ATS Resume Analyzer, Technical Recruiter, Career Coach, and Hiring Manager with 15+ years of experience reviewing resumes across Software Engineering, AI/ML, Data Science, Cloud, DevOps, and IT domains.

Your task is to analyze a candidate's resume and provide a comprehensive evaluation against ATS standards and a target job description (if provided).
You must think from BOTH perspectives:
1. Applicant Tracking System (ATS)
2. Human Recruitersss-s

Target Job Description:
{job_description}

Resume Text:
{resume_text}

Format Instructions:
{format_instructions}

Please return the response as a single valid JSON block following the instructions exactly.
"""

    parser = PydanticOutputParser(pydantic_object=ResumeAnalysisResult)
    prompt = ChatPromptTemplate.from_template(prompt_template)
    
    chain = prompt | llm | parser

    try:
        result = chain.invoke({
            "job_description": job_description if job_description else "Not provided",
            "resume_text": resume_text,
            "format_instructions": parser.get_format_instructions()
        })
        return result
    except Exception as e:
        raise HTTPException(
            status_code=520, 
            detail=f"Gemini output parsing failed. Verify the API connection. Details: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
