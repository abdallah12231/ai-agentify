import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Browse() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await supabase.from("agents").select("*");
      setAgents(data || []);
    };

    fetchAgents();
  }, []);

  const handleBuy = (agent) => {
    localStorage.setItem("selectedAgent", JSON.stringify(agent));
    window.location.href = "/pay";
  };

  return (
    <div style={{
      padding: "40px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🚀 Browse AI Agents
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {agents.map((a) => (
          <div key={a.id} style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px"
          }}>
            <img src={a.image} style={{
              width: "100%",
              borderRadius: "10px"
            }} />

            <h2>{a.name}</h2>
            <p>{a.desc}</p>
            <p>💰 {a.price}</p>

            <button onClick={() => handleBuy(a)} style={{
              width: "100%",
              padding: "10px",
              background: "#3b82f6",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer"
            }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}