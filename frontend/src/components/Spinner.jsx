import React from "react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles color="#00DFFF" height={50} width={200} />
      <p className="text-lg text-center px-2 m-5">{message}</p>
    </div>
  );
};

export default Spinner;
