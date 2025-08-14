from sqlalchemy import Column, Integer, String, Date, JSON, ForeignKey, Float
from app.database import Base

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    country = Column(String)
    compliance_score = Column(Integer)
    contract_terms = Column(JSON)
    last_audit = Column(Date)

class ComplianceRecord(Base):
    __tablename__ = "compliance_records"
    id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    metric = Column(String)
    date_recorded = Column(Date)
    result = Column(String)
    status = Column(String)
