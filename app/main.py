from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import suppliers
from app.database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="Supplier Compliance Monitor",
    description="Track supplier compliance and generate insights with Gemini AI",
    version="1.0.0"
)

#  CORS middleware to allow requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # all methods allowed
    allow_headers=["*"],  
)

app.include_router(suppliers.router)
