import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Pay() { // <-- تأكد إن السطر ده مكتوب كدة بالظبط
  const [agent, setAgent] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedAgent"));
    setAgent(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 CLICKED");

    if (!userPhone || !screenshot) {
      alert("املأ البيانات");
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 start");

      // test insert بس (من غير upload) عشان نعزل المشكلة
      const { error } = await supabase
        .from("orders")
        .insert([
          {
            phone: userPhone,
            agent_name: "test",
            price: "100"
          }
        ]);

      if (error) {
        console.log("❌ DB ERROR:", error);
        alert(error.message);
        return;
      }

      alert("✅ اشتغل وجدول الـ Database سليم!");

    } catch (err) {
      console.log("❌ CATCH:", err);
      alert("error");
    } finally {
      setLoading(false);
    }
  };

  if (!agent) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#1e293b",
        padding: "30px",
        borderRadius: "15px",
        width: "320px"
      }}>
        <h2>💰 Payment Test</h2>

        <p>Product: <strong>{agent.name}</strong></p>
        <p>Price: <strong>{agent.price}</strong></p>

        <p>حول على:</p>
        <h3 style={{ color: "#3b82f6" }}>01018168377</h3>

        <input
          placeholder="رقمك"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          style={input}
        />

        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setScreenshot(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && <img src={preview} style={{ width: "100%", marginTop: "10px" }} />}

        <button type="submit" disabled={loading} style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          background: loading ? "#475569" : "#3b82f6",
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer"
        }}>
          {loading ? "جاري التجربة..." : "Confirm Test"}
        </button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "none"
};