import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Feed,
  Search,
  PinDetail,
  CreatePin,
  Page404,
} from "../components";
const Pins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="px-2 md:px-5">
        <div className="bg-gray-50">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="h-full ">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/pin-detail/:pinId" element={<PinDetail />} />
            <Route path="/create-pin" element={<CreatePin />} />
            <Route
              path="/search"
              element={
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              }
            />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Pins;
