import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// import { client } from "../client";

import Spinner from "./Spinner";
import { categories } from "../utils/data";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const CreatePin = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destinantion, setDestinantion] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);

  const navigate = useNavigate();

  const uploadPhoto = (e) => {
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    // Append only the first file to the FormData object
    data.append("photo", files[0]);
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filename } = res;
        setImageAsset(filename);
        setLoading(false);
      });
  };

  const savePin = async () => {
    if (title && about && destinantion && imageAsset && category) {
      const doc = {
        title,
        about,
        destinantion,
        image: imageAsset,
        category,
      };
      await axios.post("/pin/create-pin", doc);
      // {
      //   headers: { authorization: `Bearer ${user?.token}` },
      // }
      navigate(`/user-profile/${user.googleId}`);
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        {/* tao keo tha hinh anh */}
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}

            {!imageAsset ? (
              <label>
                <div className="flex flex-col item-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl ">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, GIF or TIFF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadPhoto}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={`http://localhost:5000/uploads/${imageAsset}`}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-wite rounded-lg">
              <img
                src={user.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destinantion}
            onChange={(e) => setDestinantion(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col ">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={category.name}
                    key={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5 ">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
