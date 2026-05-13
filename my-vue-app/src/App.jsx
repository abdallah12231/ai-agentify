<nav style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  background: "rgba(15,23,42,0.8)",
  backdropFilter: "blur(10px)",
  color: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000
}}>
  <h2 style={{
    color: "#3b82f6",
    fontWeight: "bold",
    fontSize: "22px"
  }}>
    ⚡ AI Agentify
  </h2>

  <div style={{ display: "flex", gap: "15px" }}>
    {[
      { name: "Home", path: "/" },
      { name: "Browse", path: "/browse" },
      { name: "Sell", path: "/upload" },
      { name: "Contact", path: "/contact" }
    ].map((item, i) => (
      <Link key={i} to={item.path}>
        <button
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#3b82f6";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(255,255,255,0.05)";
            e.target.style.transform = "scale(1)";
          }}
        >
          {item.name}
        </button>
      </Link>
    ))}
  </div>
</nav>