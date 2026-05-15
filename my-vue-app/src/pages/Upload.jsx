import { useState } from "react";
import { supabase } from "../supabase";

export default function Upload() {

  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [price,setPrice]=useState("");
  const [sellerName,setSellerName]=useState("");
  const [phone,setPhone]=useState("");

  const [imageFile,setImageFile]=useState(null);
  const [preview,setPreview]=useState(null);
  const [agentFile,setAgentFile]=useState(null);

  const handleImage = (e)=>{
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!name || !desc || !price) return alert("املأ البيانات");

    // رفع الصورة
    const imgName = Date.now()+imageFile.name;
    await supabase.storage.from("agents-files").upload(imgName,imageFile);

    const imageUrl = supabase.storage.from("agents-files")
    .getPublicUrl(imgName).data.publicUrl;

    // رفع الملف
    const fileName = Date.now()+agentFile.name;
    await supabase.storage.from("agents-files").upload(fileName,agentFile);

    const fileUrl = supabase.storage.from("agents-files")
    .getPublicUrl(fileName).data.publicUrl;

    // حفظ
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
        width:"350px"
      }}>

        <h2 style={{marginBottom:"20px"}}>🚀 Sell Your AI</h2>

        <input placeholder="Name" onChange={e=>setName(e.target.value)} style={input}/>

        {/* 🔥 Description كبير */}
        <textarea 
          placeholder="Write full description..."
          onChange={e=>setDesc(e.target.value)}
          style={{
            ...input,
            height:"100px",
            resize:"none"
          }}
        />

        <input placeholder="Price" onChange={e=>setPrice(e.target.value)} style={input}/>
        <input placeholder="Your Name" onChange={e=>setSellerName(e.target.value)} style={input}/>
        <input placeholder="Phone" onChange={e=>setPhone(e.target.value)} style={input}/>

        {/* 🔥 Upload Image UI */}
        <p style={{marginTop:"10px"}}>📸 Upload Image</p>

        <label style={{
          width:"100%",
          height:"150px",
          border:"2px dashed rgba(255,255,255,0.2)",
          borderRadius:"15px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          cursor:"pointer",
          overflow:"hidden",
          marginBottom:"15px",
          background:"rgba(255,255,255,0.03)"
        }}>

          {preview ? (
            <img src={preview} style={{width:"100%", height:"100%", objectFit:"cover"}} />
          ) : (
            <span style={{fontSize:"40px", color:"#3b82f6"}}>+</span>
          )}

          <input 
            type="file" 
            onChange={handleImage}
            style={{display:"none"}}
          />
        </label>

        {/* 📦 File Upload */}
        <p>📦 Upload AI File</p>
        <input type="file" onChange={e=>setAgentFile(e.target.files[0])} />

        <button style={{
          marginTop:"20px",
          width:"100%",
          padding:"12px",
          borderRadius:"12px",
          border:"none",
          background:"linear-gradient(90deg,#3b82f6,#2563eb)",
          color:"white",
          cursor:"pointer",
          fontSize:"15px"
        }}>
          Upload Agent
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