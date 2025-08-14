import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SupplierList from "./components/SupplierList";
import SupplierDetails from "./components/SupplierDetails";
import AddSupplier from "./components/AddSupplier";
import UploadCompliance from "./components/UploadCompliance";
import InsightsDashboard from "./components/InsightsDashboard";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Supplier Compliance Dashboard</h1>
        <nav>
          <Link to="/">All Suppliers</Link> |{" "}
          <Link to="/details">Supplier Details</Link> |{" "}
          <Link to="/add">Add Supplier</Link> |{" "}
          <Link to="/upload">Upload Compliance</Link> |{" "}
          <Link to="/insights">Insights</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SupplierList />} />
          <Route path="/details" element={<SupplierDetails />} />
          <Route path="/add" element={<AddSupplier />} />
          <Route path="/upload" element={<UploadCompliance />} />
          <Route path="/insights" element={<InsightsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
