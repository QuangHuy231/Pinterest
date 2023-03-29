import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import axios from "axios";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      axios.post(`/pin/searchPin`, { searchTerm }).then((data) => {
        setPins(data.data);
        setLoading(false);
      });
    } else {
      axios.get("/pin/all-pins").then((data) => {
        setPins(data.data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Search for pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found</div>
      )}
    </div>
  );
};

export default Search;
