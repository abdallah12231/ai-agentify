export default function ChooseRole() {
    const selectRole = (role) => {
      localStorage.setItem("role", role);
  
      if (role === "buyer") {
        window.location.href = "/browse";
      } else {
        window.location.href = "/upload";
      }
    };
  
    return (
      <div style={container}>
        <h1 style={{ marginBottom: "30px" }}>
          👋 انت عايز تعمل ايه؟
        </h1>
  
        <div style={{ display: "flex", gap: "20px" }}>
          
          <div style={card} onClick={() => selectRole("buyer")}>
            <h2>🛒 مشتري</h2>
            <p>اشتري AI Agents</p>
          </div>
  
          <div style={card} onClick={() => selectRole("seller")}>
            <h2>💼 بائع</h2>
            <p>بيع AI Agents</p>
          </div>
  
        </div>
      </div>
    );
  }
  
  const container = {
    height: "100vh",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  
  const card = {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
    cursor: "pointer",
    textAlign: "center",
    width: "180px",
    transition: "0.3s",
  };