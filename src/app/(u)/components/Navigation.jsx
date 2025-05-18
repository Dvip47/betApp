"use client";
import React, { useState } from "react";
import axios from "axios";

const Navigation = ({ globalSettings }) => {
  const [disable, setDisable] = useState(false);

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
  return (
    <div className="w-full bg-black flex justify-center py-1.5">
      <div className="flex justify-between w-full mx-auto max-w-[1350px]">
        <div
          onClick={() => window.location.reload()}
          className="cursor-pointer w-auto h-26 flex items-center justify-center"
        >
          {globalSettings && globalSettings.businessLogo && (
            <img
              src={
                globalSettings?.businessLogo &&
                `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}/api/${globalSettings.businessLogo}`
              }
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex items-center">
        
          {/* <button
            type="button"
            disabled={disable}
            onClick={handleLogout}
            className="inline-block rounded-md border border-transparent px-4 p_2 text-base text-white"
          >
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
