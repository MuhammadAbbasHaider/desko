import React from "react";
import { useAuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { user, admin } = useAuthContext();
  
  return (
    <div>
      <h1>{admin ? "This is a admin account" : "Client account"}</h1>
    </div>
  );
};

export default Home;
