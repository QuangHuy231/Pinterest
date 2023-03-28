import React, { useState, useEffect, useId, useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import axios from "axios";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { fetchUser } from "../utils/fetchUser";
import { UserContext } from "../context/UserContext";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [err, setErr] = useState("");
  // const [pins, setPins] = useState(null);
  // const [text, setText] = useState("Created");
  // const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/auth/get-user/${userId}`, {
          headers: { authorization: `Bearer ${user?.token}` },
        });

        setUserProfile(data);
      } catch (error) {
        setErr(err);
      }
    };

    fetchData();
  }, [err, user?.token, userId]);

  // useEffect(() => {
  //   if (text === "Created") {
  //     const createPinsQuery = userCreatedPinsQuery(userId);
  //     client.fetch(createPinsQuery).then((data) => setPins(data));
  //   } else {
  //     const savedPinsQuery = userSavedPinsQuery(userId);
  //     client.fetch(savedPinsQuery).then((data) => setPins(data));
  //   }
  // }, [text, userId]);

  const logout = async () => {
    // await axios.post("/auth/logout");
    googleLogout();
    localStorage.clear();

    navigate("/login");
  };
  if (err) {
    return <div>{err}</div>;
  }
  if (!userProfile) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center item-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              src={userProfile.image}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {userProfile.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user.googleId && (
                <GoogleOAuthProvider
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                >
                  <AiOutlineLogout
                    color="red"
                    fontSize={40}
                    onClick={logout}
                    className="rounded-full bg-white p-2 cursor-pointer"
                  />
                </GoogleOAuthProvider>
              )}
            </div>
          </div>
          {/* <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2 ">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Found Pin
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
