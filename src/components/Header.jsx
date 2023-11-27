import React, { useContext } from "react";
import person from "./icon.svg";
import { useNavigate } from "react-router";
import { AuthContext } from "../authContext";
const Header = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });

    navigate("/admin/login");
  };
  return (
    <div className="flex justify-between w-full">
      <div className="text-white text-5xl font-black font-['Segoe UI'] leading-tight">
        APP
      </div>
      <div onClick={handleLogout} className="hover:bg-blue-600 cursor-pointer w-32 h-12 bg-[#9BFF00] rounded-3xl flex-col justify-center items-center inline-flex">
        <div  className="h-6 flex items-center gap-1">
          <div className="text-zinc-950 text-base font-thin  leading-tight flex justify-around gap-1">
            <img src={person} alt="icon" className="w-4 h-4" />
            <div >Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
