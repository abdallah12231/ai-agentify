import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(to right, #0f172a, #1e293b)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        🚀 AI Agent Marketplace
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Buy & Sell Powerful AI Agents Easily
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/browse">
          <button style={{
            padding: "12px 25px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer"
          }}>
            Browse Agents
          </button>
        </Link>

        <Link to="/upload">
          <button style={{
            padding: "12px 25px",
            background: "#22c55e",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer"
          }}>
            Sell Your Agent
          </button>
        </Link>
      </div>
    </div>
  );
}