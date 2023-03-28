import React, { useContext, useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/logo.png";
import Sidebar from "../components/Sidebar";

import { Link, Navigate, Route, Routes } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import Pins from "./Pins";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [toogleSidebar, setToggleSidebar] = useState(false);

  const scrollRef = useRef();
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   scrollRef.current.scrollTo(0, 0);
  // });

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md ">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link>
        </div>
        {toogleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
