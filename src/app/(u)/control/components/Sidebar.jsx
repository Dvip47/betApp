"use client";
import React from "react";
import { ScrollArea } from "@mantine/core";

import Link from "next/link";

export default function Sidebar({ setSelectedLink, activeLink, links }) {
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };
  
  return (
    <div className="w-full min-h-[100vh] rounded bg-white">
      <ScrollArea h={800}>
        {/* <div className="bg-black min-h-[10vh]"> */}
        <div className="space-y-4 font-semibold text-white p-4 cursor-pointer">
          <div className="flex justify-center items-center">
            <p className="text-black">Control</p>
          </div>
          {links.map((linkObj, index) => (
            <div key={index} className="hover:text-gray-300">
              <Link
                href={`?pg=${linkObj.id}`}
                className={`text-[0.9rem] flex items-center hover:bg-orange-600/[0.5] p-3 rounded md:my-6 text-gray-900 ${activeLink === linkObj.id
                    ? "text-white bg-gray-900  rounded ml-3 w-[70%]"
                    : ""
                  }`}
                onClick={() => handleLinkClick(linkObj.id)}
              >
                {<linkObj.icon className="small mr-3" color={linkObj.color} />}
                {linkObj.name}
              </Link>
            </div>
          ))}
        </div>
        {/* absolute left-0 right-0 bottom-0 */}
        <div className="rounded m-1 flex flex-col items-center p-4  bg-gray-900">
          <p className="text-xl md:text-1xl font-bold">
            <span className="text-white">Smart</span>-
            <span className="text-orange-800 rounded p-1 bg-white">Bet</span>
          </p>
          <p className="text-[0.8rem] text-white my-4">v 1.0.0</p>
        </div>
        {/* </div> */}
      </ScrollArea>
    </div>
  );
}
