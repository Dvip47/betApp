"use client";
import React, { useState, useEffect } from "react";
import Settings from "./Settings";
import Home from "./Home";
import PanelUser from "./PanelUsers";

export default function Main({ active }) {
  const [loading, setLoading] = useState(true);
  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    setLoading(true);
    let newComponentToRender = null;

    switch (active) {
      case "home":
        newComponentToRender = <Home />;
        break;
      case "settings":
        newComponentToRender = <Settings />;
        break;
      case "normalUser":
        newComponentToRender = <PanelUser />;
        break;
      default:
        newComponentToRender = <Home />;
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
