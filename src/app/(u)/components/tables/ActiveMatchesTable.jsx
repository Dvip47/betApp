"use client"
import { fetcheInplayEventsBySportName, getInplayMatches } from "@/app/api/exchange";
import React, { useEffect, useState } from "react";

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Loading from "../Loading";
import ActiveMatchesNav from "../activeMatches/ActiveMatchesNavigation";
import MatchesComponent from "../MatchesComponent";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import ActiveMatchesComponent from "../ActiveMatchesComponent";
import ActiveMatchesTable from "../../control/components/tables/ActiveMatchesTable";

const ActiveMatchesTableComponent = () => {

  const [opened, setOpened] = useState(true);
  const [matches, setMatches] = useState([]);
  const [currentSport, setCurrentSport] = useState("");
  const [currentEventTypeId, setCurrentEventTypeId] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false)

  const [bets, setBets] = useState([])

  const getBets = async (currentEventTypeId) => {
    try {
      if (currentEventTypeId === null) {
        return
      }
      //   const res = await sendHttpRequest(`/bets/eventType`, "post", { eventTypeId: currentEventTypeId })
      const res = await sendHttpRequest(`/events/` + eventTypeId, "get")
      if (res.data.bets) {
        // console.log(res.data.bets)
        const betIds = res.data.bets.map(bet => bet.eventId)
        setBets(betIds)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBets(currentEventTypeId)
  }, [currentEventTypeId])


  const onClick = () => {
    setOpened((prev) => !prev);
  };

  const runner = async (sportName, currentEventTypeId, page) => {
    // const sportEventsData = await fetcheInplayEventsBySportName(sportName, page);
    const sportEventsData = await getInplayMatches(sportName, currentEventTypeId, page);
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
        <ActiveMatchesNav setCurrentSport={setCurrentSport} currentSport={currentSport} setCurrentEventTypeId={setCurrentEventTypeId} setLoadingStatus={setLoadingStatus} />
      </div>


      <div className="min-h-[60vh]">
        <ActiveMatchesTable
          filters={false}
          matches={matches}
        />
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

export default ActiveMatchesTableComponent;
