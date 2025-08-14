import { useState } from "react";
import api from "../api";

function SupplierDetails() {
  const [id, setId] = useState("");
  const [supplier, setSupplier] = useState(null);
  const [error, setError] = useState("");

  const fetchSupplier = async () => {
    try {
      const res = await api.get(`/suppliers/${id}`);
      setSupplier(res.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSupplier(null);
        setError("Supplier not found.");
        alert("❌ Supplier not found. Please check the ID.");
      } else {
        setError("Something went wrong.");
        alert("⚠️ Failed to fetch supplier details.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Supplier Details</h2>
      <input
        placeholder="Supplier ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={fetchSupplier}>Fetch</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {supplier && (
        <div className="supplier-card">
          <p><strong>Name:</strong> {supplier.name}</p>
          <p><strong>Country:</strong> {supplier.country}</p>
          <p><strong>Score:</strong> {supplier.compliance_score}</p>
          <p><strong>Contract Terms:</strong></p>
          <ul>
            <li>
              Delivery time:{" "}
              {supplier.contract_terms.delivery_days
                ? `${supplier.contract_terms.delivery_days} days`
                : supplier.contract_terms.delivery_time || "NA"}
            </li>
            <li>
              Quality Standard:{" "}
              {supplier.contract_terms.quality_standard || "NA"}
            </li>
            <li>
              Discount: {supplier.contract_terms.discount || "NA"}
            </li>
          </ul>
          <p><strong>Last Audit:</strong> {supplier.last_audit}</p>
        </div>
      )}
    </div>
  );
}

export default SupplierDetails;
