"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navigation from "../components/Navigation";
import Main from "./components/Main";
import jwt_decode from "jwt-decode";
import { superLinks } from "../constants/sideBarLinks";
import MainSideBar from "../components/MainSideBar";

const SuperUserPanel = () => {
  const [selectedLink, setSelectedLink] = useState("home");
  const [authenticated, setAuthenticated] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tk");
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.role === "super") {
        setAuthenticated(true);
      } else {
        alert("Oops, you have less permissions to access this page!");
        setRedirecting(true);
        window.location.replace("/u/login");
      }
    } else {
      window.location.replace("/u/login");
    }
  }, []);
  return (
    <div className="bg-black">
      {!authenticated ? (
        <div className="h-screen flex justify-center items-center">
          <p>{redirecting ? "Redirecting ..." : "Loading ..."}</p>
        </div>
      ) : (
        <>
          {/* main content */}
          <div className="grid grid-cols-12 relative">
            <div className="col-span-2 rounded">
              <MainSideBar
                setSelectedLink={setSelectedLink}
                activeLink={selectedLink}
                links={superLinks}
                userTye="Super User"
              />
            </div>
            <div className="col-span-10 bg-gray-50 rounded m-2">
              <Navigation />
              <Main active={selectedLink} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperUserPanel;

