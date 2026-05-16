import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ProtectedRoute({ children, roleRequired }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();

      // لو مش عامل login
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      // check role
      const role = localStorage.getItem("role");

      if (roleRequired && role !== roleRequired) {
        window.location.href = "/";
        return;
      }

      setUser(data.user);
    };

    check();
  }, []);

  if (!user) return null;

  return children;
}