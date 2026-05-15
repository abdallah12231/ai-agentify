import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*");
    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  return (
    <div style={{ padding: "30px", background: "#0f172a", color: "white" }}>
      <h1>💰 Orders</h1>

      {orders.map((o) => (
        <div key={o.id} style={{
          background: "#1e293b",
          padding: "20px",
          marginBottom: "10px",
          borderRadius: "10px"
        }}>
          <h3>{o.agent_name}</h3>
          <p>{o.phone}</p>
          <p>{o.price}</p>
          <p>{o.status}</p>

          <img src={o.screenshot_url} style={{ width: "200px" }} />

          <button onClick={() => updateStatus(o.id, "approved")}>Approve</button>
          <button onClick={() => updateStatus(o.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}