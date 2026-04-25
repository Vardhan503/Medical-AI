# Clawback AI: Fraud Investigator Copilot

Clawback AI is a fraud investigator copilot that identifies Medicaid fraud by cross-referencing whistleblower evidence with federal spending data.

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Medicaid Spending Dataset (already located in `backend/data/medicaid-provider-spending.duckdb`)

### Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```
The backend will run on `http://localhost:8000`.

### Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** FastAPI, DuckDB, PyMuPDF.
- **AI:** Nvidia NIM (Llama 3) for extraction and synthesis (placeholder implemented).
- **Data:** CMS Medicaid Provider Spending by HCPCS (3.7GB DuckDB).

## 📂 Project Structure
- `backend/`: FastAPI server and database logic.
  - `data/`: Contains the DuckDB database.
  - `main.py`: API endpoints.
  - `database.py`: DuckDB query engine.
- `frontend/`: Next.js dashboard.
  - `src/components/`: Reusable UI components.
  - `src/app/`: App router pages.

## ⚖️ License
This project is licensed under the MIT License.