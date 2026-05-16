import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user.id;

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId);

      setOrders(data || []);
    };

    load();
  }, []);

  return (
    <div style={{
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>📦 طلباتي</h1>

      {orders.map((o) => (
        <div key={o.id} style={{
          background: "#1e293b",
          padding: "20px",
          marginTop: "15px",
          borderRadius: "10px"
        }}>
          <h3>{o.agent_name}</h3>
          <p>💰 {o.price}</p>
          <p>📌 الحالة: {o.status}</p>

          {o.status === "approved" && o.file_url && (
            <a href={o.file_url} target="_blank">
              <button style={downloadBtn}>
                Download 🔥
              </button>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

const downloadBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer"
};