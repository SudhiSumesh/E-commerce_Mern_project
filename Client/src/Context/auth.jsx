import axios from "axios";
import { useState, createContext,useContext, useEffect } from "react";

const AuthContext = createContext(); // Create the context

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  //default axios
  axios.defaults.headers.common["Authorization"]=auth?.token

useEffect(()=>{
  const data=localStorage.getItem('auth')
 if(data){
  const parseData=JSON.parse(data)
  setAuth(
    {
      ...auth,
      user:parseData.user,
      token:parseData.token
    }
  )
 }
 //eslint-disable-next-line
},[])
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => {
  const context = useContext(AuthContext); // Use useContext to get the context value

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { useAuth, AuthProvider };