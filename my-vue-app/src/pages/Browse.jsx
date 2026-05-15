import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Browse() {
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
      <h1>Browse</h1>

      {agents.map((a) => (
        <div key={a.id} style={{ marginBottom: "20px" }}>
          <h2>{a.name}</h2>
          <p>{a.desc}</p>
          <p>{a.price}</p>

          {a.image && <img src={a.image} width="200" />}
        </div>
      ))}
    </div>
  );
}