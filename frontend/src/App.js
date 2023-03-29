import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const user = fetchUser();

  //   if (!user) navigate("/login");
  // }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
