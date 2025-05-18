"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navigation from "../../components/Navigation";
import Main from "./components/Main";
import jwt_decode from "jwt-decode";

const Panel = () => {
  const [selectedLink, setSelectedLink] = useState("home");
  const [authenticated, setAuthenticated] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tk");
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.role === "panel") {
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
    <div className="bg-black min-h-screen">
      {!authenticated ? (
        <div className="h-screen flex justify-center items-center">
          <p>{redirecting ? "Redirecting ..." : "Loading ..."}</p>
        </div>
      ) : (
        <>
          {/* navigation */}
          <div className="bg-orange-600">
            <Navigation />
          </div>
          {/* main content */}
          <div className="grid grid-cols-12 min-h-[100vh] mt-1 relative">
            <div className="col-span-2 rounded m-1">
              <div className="flex sticky top-2 max-h-[100vh] bottom-2">
                <Sidebar
                  setSelectedLink={setSelectedLink}
                  activeLink={selectedLink}
                />
              </div>
            </div>
            <div className="col-span-10 bg-white rounded m-1">
              <Main active={selectedLink} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Panel;
