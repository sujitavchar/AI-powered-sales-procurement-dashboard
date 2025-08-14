from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import date

class SupplierBase(BaseModel):
    name: str
    country: str
    contract_terms: Dict[str, str]
    compliance_score: int
    last_audit: date

class SupplierCreate(SupplierBase):
    pass

class Supplier(SupplierBase):
    id: int
    class Config:
        orm_mode = True

class ComplianceRecordCreate(BaseModel):
    supplier_id: int
    metric: str
    date_recorded: date
    result: str
    status: str
