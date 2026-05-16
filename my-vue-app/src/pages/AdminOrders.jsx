import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 Approve + إضافة لينك المنتج
  const approveOrder = async (order) => {
    const fileUrl = prompt("🔥 حط لينك الملف للعميل:");

    if (!fileUrl) return;

    const { error } = await supabase
      .from("orders")
      .update({
        status: "approved",
        file_url: fileUrl
      })
      .eq("id", order.id);

    if (error) {
      alert(error.message);
    } else {
      alert("✅ تم الموافقة وإضافة الملف");
      fetchOrders();
    }
  };

  const rejectOrder = async (id) => {
    await supabase
      .from("orders")
      .update({ status: "rejected" })
      .eq("id", id);

    fetchOrders();
  };

  return (
    <div style={{
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>🛠 Admin Orders</h1>

      {orders.map((o) => (
        <div key={o.id} style={{
          background: "#1e293b",
          padding: "20px",
          marginTop: "15px",
          borderRadius: "10px"
        }}>
          <h3>{o.agent_name}</h3>
          <p>💰 {o.price}</p>
          <p>📞 {o.phone}</p>
          <p>📌 Status: {o.status}</p>

          {o.screenshot_url && (
            <img
              src={o.screenshot_url}
              alt=""
              style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => approveOrder(o)}
              style={btnApprove}
            >
              Approve ✅
            </button>

            <button
              onClick={() => rejectOrder(o.id)}
              style={btnReject}
            >
              Reject ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const btnApprove = {
  padding: "8px 15px",
  background: "#22c55e",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const btnReject = {
  padding: "8px 15px",
  background: "#ef4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};