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

    if (!name || !desc || !price) {
      alert("املأ البيانات");
      return;
    }

    if (!imageFile || !agentFile) {
      alert("ارفع صورة وملف");
      return;
    }

    // رفع الصورة
    const imgName = Date.now() + imageFile.name;
    await supabase.storage.from("agents-files").upload(imgName, imageFile);

    const imageUrl = supabase.storage
      .from("agents-files")
      .getPublicUrl(imgName).data.publicUrl;

    // رفع الملف
    const fileName = Date.now() + agentFile.name;
    await supabase.storage.from("agents-files").upload(fileName, agentFile);

    const fileUrl = supabase.storage
      .from("agents-files")
      .getPublicUrl(fileName).data.publicUrl;

    // حفظ
    await supabase.from("agents").insert([
      {
        name,
        desc,
        price,
        image: imageUrl,
        file_url: fileUrl,
        seller_name: sellerName,
        phone
      }
    ]);

    alert("تم الرفع 🔥");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Sell</h1>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} /><br/>
      <input placeholder="Desc" onChange={(e)=>setDesc(e.target.value)} /><br/>
      <input placeholder="Price" onChange={(e)=>setPrice(e.target.value)} /><br/>
      <input placeholder="Your Name" onChange={(e)=>setSellerName(e.target.value)} /><br/>
      <input placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} /><br/>

      <p>Image</p>
      <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} />

      <p>File</p>
      <input type="file" onChange={(e)=>setAgentFile(e.target.files[0])} />

      <br/><br/>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}