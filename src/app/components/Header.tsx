import React from "react";
import Image from "next/image";
import logo_end from "../assets/logo_end.svg";

const Header = () => {
  return (
    <div className="w-full p-4 shadow-md flex justify-between align-middle">
      <div className="flex align-bottom gap-[0.2rem] text-blue-950 text-[1.5rem]">
        <span className=" text-blue-950 font-bold text-[1.5rem] flex mt-auto">
          AgentInsight
        </span>
        <Image className="w-[0.8rem] pb-[0.3rem]" src={logo_end} alt="" />
      </div>
      <div>
        {/* <button className="p-2 rounded-md text-white bg-blue-900">
          Contact Us
        </button> */}
      </div>
    </div>
  );
};

export default Header;
