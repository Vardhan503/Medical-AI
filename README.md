# Clawback AI: Fraud Investigator Copilot 🛡️⚖️

### *Bridging the gap between messy whistleblower evidence and hard federal spending data.*

---

## 📖 1. Background & Motivation
The **False Claims Act** allows private citizens to sue entities defrauding the government. However, fraud investigators are often overwhelmed by unstructured "tips"—messy PDFs, handwritten notes, and fragmented emails. Proving these claims requires cross-referencing this evidence against massive federal datasets, which usually takes months of manual auditing.

**Clawback AI** reduces this investigation time from months to minutes by combining **AI-powered entity extraction** with **high-performance analytical queries** against the official CMS Medicaid spending dataset.

---

## 🚀 2. Core Features
- **📥 Smart Ingestion**: Upload whistleblower PDFs. The system uses AI (Nvidia NIM) to extract Provider NPIs, names, and suspicious medical procedure codes (HCPCS).
- **📊 Statistical Verification**: Automatically queries a **3.7GB Medicaid Spending Dataset** using **DuckDB**. It calculates national averages and identifies providers whose billing patterns are statistical outliers (Z-scores).
- **📝 Automated Filing**: Generates a one-click **draft False Claims Act legal complaint**, citing both the whistleblower evidence and the mathematical anomalies found in the federal data.

---

## 🛠️ 3. Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion (Premium Animations).
- **Backend**: Python FastAPI.
- **Data Engine**: **DuckDB** (Processing millions of rows of CMS Medicaid data in milliseconds).
- **AI/LLM**: **Nvidia NIM (Llama 3)** for OCR extraction and legal synthesis.
- **Storage**: CMS Medicaid Provider Spending by HCPCS (2018-2024).

---

## 📂 4. Project Structure
- `backend/`: FastAPI server and DuckDB analytics logic.
  - `data/`: Contains the 3.7GB Medicaid DuckDB database.
  - `database.py`: High-performance analytical query engine.
  - `main.py`: API endpoints for upload and analysis.
- `frontend/`: Premium Next.js investigator dashboard.
  - `src/components/`: Modular UI for analysis cards, upload zones, and draft previews.

---

## 🏁 5. Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Setup Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Add AI Key
Create a `.env` file in the `backend/` directory:
```env
NVIDIA_NIM_API_KEY=your_nvidia_api_key_here
```

---

## ⚖️ 6. Mission & Impact
Medicaid fraud drains billions from the US healthcare system every year. **Clawback AI** empowers whistleblowers and government investigators with "Mathematical Evidence," making it harder for fraudulent providers to hide in the noise of massive datasets.

---
*Created for the 2026 Medical AI Hackathon.*