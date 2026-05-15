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
    const message = `Hi, I want to buy ${agent.name}`;
    const phoneNumber = "201018168377";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div style={{
      padding: "40px",
      background: "linear-gradient(135deg, #020617, #0f172a)",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        🚀 Discover AI Agents
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "25px"
      }}>
        {agents.map((a) => (
          <div key={a.id} style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "20px",
            padding: "20px",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            transition: "0.3s"
          }}
          onMouseOver={(e)=> e.currentTarget.style.transform="scale(1.03)"}
          onMouseOut={(e)=> e.currentTarget.style.transform="scale(1)"}
          >

            <img src={a.image} style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              borderRadius: "15px",
              marginBottom: "15px"
            }} />

            <h2>{a.name}</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>{a.desc}</p>

            <p style={{
              marginTop: "10px",
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              💰 {a.price}
            </p>

            <button
              onClick={() => handleBuy(a)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "12px",
                background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                fontSize: "15px"
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