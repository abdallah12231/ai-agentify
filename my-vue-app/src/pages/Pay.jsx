import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Pay() {
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
      alert("⚠️ رجاءً املأ جميع البيانات (الرقم وصورة التحويل)");
      return;
    }

    setLoading(true);

    try {
      const fileExt = screenshot.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName; // الرفع المباشر على الـ Root لتفادي مشاكل الفولدرات الفرعية

      // 1. رفع الصورة إلى الـ Storage bucket الحقيقي بتاعك
      const { error: storageError } = await supabase.storage
        .from('agents-files') // <-- تم التعديل لاسم الـ Bucket بتاعك المظبوط
        .upload(filePath, screenshot);

      if (storageError) throw storageError;

      // 2. جلب رابط الصورة المباشر بعد الرفع
      const { data: { publicUrl } } = supabase.storage
        .from('agents-files') // <-- تم التعديل لاسم الـ Bucket بتاعك المظبوط
        .getPublicUrl(filePath);

      // 3. حفظ بيانات الأوردر كاملة في جدول الـ orders
      const { error: dbError } = await supabase
        .from('orders')
        .insert([{
          phone: userPhone,
          agent_name: agent.name,
          price: agent.price,
          screenshot_url: publicUrl,
          status: "pending"
        }]);

      if (dbError) throw dbError;

      alert("✅ تم إرسال طلبك وصورة التحويل بنجاح!");

      // تصفير الفورم بعد النجاح
      setUserPhone("");
      setScreenshot(null);
      setPreview(null);

    } catch (err) {
      console.error("Error details:", err);
      alert("❌ خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!agent) return <h2 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>جاري التحميل...</h2>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#1e293b",
        padding: "30px",
        borderRadius: "15px",
        width: "340px",
        direction: "rtl" // عشان التنسيق العربي يظبط
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>💰 إتمام الدفع</h2>

        <div style={{ marginBottom: "15px", borderBottom: "1px solid #334155", paddingBottom: "10px" }}>
          <p>المنتج: <strong style={{ color: "#3b82f6" }}>{agent.name}</strong></p>
          <p>السعر: <strong style={{ color: "#10b981" }}>{agent.price} EGP</strong></p>
        </div>

        <div style={{ background: "#0f172a", padding: "10px", borderRadius: "10px", textAlign: "center", marginBottom: "15px" }}>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>قم بالتحويل على رقم فودافون كاش التالي:</p>
          <h3 style={{ color: "#3b82f6", margin: "5px 0", letterSpacing: "1px" }}>01018168377</h3>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>رقم الموبايل الذي قمت بالتحويل منه:</label>
          <input
            type="text"
            placeholder="01xxxxxxxxx"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>ارفع لقطة شاشة (Screenshot) للتحويل:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setScreenshot(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
            style={{ width: "100%", color: "#94a3b8" }}
          />
        </div>

        {preview && (
          <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "15px" }}>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "5px 0" }}>معاينة الصورة:</p>
            <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: "150px", objectFit: "contain", borderRadius: "8px" }} />
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          marginTop: "10px",
          width: "100%",
          padding: "12px",
          background: loading ? "#475569" : "#3b82f6",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s"
        }}>
          {loading ? "جاري إرسال الطلب..." : "تأكيد الدفع ✨"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  outline: "none",
  boxSizing: "border-box"
};