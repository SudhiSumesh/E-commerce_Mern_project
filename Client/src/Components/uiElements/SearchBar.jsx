import React from 'react'

const SearchBar = () => {
  return (
    <>
      <div className="hidden md:flex md:order-2">
        <div className="relative md:block">
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            className="p-2  text-sm text-gray-900 border rounded-lg border-[#377bc7]  ps-10 bg-white-50 "
            placeholder="Search..."
          />
        </div>
      </div>
    </>
  );
}

export default SearchBar
