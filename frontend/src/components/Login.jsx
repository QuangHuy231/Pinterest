import React, { useContext } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    localStorage.setItem("google", JSON.stringify(decoded));

    const { name, sub, picture } = decoded;
    const doc = {
      googleId: sub,
      userName: name,
      image: picture,
    };

    const { data } = await axios.post("/auth/login", doc);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/");
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            >
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Error")}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
