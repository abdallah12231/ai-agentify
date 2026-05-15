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
      alert("املأ البيانات");
      return;
    }

    setLoading(true);

    try {
      const fileExt = screenshot.name.split('.').pop();
      const fileName = Date.now() + "." + fileExt;
      const filePath = `screenshots/${fileName}`;

      // upload image
      const { error: storageError } = await supabase.storage
        .from('agentify')
        .upload(filePath, screenshot);

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from('agentify')
        .getPublicUrl(filePath);

      // save order
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

      alert("✅ تم إرسال الطلب");

      setUserPhone("");
      setScreenshot(null);
      setPreview(null);

    } catch (err) {
      alert("❌ Error: " + err.message);
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
        <h2>💰 Payment</h2>

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

        <button style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "10px",
          color: "white"
        }}>
          Confirm
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