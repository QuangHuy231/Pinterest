import React, { useState, useEffect, useContext } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const PinDetail = () => {
  const { user } = useContext(UserContext);
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const fetchPinDetails = () => {
    axios.get(`/pin/getPin/${pinId}`).then((data) => {
      setPinDetail(data.data[0]);

      if (data.data[0]) {
        axios
          .post(`/pin/getMorePin/${pinId}`, {
            category: pinDetail?.category,
          })
          .then((data) => {
            setPins(data.data);
          });
      }
    });
  };

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      axios
        .put(`/pin/commentPin/${pinDetail._id}`, {
          comments: comment,
        })
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId, pinDetail?._id]);

  const handleDownload = (e) => {
    e.stopPropagation();
    const filename = pinDetail.image;
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

  if (!pinDetail) return <Spinner message="Loading pin ..." />;

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={`http://localhost:5000/uploads/${pinDetail?.image}`}
            className="rounded-t-3xl rounded-b-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`http://localhost:5000/uploads/${pinDetail.image}`}
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
            <a href={pinDetail.destinantion} target="_blank" rel="noreferrer">
              {pinDetail.destinantion}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3 ">{pinDetail.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetail.postedBy?.googleId}`}
            className="flex gap-2 mt-5 item-center bg-white rounded-lg"
          >
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="font-semibold capitalize">
              {pinDetail?.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>

          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <Link to={`/user-profile/${comment.userComment?.googleId}`}>
                  <img
                    src={comment.userComment.image}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </Link>

                <div className="flex flex-col ">
                  <Link to={`/user-profile/${comment.userComment?.googleId}`}>
                    <p className="font-bold">{comment.userComment.userName}</p>
                  </Link>
                  <p>{comment.comments}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user?.googleId}`}>
              <img
                src={user?.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white font-semibold px-6 rounded-full text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting the comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>
  );
};

export default PinDetail;
