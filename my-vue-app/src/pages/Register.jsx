import { useState } from "react";
import { supabase } from "../supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("✅ تم إنشاء الحساب");
      window.location.href = "/choose-role";
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleRegister} style={box}>
        <h1>🚀 Create Account</h1>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} style={input}/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} style={input}/>

        <button style={btn}>Register</button>
      </form>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const box = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "15px",
  color: "white",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
};