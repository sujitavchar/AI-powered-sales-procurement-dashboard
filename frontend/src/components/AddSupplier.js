import { useState } from "react";
import api from "../api";

function AddSupplier() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    compliance_score: "",
    last_audit: "",
    contract_terms: '{"delivery_time": "30", "quality_standard": "ISO9001" ,"discount": "5%"}'
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        compliance_score: parseInt(form.compliance_score),
        contract_terms: JSON.parse(form.contract_terms)
      };
      await api.post("/suppliers", payload);
      setMsg("Supplier added successfully!");
    } catch (err) {
      setMsg("Failed to add supplier");
    }
  };

  return (
    <div className="container">
      <h2>Add New Supplier</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="country" placeholder="Country" onChange={handleChange} />
      <input name="compliance_score" placeholder="Compliance Score" onChange={handleChange} />
      <input name="last_audit" placeholder="Last Audit (YYYY-MM-DD)" onChange={handleChange} />
      <textarea name="contract_terms" placeholder="Contract Terms (JSON)" onChange={handleChange} value={form.contract_terms} />
      <button onClick={handleSubmit}>Add Supplier</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default AddSupplier;
