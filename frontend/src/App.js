import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
