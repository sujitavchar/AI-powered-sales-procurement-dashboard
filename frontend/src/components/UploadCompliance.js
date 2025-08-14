import { useState } from "react";
import api from "../api";
import ReactMarkdown from "react-markdown";


function UploadCompliance() {
  const [records, setRecords] = useState([
    {
      supplier_id: "",
      metric: "",
      date_recorded: "",
      result: "",
      status: "compliant"
    }
  ]);

  const [msg, setMsg] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...records];
    updated[index][name] = value;
    setRecords(updated);
  };

  const addRecord = () => {
    setRecords([
      ...records,
      {
        supplier_id: "",
        metric: "",
        date_recorded: "",
        result: "",
        status: "compliant"
      }
    ]);
  };

  const removeRecord = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cleaned = records.map((r) => ({
        ...r,
        supplier_id: parseInt(r.supplier_id)
      }));
      const res = await api.post("/suppliers/check-compliance", cleaned);
      setAnalysis(res.data.analysis || res.data);
      setMsg("✅ Analysis completed successfully.");
    } catch (err) {
      setMsg("❌ Error submitting compliance data.");
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="container">
      <h2>Upload Compliance Records</h2>

      {records.map((r, i) => (
        <div key={i} className="supplier-card">
          <label>Supplier ID</label>
          <input name="supplier_id" type="number" value={r.supplier_id} onChange={(e) => handleChange(i, e)} />

          <label>Metric</label>
          <input name="metric" value={r.metric} onChange={(e) => handleChange(i, e)} />

          <label>Date</label>
          <input name="date_recorded" type="date" value={r.date_recorded} onChange={(e) => handleChange(i, e)} />

          <label>Result</label>
          <input name="result" value={r.result} onChange={(e) => handleChange(i, e)} />

          <label>Status</label>
          <select name="status" value={r.status} onChange={(e) => handleChange(i, e)}>
            <option value="compliant">Compliant</option>
            <option value="non-compliant">Non-Compliant</option>
            <option value="non-compliant">Pass</option>
            <option value="non-compliant">Fail</option>
          </select>

          {records.length > 1 && (
            <button onClick={() => removeRecord(i)} style={{ background: "red", marginTop: "8px" }}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button onClick={addRecord}>+ Add Another Record</button>
      <br />
      <button onClick={handleSubmit}>✅ Submit to Analyze</button>
      {loading && <p style={{ color: "blue" }}>⏳ Analysing data, please wait ...</p>}


      {msg && <p>{msg}</p>}

      {analysis && (
        <div className="supplier-card">
          <h3>AI Analysis Result:</h3>
          {analysis?.summary && (
            <div className="supplier-card">
                <h3>AI Analysis Result:</h3>
                <ReactMarkdown>{analysis.summary}</ReactMarkdown>
            </div>
            )}

        </div>
      )}
    </div>
  );
}

export default UploadCompliance;
