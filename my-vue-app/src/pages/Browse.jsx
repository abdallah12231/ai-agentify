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
    const phoneNumber = "201018168377";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div style={{ padding: "40px", background: "#0f172a", color: "white" }}>
      <h1>Browse Agents</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {agents.map((a) => (
          <div key={a.id} style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px"
          }}>

            {a.image && <img src={a.image} style={{ width: "100%" }} />}

            <h3>{a.name}</h3>
            <p>{a.desc}</p>
            <p>💰 {a.price}</p>

            <button onClick={() => handleBuy(a)}>
              Buy Now
            </button>

            <a href={a.file_url} target="_blank">
              <button>Download</button>
            </a>

          </div>
        ))}
      </div>
    </div>
  );
}