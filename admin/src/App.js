import "./css/Spacing.css";
import "./css/Alignment.css";
import "./css/Sizing.css";
import "./css/Typography.css";
import "./css/App.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Login from "./Pages/Auth/Login";
// import Register from "./Pages/Auth/Register";
import { useAuthContext } from "./Context/AuthContext";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/forgot" element={<ForgotPassword />} /> */}
        </Routes>
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
