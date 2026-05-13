import { useState } from "react";

export default function Upload() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAgent = { name, desc, price };
    const oldAgents = JSON.parse(localStorage.getItem("agents")) || [];

    oldAgents.push(newAgent);
    localStorage.setItem("agents", JSON.stringify(oldAgents));

    alert("🔥 Agent Uploaded");

    setName("");
    setDesc("");
    setPrice("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #020617)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "rgba(255,255,255,0.05)",
        padding: "40px",
        borderRadius: "20px",
        width: "320px",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 30px rgba(59,130,246,0.3)"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "22px"
        }}>
          🚀 Upload AI Agent
        </h2>

        <input
          placeholder="Agent Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <button type="submit" style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          background: "#3b82f6",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          transition: "0.3s"
        }}
        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          Upload Agent
        </button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white"
};