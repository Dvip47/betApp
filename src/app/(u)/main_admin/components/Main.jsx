"use client";
import React, { useState, useEffect } from "react";
import Admins from "./Admins";
import Users from "../../components/Users";
import Settings from "./Settings";
import Home from "./Home";
import SuperUser from "../../components/SuperUser";

export default function Main({ active }) {
  const [loading, setLoading] = useState(true);
  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    setLoading(true);
    let newComponentToRender = null;

    switch (active) {
      case "users":
        newComponentToRender = <Users />;
        break;
      case "admin":
        newComponentToRender = <Admins />;
        break;
      case "home":
        newComponentToRender = <Home />;
        break;
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
