from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import data_engine
import fitz  # PyMuPDF
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional

load_dotenv()  # Load variables from .env

NVIDIA_NIM_API_KEY = os.getenv("NVIDIA_NIM_API_KEY")

class Anomaly(BaseModel):
    hcpcs: str
    z_score: float

class ComplaintRequest(BaseModel):
    npi: str
    anomalies: List[Anomaly] = []

app = FastAPI(title="Clawback AI API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Clawback AI API is running"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    # Save file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())
    
    try:
        # Extract text using PyMuPDF
        doc = fitz.open(temp_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        # In a real scenario, we'd use Nvidia NIM (Llama 3) here
        # For now, we use a regex-based extraction as a fallback
        import re
        extracted_npis = list(set(re.findall(r'\b\d{10}\b', text)))
        # HCPCS codes are often 5 digits or 1 letter + 4 digits
        extracted_codes = list(set(re.findall(r'\b[A-Z0-9]{5}\b', text)))
            
        return {
            "filename": file.filename,
            "extracted_npis": extracted_npis,
            "extracted_codes": extracted_codes,
            "raw_text_preview": text[:1000]
        }
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.get("/analyze/{npi}")
async def analyze_provider(npi: str):
    stats = data_engine.get_provider_stats(npi)
    if not stats:
        return {"npi": npi, "stats": [], "message": "No data found for this provider"}
    
    formatted_stats = []
    for row in stats:
        hcpcs, total_paid, total_claims, total_patients = row
        anomaly = data_engine.get_anomaly_stats(npi, hcpcs)
        
        # Simple anomaly flag: Z-score > 2
        z_score = anomaly[3] if anomaly and anomaly[3] is not None else 0
        
        formatted_stats.append({
            "hcpcs": hcpcs,
            "total_paid": total_paid,
            "total_claims": total_claims,
            "total_patients": total_patients,
            "avg_paid_per_line": anomaly[0] if anomaly else None,
            "national_avg": anomaly[1] if anomaly else None,
            "z_score": z_score
        })
        
    return {"npi": npi, "stats": formatted_stats}

@app.post("/generate-complaint")
async def generate_complaint(request: ComplaintRequest):
    npi = request.npi
    anomalies = request.anomalies
    
    # This would call Nvidia NIM to synthesize the draft
    # Placeholder for now
    hcpcs_list = [a.hcpcs for a in anomalies]
    max_z = max([a.z_score for a in anomalies] or [0])
    
    complaint_draft = f"""
    UNITED STATES DISTRICT COURT
    FOR THE DISTRICT OF [STATE]
    
    UNITED STATES OF AMERICA ex rel. [WHISTLEBLOWER],
    Plaintiff-Relator,
    
    v.
    
    PROVIDER NPI {npi},
    Defendant.
    
    COMPLAINT FOR VIOLATION OF THE FALSE CLAIMS ACT
    
    1. This is an action to recover treble damages and civil penalties on behalf of the United States...
    2. Defendant {npi} has engaged in systematic upcoding and fraudulent billing for HCPCS codes: {', '.join(hcpcs_list) if hcpcs_list else 'Multiple Codes'}.
    3. Data analysis reveals that Defendant's billing patterns are statistical outliers, with Z-scores as high as {max_z:.2f} compared to national averages.
    """
    return {"complaint_draft": complaint_draft}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
