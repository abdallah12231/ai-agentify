const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("🔥 CLICKED");

  if (!userPhone || !screenshot) {
    alert("املأ البيانات");
    return;
  }

  try {
    console.log("🚀 start");

    // test insert بس (من غير upload)
    const { error } = await supabase
      .from("orders")
      .insert([
        {
          phone: userPhone,
          agent_name: "test",
          price: "100"
        }
      ]);

    if (error) {
      console.log("❌ DB ERROR:", error);
      alert(error.message);
      return;
    }

    alert("✅ اشتغل");

  } catch (err) {
    console.log("❌ CATCH:", err);
    alert("error");
  }
};