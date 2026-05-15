import { useState } from "react";
import { supabase } from "../supabase";

export default function Upload() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [agentFile, setAgentFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !agentFile) {
      alert("❌ لازم ترفع صورة وملف");
      return;
    }

    // رفع الصورة
    const imageName = Date.now() + "-" + imageFile.name;

    const { error: imgError } = await supabase.storage
      .from("agents-files")
      .upload(imageName, imageFile);

    if (imgError) {
      console.log(imgError);
      return;
    }

    const imageUrl = `${supabase.storage
      .from("agents-files")
      .getPublicUrl(imageName).data.publicUrl}`;

    // رفع ملف AI
    const fileName = Date.now() + "-" + agentFile.name;

    const { error: fileError } = await supabase.storage
      .from("agents-files")
      .upload(fileName, agentFile);

    if (fileError) {
      console.log(fileError);
      return;
    }

    const fileUrl = `${supabase.storage
      .from("agents-files")
      .getPublicUrl(fileName).data.publicUrl}`;

    // حفظ في الداتابيز
    const { error } = await supabase.from("agents").insert([
      {
        name,
        desc,
        price,
        image: imageUrl,
        file_url: fileUrl,
        seller_name: sellerName,
        phone,
      },
    ]);

    if (error) {
      console.log(error);
      alert("❌ Error");
    } else {
      alert("🔥 تم رفع المنتج");

      setName("");
      setDesc("");
      setPrice("");
      setSellerName("");
      setPhone("");
      setImageFile(null);
      setAgentFile(null);
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
        width: "320px"
      }}>
        <h2>Sell Your AI Agent</h2>

        <input placeholder="Name" onChange={(e)=>setName(e.target.value)} /><br/><br/>
        <input placeholder="Description" onChange={(e)=>setDesc(e.target.value)} /><br/><br/>
        <input placeholder="Price" onChange={(e)=>setPrice(e.target.value)} /><br/><br/>
        <input placeholder="Your Name" onChange={(e)=>setSellerName(e.target.value)} /><br/><br/>
        <input placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} /><br/><br/>

        <p>📸 Upload Image:</p>
        <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} /><br/><br/>

        <p>📦 Upload AI File:</p>
        <input type="file" onChange={(e)=>setAgentFile(e.target.files[0])} /><br/><br/>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}