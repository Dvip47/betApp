"use client";

import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Main from "./components/Main";
import jwt_decode from "jwt-decode";
import MainNav from "../components/MainSideBar";
import {
  adminMainLinks,
  allowedRoles,
  controlLinks,
  controlReportLinks,
  level3ReportLinks,
  linksAdmin,
  spLinks,
  whitelevelLinks,
} from "../constants/sideBarLinks";
import { useSearchParams } from "next/navigation";
import { getGlobalSetings } from "@/app/api";

const ControlPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("cpg");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [currentUserTitle, setCurrentUserTitle] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [sportSettings, setSportSettings] = useState([]);
  const [mainLinks, setMainLinks] = useState([]);
  const [reportLinks, setReportLinks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState({});

  useEffect(() => {
    const allowedUserRoles = allowedRoles[currentUserRole] || [];

    const filteredLinks = controlLinks.filter((link) =>
      allowedUserRoles.includes(link.id)
    );

    setFilteredLinks(filteredLinks);
  }, [currentUserRole]);

  const runner = async () => {
    try {
      const globalSettings_ = await getGlobalSetings();
      setGlobalSettings(globalSettings_);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tk");
    runner();
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.role !== "normalUser") {
        if (decoded.role === "king") {
          setCurrentUserTitle("Control")
          setSportSettings(spLinks)
          setMainLinks(ctlLinks)
          setReportLinks(controlReportLinks)
        } else if (decoded.role === "mainAdmin") {
          setCurrentUserTitle("Main Admin")
          setSportSettings(spLinks)
          setMainLinks(ctlLinks)
          setReportLinks(level3ReportLinks)
        } else if (decoded.role === "admin") {
          setCurrentUserTitle("Admin")
          setSportSettings(spLinks)
          setMainLinks(linksAdmin)
          setReportLinks(level3ReportLinks)
        } else if (decoded.role === "whitelevel") {
          setCurrentUserTitle("Whitelevel");
          setSportSettings(spLinks);
          setMainLinks(whitelevelLinks);
          setReportLinks(level3ReportLinks);
        } else if (decoded.role === "master") {
          setCurrentUserTitle("Master");
          setMainLinks(adminMainLinks);
          setSportSettings([]);
          setReportLinks(level3ReportLinks);
        } else if (decoded.role === "super") {
          setCurrentUserTitle("Super");
          setMainLinks(adminMainLinks);
          setSportSettings([]);
          setReportLinks(level3ReportLinks);
        } else if (decoded.role === "panel") {
          setCurrentUserTitle("Panel");
          setMainLinks(adminMainLinks);
          setSportSettings([]);
          setReportLinks(level3ReportLinks);
        }
        setCurrentUserRole(decoded.role);
        setAuthenticated(true);
      } else {
        alert("Oops, you have less permissions to access this page!");
        setRedirecting(true);
        window.location.replace("/login");
      }
    } else {
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className="relative bg-white h-screen">
      {!authenticated ? (
        <div className="h-screen flex justify-center items-center">
          <p>{redirecting ? "Redirecting ..." : "Loading ..."}</p>
        </div>
      ) : (
        <>
          <div className="">
            {/* top bars */}
            <div className={``}>
              <Navigation
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                globalSettings={globalSettings}
              />
              <MainNav
                userLinks={filteredLinks}
                spLinks={sportSettings}
                reportLinks={reportLinks}
                mainLinks={mainLinks}
                userTye={currentUserTitle}
                currentUserRole={currentUserRole}
                setSidebarOpen={setSidebarOpen}
              />
            </div>
            {/* Main Content */}
            <div className={` mx-6 p-4`}>
              <Main active={currentPage} userTye={currentUserTitle} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ControlPanel;
