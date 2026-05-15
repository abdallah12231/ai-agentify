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
      alert("🔥 Uploaded");

      setName("");
      setDesc("");
      setPrice("");
      setImage("");
      setSellerName("");
      setPhone("");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Upload Agent</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <input placeholder="Desc" value={desc} onChange={(e) => setDesc(e.target.value)} /><br /><br />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br /><br />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} /><br /><br />
        <input placeholder="Seller Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} /><br /><br />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}