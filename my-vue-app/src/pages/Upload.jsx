import { useState } from "react";
import { supabase } from "../supabase";

export default function Upload() {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("agents").insert([
      {
        name,
        desc,
        price,
        image,
        seller_name: sellerName,
        phone,
      },
    ]);

    if (error) {
      alert("❌ Error");
      console.log(error);
    } else {
      alert("🔥 Uploaded Successfully");

      setName("");
      setDesc("");
      setPrice("");
      setImage("");
      setSellerName("");
      setPhone("");
    }
  };

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
        width: "300px"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Sell Your Agent</h2>

        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} style={input}/>
        <input placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} style={input}/>
        <input placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} style={input}/>
        <input placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)} style={input}/>
        <input placeholder="Your Name" value={sellerName} onChange={(e)=>setSellerName(e.target.value)} style={input}/>
        <input placeholder="Your Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} style={input}/>

        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer"
        }}>
          Upload
        </button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none"
};