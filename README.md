# Supplier Compliance Monitor & Insights Dashboard

This is a full-stack web application that enables procurement teams to:

- Track supplier compliance based on contract terms.
- Upload and analyze compliance records using **Gemini AI**.
- View AI-generated insights and improvement suggestions.
- Use a clean React frontend with modular components.

---

##  Tech Stack

- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Pydantic
- **AI Integration**: Google Gemini 
- **Frontend**: React.js (with Axios)
- **Docs**: Swagger (OpenAPI)  + ReDoc

---

##View Documentation : 

 - localhost:8000/docs
 - localhost:8000/redoc

##  Project Structure
supplier-compliance-dashboard/
├── app/ # FastAPI backend
│ ├── main.py # App init + CORS + metadata
│ ├── models.py # SQLAlchemy models
│ ├── schemas.py # Pydantic request/response schemas
│ ├── crud.py # DB operations
│ ├── database.py # PostgreSQL connection
│ ├── gemini_utils.py # Gemini API calls
│ └── routers/
│     └── suppliers.py # API endpoints
├── frontend/ # React app
│     └── src/components/ # UI Components (AddSupplier, Insights, etc.)

---

## ⚙️ Backend Setup (FastAPI + PostgreSQL + Gemini)

### 1. Clone and navigate:

```bash

cd supplier-dashboard

python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt  #install dependencies

DATABASE_URL=postgresql://username:password@localhost:5432/database_name
GEMINI_API_KEY=your_google_gemini_api_key

uvicorn app.main:app --reload  #start server, supplier-compliance-dashboard/
 
```
## ⚙️ Frontend Setup (Reactjs + axios)

```bash

cd frontend #navigate to frontend folder

npm install # install dependencies

npm run start

```

## Key Features
- View all suppliers

- View supplier by ID

- Add new suppliers

- Upload compliance data

- Get Gemini-powered compliance insights