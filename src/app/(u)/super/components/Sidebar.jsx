"use client";
import React from "react";
import { ScrollArea } from "@mantine/core";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BungalowIcon from "@mui/icons-material/Bungalow";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Sidebar({ setSelectedLink, activeLink }) {
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };
  const links = [
    {
      name: "Home",
      id: "home",
      icon: BungalowIcon,
      styling: "",
      color: "secondary",
    },
    {
      name: "Panel",
      id: "normalUser",
      icon: AdminPanelSettingsIcon,
      styling: "",
      color: "white",
    },
    {
      name: "Settings",
      id: "settings",
      icon: SettingsIcon,
      styling: "",
      color: "primary",
    },
  ];

  return (
    <div className="w-full rounded bg-white">
      <ScrollArea className="min-h-[90vh]">
        {/* <div className="bg-black min-h-[10vh]"> */}
        <div className="space-y-4 font-semibold text-white p-4 cursor-pointer">
          <div className="flex justify-center items-center">
            <p className="text-black">Super</p>
          </div>
          {links.map((linkObj, index) => (
            <div key={index} className="hover:text-gray-300">
              <p
                className={`text-[0.9rem] flex items-center hover:bg-orange-600/[0.5] rounded p-3 my-3 md:my-6 text-gray-900 ${
                  activeLink === linkObj.id
                    ? "text-white bg-gray-900 rounded ml-3 w-[70%]"
                    : ""
                }`}
                onClick={() => handleLinkClick(linkObj.id)}
              >
                {<linkObj.icon className="small mr-3" color={linkObj.color} />}
                {linkObj.name}
              </p>
            </div>
          ))}
        </div>
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
