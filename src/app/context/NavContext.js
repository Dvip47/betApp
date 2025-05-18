import React, { createContext, useEffect, useState } from "react";

export const NAVContext = createContext();

export const NAVProvider = ({ children }) => {
    const [currentCenter, setCurrentCenter] = useState("home")
    const [view, setView] = useState({
        currentView: "",
        sideBarShow: true,
        from: "/",
        sportName: "",
        sportId: "",
        competitionName: "",
        competitionId: "",
        eventName: "",
        eventId: "",
        competitionRegion: "",
        showCompetition: false
    })

    return (
        <NAVContext.Provider
            value={{ currentCenter, setCurrentCenter, view, setView }}
        >
            {children}
        </NAVContext.Provider>
    );
};
