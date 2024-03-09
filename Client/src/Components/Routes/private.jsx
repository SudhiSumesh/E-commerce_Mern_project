import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../uiElements/Spinner";


function privateRoute() {
  const [ok, setOk] = useState();
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res =await axios.get(import.meta.env.VITE_PRIVATE_GET_URL);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if(auth?.token) authCheck()
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner/>;
}

export default  privateRoute
