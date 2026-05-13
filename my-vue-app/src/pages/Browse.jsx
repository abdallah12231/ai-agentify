import { useEffect, useState } from "react";

export default function Browse() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("agents")) || [];
    setAgents(data);
  }, []);

  const handleBuy = (agent) => {
    const message = `Hi, I want to buy ${agent.name} for ${agent.price}`;
    const phoneNumber = "201018168377";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "40px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🚀 Browse AI Agents
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {agents.map((agent, index) => (
          <div key={index} style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)"
          }}>
            <h2>{agent.name}</h2>
            <p style={{ color: "#94a3b8" }}>{agent.desc}</p>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              💰 {agent.price}
            </p>

            <button
              onClick={() => handleBuy(agent)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                background: "#3b82f6",
                border: "none",
                borderRadius: "10px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}