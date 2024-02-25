
import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const SearchContext = createContext(); // Create the context

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
  keyword:"",
  results:[]
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook
const useSearch = () => {
  const context = useContext(SearchContext); // Use useContext to get the context value

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { useSearch, SearchProvider };
