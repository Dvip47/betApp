"use client";
import React from "react";

export default function Sidebar({ setSelectedLink, activeLink, links }) {
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="flex flex-col justify-between w-full bg-gray-300 h-[100vh] absolute sticky top-0 left-0 bottom-0">
      <div className="space-y-1 font-semibold text-white p-4 cursor-pointer">
        <div className="flex justify-center items-center">
          <p className="text-black font-bold ">Panel Dashboard</p>
        </div>
        {links.map((linkObj, index) => (
          <div key={index} className="hover:text-gray-300">
            <p
              className={`text-[0.9rem] flex items-center  rounded p-2 text-gray-900 ${activeLink === linkObj.id
                ? "text-white bg-gray-900 rounded "
                : "hover:bg-gray-600/[0.5]"
                }`}

              onClick={() => handleLinkClick(linkObj.id)}
            >
              {<linkObj.icon className="small mr-1" color={linkObj.color} />}
              {linkObj.name}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded m-1 flex flex-col items-center p-4  bg-gray-900">
        <p className="text-sm text-white font-bold">
          <span className="text-white">Aura</span>-
          <span className="text-orange-800 rounded p-1 bg-white">Bet</span>
        </p>
        <p className="text-[0.8rem] text-white my-4">v 1.0.0</p>
      </div>
    </div>
  );
}
