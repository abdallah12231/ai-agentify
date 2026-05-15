import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Checkout() {
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

    if (!userPhone || !screenshot) {
      alert("برجاء إدخال رقم الهاتف وإرفاق صورة التحويل");
      return;
    }

    setLoading(true);

    try {
      // اسم فريد للصورة
      const fileExt = screenshot.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `screenshots/${fileName}`;

      // رفع الصورة
      const { error: storageError } = await supabase.storage
        .from('agentify')
        .upload(filePath, screenshot);

      if (storageError) throw storageError;

      // رابط الصورة
      const { data: { publicUrl } } = supabase.storage
        .from('agentify')
        .getPublicUrl(filePath);

      // حفظ الطلب
      const { error: dbError } = await supabase
        .from('orders')
        .insert([
          {
            phone: userPhone,
            agent_name: agent.name,
            price: agent.price,
            screenshot_url: publicUrl,
            status: 'pending'
          }
        ]);

      if (dbError) throw dbError;

      alert("✅ تم استلام طلبك بنجاح");

      setUserPhone("");
      setScreenshot(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
      alert("❌ حصل خطأ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!agent) return <h2 style={{ color: "white", padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#020617,#0f172a)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "rgba(255,255,255,0.05)",
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(20px)",
        width: "340px"
      }}>

        <h2 style={{ marginBottom: "15px" }}>💰 Payment</h2>

        <p>Product: <strong>{agent.name}</strong></p>
        <p>Price: <strong>{agent.price}</strong></p>

        <hr style={{ opacity: 0.2, margin: "15px 0" }} />

        <p style={{ fontSize: "14px" }}>حول الفلوس على الرقم:</p>
        <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>
          01018168377
        </h3>

        <input
          placeholder="رقمك اللي حولت منه"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          style={inputStyle}
          disabled={loading}
        />

        <p style={{ fontSize: "14px" }}>📸 صورة التحويل</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setScreenshot(file);
            setPreview(URL.createObjectURL(file));
          }}
          disabled={loading}
        />

        {/* 🔥 Preview */}
        {preview && (
          <img
            src={preview}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginTop: "10px"
            }}
          />
        )}

        <button 
          type="submit"
          disabled={loading}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "12px",
            background: loading ? "#475569" : "#3b82f6",
            border: "none",
            borderRadius: "12px",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "جاري الإرسال..." : "Confirm Payment"}
        </button>

      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #475569",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none"
};