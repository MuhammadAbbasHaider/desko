import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setLoading(true);
    var decoded = user ? jwt_decode(user) : "";
    if (decoded?.user?.isAdmin) {
      setAdmin(true);
    } else setAdmin(false);
    setLoading(false);
  }, []);

  if (loading) return "loading";

  return (
    <AuthContext.Provider value={{ user, setUser, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
