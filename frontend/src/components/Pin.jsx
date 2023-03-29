import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import axios from "axios";
import { UserContext } from "../context/UserContext";

const Pin = ({ pin: { postedBy, image, _id, destinantion, save } }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const alreadySaved = !!save?.filter((item) => item.userSave._id === user._id)
    ?.length;

  //1, [2,3,1] -> [1].length -> 1
  // 4 ,[2,3,1] -> [].length -> 0

  const savePin = (id) => {
    if (!alreadySaved) {
      axios.put(`/pin/save-pin/${id}`).then(() => {
        window.location.reload();
      });
    } else {
      axios.put(`/pin/unsave-pin/${id}`).then(() => {
        window.location.reload();
      });
    }
  };

  const deletePin = (id) => {
    axios.delete(`/pin/delete-pin/${id}`).then(() => {
      window.location.reload();
    });
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const filename = image;
    axios
      .get(`/download/${filename}`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          loading="lazy"
          className="rounded-lg w-full"
          alt="user-post"
          src={`http://localhost:5000/uploads/${image}`}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`http://localhost:5000/uploads/${image}`}
                  //chỉ tải không chuyển đến trang pin detail
                  target="_blank"
                  onClick={handleDownload}
                  download
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  rel="noreferrer"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destinantion && (
                <a
                  href={destinantion}
                  target="_blank"
                  rel="noneferrer noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <BsFillArrowRightCircleFill />
                  {destinantion.length > 15
                    ? `${destinantion.slice(0, 15)}...`
                    : destinantion}
                </a>
              )}
              {postedBy?._id === user._id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100  font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none mr-4"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?.googleId}`}
        className="flex gap-2 mt-2 item-center"
      >
        <img
          src={postedBy?.image}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
