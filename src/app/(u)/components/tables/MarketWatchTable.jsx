"use client"
import { fetcheInplayEventsBySportName, getInplayMatches } from "@/app/api/exchange";
import React, { useEffect, useState } from "react";

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Loading from "../Loading";
import MarketWatchNav from "../marketwatch/MarketNavigation";
import MatchesComponent from "../MatchesComponent";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";

const MarkerWatchTableComponent = () => {

  const [opened, setOpened] = useState(true);
  const [matches, setMatches] = useState([]);
  const [currentSport, setCurrentSport] = useState("");
  const [currentEventTypeId, setCurrentEventTypeId] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false)

 

  const onClick = () => {
    setOpened((prev) => !prev);
  };

  const runner = async (sportName, sport_id, page) => {
    const sportEventsData = await getInplayMatches(sportName, sport_id, page);
    if (sportEventsData != false) {

      const events = sportEventsData && sportEventsData.matches
      setIsLastPage(sportEventsData.isLastPage)
      if (events) {
        setEmpty(false);
        setMatches(events);
        setLoadingStatus(false);
        setInitialFetch(true);
      }
    }
    if (sportEventsData == false) {
      setEmpty(true);
      setMatches([]);
      setLoadingStatus(false);
      setInitialFetch(true);
    }
  };

  useEffect(() => {
    if (currentSport != "") {
      let spName = currentSport === "Soccer" ? "Football" : currentSport
      runner(spName, currentEventTypeId, currentPage);
    }
  }, [currentSport, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <MarketWatchNav setCurrentSport={setCurrentSport} currentSport={currentSport} setCurrentEventTypeId={setCurrentEventTypeId} setLoadingStatus={setLoadingStatus} />
      </div>


      <div className="min-h-[60vh]">
        <MatchesComponent
          onClick={onClick}
          events={matches}
          competitionTitle={currentSport}
          sportName={currentSport}
          eventTypeId={currentEventTypeId}
          opened={opened}
          canBet={false}
        />



        <div className="flex justify-end gap-x-2 items-center mt-4">
          {
            currentPage > 1 &&
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-between px-2 py-1 text-[0.885rem] bg_1 text-gray-100 rounded-md">
              <KeyboardArrowLeftRoundedIcon className="text-orange-400" fontSize="small" />
              {currentPage > 1 && currentPage - 1}
            </button>
          }
          {
            !isLastPage &&
            <button onClick={handleNextPage} className="flex items-center justify-between px-2 py-1 text-[0.885rem] bg_1 text-gray-100 rounded-md">
              Next
              <KeyboardArrowRightRoundedIcon className="text-orange-400" fontSize="small" />
            </button>
          }
        </div>

        {
          loadingStatus &&
          (
            <div className="flex justify-center items-center shadow-lg shadow-yellow-100/[0.1]">
              <Loading stylings={"min-h-[60vh]"} />
            </div>
          )
        }
        {
          initialFetch && empty && !loadingStatus &&
          (
            <div className="flex items-center py-4 mx-1 shadow-lg shadow-yellow-100/[0.1]">
              <p className="font-medium tracking-wide text-[0.8rem] text-gray-200">Oops, no events for {currentSport != "" && currentSport === "Football" ? "Soccer" : currentSport}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MarkerWatchTableComponent;
