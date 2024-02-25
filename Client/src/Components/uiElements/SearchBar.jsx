import React from "react";
import { useSearch } from "../../Context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_PRODUCT_SEARCH_URL}/${values.keyword}`
      );
      if (data.success) {
        setValues({ ...values, results: data.results });
        navigate("/search");
        console.log(values);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="hidden md:flex md:order-2">
        <div className="relative md:block">
          <div className="absolute inset-y-0 flex items-center cursor-pointer start-0 ps-3">
            <svg
              onClick={handleClick}
              className="w-4 h-4  text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            className="p-2  text-sm text-gray-900 border rounded-lg border-[#377bc7]  ps-10 bg-white-50 "
            placeholder="Search..."
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
