import { useState } from "react";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/choose-role";
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={box}>
        <h1 style={{ marginBottom: "20px" }}>🔥 Welcome Back</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={btn}>Login</button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          معندكش حساب؟{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => (window.location.href = "/register")}
          >
            اعمل حساب
          </span>
        </p>
      </form>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const box = {
  background: "#1e293b",
  padding: "40px",
  borderRadius: "20px",
  width: "320px",
  color: "white",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "none",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#3b82f6",
  border: "none",
  borderRadius: "10px",
  color: "white",
  marginTop: "10px",
  cursor: "pointer",
};