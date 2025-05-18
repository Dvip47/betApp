"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Link from "next/link";

export default function MainNav({
  mainLinks,
  userLinks,
  spLinks,
  reportLinks,
  currentUserRole,
}) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("cpg");
  const pg = searchParams.get("pg");
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");

  const handleLogout = async () => {
    setDisable(true);

    try {
      const tk = localStorage.getItem("tk");
      if (!tk) {
        window.location.replace("/login");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      if (res && res.status === 200) {
        localStorage.removeItem("tk");
        window.location.replace("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("tk");
      window.location.replace("/login");
    }
  };

  const handleLinkClick = (type, link) => {
    if (type === "level_1") {
      router.push(`?cpg=${link}`);
    } else if (type === "level_2") {
      router.push(`?cpg=${currentPage}&pg=${link}`);
    }
  };

  const collectionLinks = ["usersmain", "sportsettings", "reports"];

  const handleMouseEnter = (linkId) => {
    setDropdownOpen(linkId);
  };

  const handleMouseLeave = () => {
    setDropdownOpen("");
  };

  return (
    <div className="w-full bg-[#F6A21E] flex justify-center">
      <div className="flex justify-between w-full mx-auto max-w-[1350px] max-sm:overflow-x-auto">
        <div className="grid grid-cols-5">
          <Link
            href={`/?cpg=dashboard&pg=dashboard`}
            className={`flex justify-center items-center cursor-pointer text-sm font-bold border-l border-black ${
              currentPage === "dashboard" ? "bg-black text-white" : "text-black"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href={`/?cpg=home&pg=home`}
            className={`flex justify-center items-center cursor-pointer text-sm font-bold border-l border-black ${
              currentPage === "home" ? "bg-black text-white" : "text-black"
            }`}
          >
            My Account
          </Link>
          {["whitelevel"].includes(currentUserRole) && (
            <Link
              href={`/?cpg=casino&pg=casino`}
              className={`px-2 flex justify-center items-center cursor-pointer text-sm font-bold border-l border-black ${
                currentPage === "casino" ? "bg-black text-white" : "text-black"
              }`}
            >
              Casino Settings
            </Link>
          )}

          {mainLinks.map((linkObj, index) => (
            <div
              key={index}
              className={`relative col-span-1 ${
                index === 0 ? "border-l border-r" : "border-r"
              } border-black`}
              onMouseEnter={() => handleMouseEnter(linkObj.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`flex justify-center h-full items-center cursor-pointer text-sm font-bold ${
                  currentPage === linkObj.id
                    ? "bg-black text-white"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("level_1", linkObj.id)}
              >
                {linkObj.name}
                {collectionLinks.includes(linkObj.id) && (
                  <ArrowDropDownIcon className="ml-1" fontSize="small" />
                )}
              </div>

              {/* Dropdown */}
              {collectionLinks.includes(linkObj.id) &&
                dropdownOpen === linkObj.id && (
                  <div className="absolute left-0 bg-black text-white text-sm rounded shadow-md z-[999999] w-[180px]">
                    {linkObj.id === "usersmain" &&
                      userLinks.map((subLink, subIndex) => (
                        <p
                          key={subIndex}
                          className={` border-b border-white/[0.2] font-bold text-sm px-2 py-1 hover:underline cursor-pointer ${
                            pg === subLink.id ? "bg-gray-600 text-white" : ""
                          }`}
                          onClick={() => handleLinkClick("level_2", subLink.id)}
                        >
                          {subLink.name}
                        </p>
                      ))}
                    {linkObj.id === "sportsettings" &&
                      spLinks.map((subLink, subIndex) => (
                        <p
                          key={subIndex}
                          className={` border-b border-white/[0.2] font-bold text-sm px-2 py-1 hover:underline cursor-pointer ${
                            pg === subLink.id ? "bg-gray-600 text-white" : ""
                          }`}
                          onClick={() => handleLinkClick("level_2", subLink.id)}
                        >
                          {subLink.name}
                        </p>
                      ))}
                    {linkObj.id === "reports" &&
                      reportLinks.map((subLink, subIndex) => (
                        <p
                          key={subIndex}
                          className={` border-b border-white/[0.2] font-bold text-sm px-2 py-1 hover:underline cursor-pointer ${
                            pg === subLink.id ? "bg-gray-600 text-white" : ""
                          }`}
                          onClick={() => handleLinkClick("level_2", subLink.id)}
                        >
                          {subLink.name}
                        </p>
                      ))}
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Settings and Logout */}
        <div className="grid grid-cols-1 gap-x-2 items-center">
          <div className="col-span-1 p-1 border-r border-black">
            <button
              type="button"
              disabled={disable}
              onClick={handleLogout}
              className="text-sm font-bold text-black flex"
            >
              Logout
              <LoginRoundedIcon className="text-black" fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
