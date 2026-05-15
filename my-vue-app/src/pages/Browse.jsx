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
    const message = `Hi, I want to buy ${agent.name} for ${agent.price}`;
    const phoneNumber = "201018168377"; // رقمك أنت

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
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

            {a.image && (
              <img src={a.image} style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px"
              }} />
            )}

            <h2>{a.name}</h2>
            <p style={{ color: "#94a3b8" }}>{a.desc}</p>
            <p>💰 {a.price}</p>

            <button
              onClick={() => handleBuy(a)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                background: "#3b82f6",
                border: "none",
                borderRadius: "10px",
                color: "white",
                cursor: "pointer"
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