import {  useState } from "react";
import api from "../api";

function InsightsDashboard() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("")


//Function to handle fetching insights
const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.get("/suppliers/insights");
      setInsights(res.data.insights || []);
      
      setMsg("✅ Analysis completed successfully.");
    } catch (err) {
      setMsg("⚠️Failed to load Insights");
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="container">
    <h2>AI-Powered Compliance Insights</h2>

    <button onClick={handleSubmit} style={{ background: "blue", marginTop: "8px" }}>
              Get Insights
            </button>
    
    {loading && <p>🤖 Loading Insights ... Please wait</p> }

    {msg && <p>{msg}</p>}


      {insights.map((insight, i) => (
        <div key={i} className="supplier-card">
          {insight.error && <p>{insight.error}</p>}
          {!insight.error && (
            <>
              <p><strong>Supplier:</strong> {insight.supplier}</p>
              <p><strong>Score:</strong> {insight.score}</p>
              <p><strong>Issues:</strong> {insight.issues?.join(", ")}</p>
              <p><strong>Recommendations:</strong></p>
              <ul>
                {insight.recommendations?.map((rec, j) => (
                  <li key={j}>{rec}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default InsightsDashboard;
