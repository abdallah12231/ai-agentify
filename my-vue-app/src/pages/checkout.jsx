import { useState, useEffect } from "react";

export default function Checkout() {

  const [agent, setAgent] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedAgent"));
    setAgent(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userPhone || !screenshot) {
      alert("املأ البيانات");
      return;
    }

    alert("✅ تم استلام طلبك، هنبعتلك الملف قريب");
  };

  if (!agent) return <h2 style={{color:"white"}}>Loading...</h2>;

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

        <p>Product: {agent.name}</p>
        <p>Price: {agent.price}</p>

        <hr />

        <p>حول الفلوس على الرقم:</p>
        <h3 style={{ color: "#3b82f6" }}>01018168377</h3>

        <input
          placeholder="رقمك اللي حولت منه"
          value={userPhone}
          onChange={(e)=>setUserPhone(e.target.value)}
          style={input}
        />

        <p>📸 صورة التحويل</p>
        <input
          type="file"
          onChange={(e)=>setScreenshot(e.target.files[0])}
        />

        <button style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "10px",
          color: "white"
        }}>
          Confirm Payment
        </button>

      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "none"
};