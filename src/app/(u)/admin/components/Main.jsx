"use client";
import React, { useState, useEffect } from "react";
import Admins from "./Masters";
import Users from "../../components/Users";
import Settings from "./Settings";
import Home from "./Home";
import ActiveMatches from "./ActiveMatches";
import SuperUser from "../../components/SuperUser";
import Master from "./Masters";


export default function Main({ active }) {
  const [loading, setLoading] = useState(true);
  const [componentToRender, setComponentToRender] = useState(null);
  // console.log('in the main.jsx code block : ', active);

  useEffect(() => {
    setLoading(true);
    let newComponentToRender = null;
    console.log('active : ', active);

    switch (active) {
      case "master":
        newComponentToRender = <Master />;
        break;
        case "users":
        newComponentToRender = <Users />;
        break;
        case "home":
        newComponentToRender = <Home />;
        break;
        // add the matches component here ?
        case "activematches":
          newComponentToRender = <ActiveMatches/>;
          break;
        // and manage/update series here ?
        case "settings":
        newComponentToRender = <Settings />;
        break;
        case "superuser":
          newComponentToRender = <SuperUser />;
          break;
      default:
        newComponentToRender = <Admins />;
    }

    setComponentToRender(newComponentToRender);
    setLoading(false);
  }, [active]);

  return (
    <div className="m-2 overflow-x-auto">
      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <p>Loading ...</p>
        </div>
      ) : (
        componentToRender
      )}
    </div>
  );
}
