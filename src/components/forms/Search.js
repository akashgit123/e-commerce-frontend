import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Search() {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/search/${search.keyword}`
      );
      if (response.data.success) {
        setSearch({ ...search, result: response.data.products });
        console.log(search);
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          type="search"
          className="form-control me-2"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
          }}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
