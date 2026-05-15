import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await supabase.from("agents").select("*");
      setAgents(data);
    };

    fetchAgents();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>🔥 Top Agents</h1>

      {agents.slice(0, 3).map((a) => (
        <div key={a.id}>
          <h3>{a.name}</h3>
          <p>{a.price}</p>
        </div>
      ))}
    </div>
  );
}