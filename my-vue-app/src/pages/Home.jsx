import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await supabase.from("agents").select("*");
      setAgents(data || []);
    };

    fetchAgents();
  }, []);

  return (
    <div style={{
      padding: "40px",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginBottom: "20px" }}>🔥 Top Agents</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {(agents || []).slice(0, 3).map((a) => (
          <div key={a.id} style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "10px"
          }}>
            {a.image && <img src={a.image} style={{ width: "100%", borderRadius: "10px" }} />}
            <h3>{a.name}</h3>
            <p>{a.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}