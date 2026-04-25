# Clawback AI: Fraud Investigator Copilot 🛡️⚖️

> **"Turning months of manual auditing into 60 seconds of automated evidence."**

---

## 🌟 1. Introduction
**Clawback AI** is a state-of-the-art investigative platform designed to identify healthcare fraud at scale. By combining **Nvidia NIM-powered AI** with a massive **238-million-row** federal spending database, we empower whistleblowers and government agencies to verify fraud claims with mathematical precision.

## 💡 2. Motivation: The $100 Billion Problem
Every year, the US loses an estimated **$100 Billion** to Medicare and Medicaid fraud. 
*   **The Bottleneck**: The **False Claims Act** allows citizens to report fraud, but investigators are buried under thousands of messy whistleblower tips (PDFs, notes, emails). 
*   **The Data Gap**: Cross-referencing these tips against trillions of dollars in federal spending records currently takes months of manual auditing.

**Clawback AI was built to automate this gap.** We turn unstructured whistleblower evidence into "Smoking Gun" mathematical proof in seconds.

---

## 🚀 3. Core Features (The Triple-Threat Workflow)

### 📥 Step 1: Smart Ingestion (Nvidia NIM)
The user uploads a whistleblower document. We use **Nvidia NIM (Llama 3)** to perform high-accuracy entity extraction, pulling out:
*   Provider NPIs (National Provider Identifiers)
*   Suspicious HCPCS (Medical Procedure) Codes

### 📊 Step 2: Industrial-Scale Analysis (DuckDB)
The system instantly queries our local **3.7GB DuckDB database**, which contains **238 Million rows** of CMS Medicaid spending data totaling **$21 Trillion**. 
*   **Instant Verification**: We compare the provider’s specific billing rates against the national average in milliseconds.
*   **Anomaly Detection**: We calculate a **Z-Score** to show exactly how much of a statistical outlier the provider is.

### 📝 Step 3: Automated Legal Filing
If an anomaly is confirmed, our AI synthesizes a **Draft False Claims Act (FCA) Complaint**. This document automatically cites the whistleblower evidence alongside the mathematical evidence from federal data, ready for legal review.

---

## 🛠️ 4. Tech Stack
- **AI Engine**: **Nvidia NIM (Llama 3)** for OCR extraction and legal synthesis.
- **Data Engine**: **DuckDB** (Processing millions of rows of CMS Medicaid data in milliseconds).
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion (Premium Animations).
- **Backend**: Python FastAPI.
- **Storage**: CMS Medicaid Provider Spending by HCPCS (2018-2024).

---

## 📂 5. Project Structure
- `backend/`: FastAPI server and DuckDB analytics logic.
  - `data/`: Contains the 3.7GB Medicaid DuckDB database (**238M rows**).
  - `database.py`: High-performance analytical query engine.
  - `main.py`: API endpoints for upload and analysis.
- `frontend/`: Premium Next.js investigator dashboard.
  - `src/components/`: Modular UI for analysis cards, upload zones, and draft previews.

---

## 🏁 6. Getting Started

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

# 🚀 Project Setup & Overview

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Configuration

Create a `.env` file in the `backend/` directory and add your API key:

```env
NVIDIA_NIM_API_KEY=your_nvidia_api_key_here
```

---

## ⚖️ Mission & Impact

This project was developed for the **2026 Medical AI Hackathon** with the goal of transforming fraud detection in healthcare.

### ⏱️ Efficiency

* Reduced fraud tip verification time from **~90 days to under 60 seconds**

### 📊 Scale

* Designed to process **entire national Medicaid spending data (2018–2024)**

### 💰 Clawback Potential

* Enables government agencies to:

  * Recover stolen funds
  * Strengthen the integrity of the **U.S. healthcare system**

---

## 🏆 Hackathon

Built as part of the **2026 Medical AI Hackathon**, focusing on real-world impact through AI-driven solutions in healthcare.
