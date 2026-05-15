import { useState } from "react";
import { supabase } from "../supabase";

export default function Upload() {

  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [price,setPrice]=useState("");
  const [sellerName,setSellerName]=useState("");
  const [phone,setPhone]=useState("");

  const [imageFile,setImageFile]=useState(null);
  const [agentFile,setAgentFile]=useState(null);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!name || !desc || !price) return alert("املأ البيانات");

    const imgName = Date.now()+imageFile.name;
    await supabase.storage.from("agents-files").upload(imgName,imageFile);

    const imageUrl = supabase.storage.from("agents-files")
    .getPublicUrl(imgName).data.publicUrl;

    const fileName = Date.now()+agentFile.name;
    await supabase.storage.from("agents-files").upload(fileName,agentFile);

    const fileUrl = supabase.storage.from("agents-files")
    .getPublicUrl(fileName).data.publicUrl;

    await supabase.from("agents").insert([{
      name,desc,price,image:imageUrl,file_url:fileUrl,
      seller_name:sellerName,phone
    }]);

    alert("🔥 Uploaded");
  }

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"linear-gradient(135deg,#020617,#0f172a)",
      color:"white"
    }}>
      <form onSubmit={handleSubmit} style={{
        background:"rgba(255,255,255,0.05)",
        padding:"40px",
        borderRadius:"20px",
        backdropFilter:"blur(20px)",
        width:"320px"
      }}>

        <h2 style={{marginBottom:"20px"}}>🚀 Sell Your AI</h2>

        <input placeholder="Name" onChange={e=>setName(e.target.value)} style={input}/>
        <input placeholder="Description" onChange={e=>setDesc(e.target.value)} style={input}/>
        <input placeholder="Price" onChange={e=>setPrice(e.target.value)} style={input}/>
        <input placeholder="Your Name" onChange={e=>setSellerName(e.target.value)} style={input}/>
        <input placeholder="Phone" onChange={e=>setPhone(e.target.value)} style={input}/>

        <p>📸 Image</p>
        <input type="file" onChange={e=>setImageFile(e.target.files[0])}/>

        <p>📦 File</p>
        <input type="file" onChange={e=>setAgentFile(e.target.files[0])}/>

        <button style={{
          marginTop:"15px",
          width:"100%",
          padding:"12px",
          borderRadius:"12px",
          border:"none",
          background:"#3b82f6",
          color:"white",
          cursor:"pointer"
        }}>
          Upload
        </button>

      </form>
    </div>
  )
}

const input={
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  borderRadius:"10px",
  border:"none",
  background:"rgba(255,255,255,0.1)",
  color:"white"
}