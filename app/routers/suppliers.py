from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database, gemini_utils

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Get insights about all compliance records
@router.get("/suppliers/insights")
def get_compliance_insights(db: Session = Depends(get_db)):
    suppliers = crud.get_suppliers(db)
    insights = gemini_utils.generate_compliance_insights(suppliers)
    return {"insights": insights}

#Get list of all suppliers
@router.get("/suppliers", response_model=list[schemas.Supplier])
def read_suppliers(db: Session = Depends(get_db)):
    return crud.get_suppliers(db)


#Get supplier details by id
@router.get("/suppliers/{supplier_id}", response_model=schemas.Supplier)
def read_supplier(supplier_id: int, db: Session = Depends(get_db)):
    supplier = crud.get_supplier_by_id(db, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier


#Add new supplier
@router.post("/suppliers", response_model=schemas.Supplier)
def create_supplier(supplier: schemas.SupplierCreate, db: Session = Depends(get_db)):
    return crud.create_supplier(db, supplier)


#Get analysis of compliance records 
@router.post("/suppliers/check-compliance")
def check_compliance(records: list[schemas.ComplianceRecordCreate], db: Session = Depends(get_db)):
    # Store records
    for record in records:
        crud.add_compliance_record(db, record)
    
    # Call Gemini analysis
    analysis = gemini_utils.analyze_compliance_patterns(records)
    return {"analysis": analysis}


