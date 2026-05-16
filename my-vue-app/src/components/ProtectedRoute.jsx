import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return children;
}