import React, { useEffect, useState } from "react";
import { Spinner as FlowbiteSpinner } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
const Spinner = () => {
  const [count, setCount] = useState(2);
  const location=useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    const inerval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && navigate("/",{
      state:location.pathname    });
    return () => clearInterval(inerval);
  }, [count, navigate,location]);
  return (
    <div className="text-center flex flex-col items-center justify-center h-lvh">
      <div>Redireting To Home in {count} Seconds</div>
      <FlowbiteSpinner className="size-[50px]" />
    </div>
  );
};

export default Spinner;
