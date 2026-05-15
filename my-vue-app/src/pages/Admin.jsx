import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Admin() {
  const [agents, setAgents] = useState([]);
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);

  const ADMIN_PASS = "1234"; // غيرها براحتك

  useEffect(() => {
    if (logged) {
      fetchAgents();
    }
  }, [logged]);

  const fetchAgents = async () => {
    const { data } = await supabase.from("agents").select("*");
    setAgents(data || []);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASS) {
      setLogged(true);
    } else {
      alert("❌ Wrong Password");
    }
  };

  // لو مش مسجل دخول
  if (!logged) {
    return (
      <div style={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}>
        <div>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", marginTop: "10px" }}
          />
          <br />
          <button onClick={handleLogin} style={{
            marginTop: "10px",
            padding: "10px",
            background: "#3b82f6",
            border: "none",
            color: "white"
          }}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1>👑 Admin Panel</h1>

      {agents.map((a) => (
        <div key={a.id} style={{
          background: "#1e293b",
          padding: "15px",
          marginTop: "10px",
          borderRadius: "10px"
        }}>
          <h3>{a.name}</h3>
          <p>{a.desc}</p>
          <p>💰 {a.price}</p>

          {/* هنا المهم */}
          <p>👤 Seller: {a.seller_name}</p>
          <p>📞 Phone: {a.phone}</p>
        </div>
      ))}
    </div>
  );
}