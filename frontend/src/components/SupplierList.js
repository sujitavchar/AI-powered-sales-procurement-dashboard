import { useEffect, useState } from "react";
import api from "../api";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    api.get("/suppliers").then((res) => setSuppliers(res.data));
  }, []);

  return (
    <div className="container">
      <h2>All Suppliers</h2>
      {suppliers.map((s) => (
        <div key={s.id} className="supplier-card">
           
          <p><strong>{s.name}</strong> </p>
          <p>Supplier id: {s.id}</p> 
          <p>Country : {s.country}</p>
          <p>Compliance Score: {s.compliance_score}</p>
          <p><strong>Contract Terms: </strong></p>
          <ul>
            <li>Delivery time: {
                s.contract_terms.delivery_days
                ? `${s.contract_terms.delivery_days} days`
                : `${s.contract_terms.delivery_time}`
            }</li>
            <li>Quality Standard: {s.contract_terms.quality_standard? s.contract_terms.quality_standard : "NA"}</li>
            <li>Discount: {s.contract_terms.discount}</li>
          </ul>
          <p>Last Audit: {s.last_audit}</p>
        </div>
      ))}
    </div>
  );
}

export default SupplierList;
