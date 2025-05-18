import React, { useState } from "react";
import useGetSports from "./utilityfunctions/GetSports";
import { useEffect } from "react";
import AddBookmaker from "./settings/AddBookmaker";

export default function BookmakerManager() {
  const [sportId, setSportId] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [fetchedBookmakerData, setFetchedBookmakerData] = useState([]);
  const [fetchedSeriesData, setFetchedSeriesData] = useState([]);
  const [fetchedMatchesData, setFetchedMatchesData] = useState([]);
  const [error, setError] = useState("");
  const [bookmakerStatus, setBookmakerStatus] = useState("OPEN")
  const [maxBet, setMaxBet] = useState("")
  const [minBet, setMinBet] = useState("")
  const [addBookmaker, setAddBookmaker] = useState(false)

  const [activeStatus, setActiveStatus] = useState({});
  const [selectedBookmakerMarket, setselectedBookmakerMarket] = useState("")
  const [backPrices, setBackPrices] = useState({});
  const [layPrices, setLayPrices] = useState({});



  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );


  useEffect(() => {
    if (addBookmaker === false) {
      getBookmakerMarkets()
    }
  }, [addBookmaker])
  const getBookmakerMarkets = async () => {
    try {

      const body_bookmaker = {
        sport_id: sportId,
        series_id: seriesId,
        match_id: matchId,
      };

      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBookmakerOdds`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body_bookmaker),
        }
      );

      const jsonData = await response.json();
      setFetchedBookmakerData(jsonData.bookmakerOdds);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };


  const fetchSeries = async () => {
    const seriesReqBody = {
      series_name: "",
      pageno: "",
      sport_id: sportId,
      limit: "1000",
      status: "2",
    };
    try {
      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSeries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(seriesReqBody),
        }
      );

      const jsonData = await response.json();
      setFetchedSeriesData(jsonData.series);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchMatches = async () => {
    const matchReqBody = {
      series_id: seriesId,
      match_name: "",
      pageno: "",
      sport_id: sportId,
      limit: "1000",
      status: "1",
    };
    try {
      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllMatches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchReqBody),
        }
      );

      const jsonData = await response.json();
      setFetchedMatchesData(jsonData.matches);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {

    if (sportId === "") {
      setFetchedSeriesData([])
      setFetchedMatchesData([])
    } else {
      fetchSeries()
    }
  }, [sportId])

  useEffect(() => {
    if (seriesId === "") {
      setFetchedMatchesData([])
    } else {
      fetchMatches()
    }
  }, [seriesId])


  useEffect(() => {
    getBookmakerMarkets()
  }, [sportId, seriesId, matchId])



  const updateBookmaker = async (market_id) => {

    const newBookmakerState = {
      backPrices,
      layPrices,
      bookmaker_market_id: market_id,
      activeStatus,
      bookmakerStatus
    }

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateBookmaker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBookmakerState),
        }
      );

      const jsonData = await response.json();
      alert(jsonData.message)
      getBookmakerMarkets()

    } catch (error) {
      setError(error);
    }
  };
  const deleteBookmaker = async (market_id) => {

    const body_to_send = {
      market_id: market_id
    }

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/deleteBookmaker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body_to_send),
        }
      );

      const jsonData = await response.json();
      alert(jsonData.message)
      getBookmakerMarkets()

    } catch (error) {
      setError(error);
    }
  };






  const handleCheckboxChange = (selectionId) => {
    console.log(selectionId)
    setActiveStatus(prevStatus => ({
      ...prevStatus,
      [selectionId]: !prevStatus[selectionId]
    }));
  };
  const handleBackPriceChange = (selectionId, value) => {
    setBackPrices(prevPrices => ({
      ...prevPrices,
      [selectionId]: value
    }));
  };

  const handleLayPriceChange = (selectionId, value) => {
    setLayPrices(prevPrices => ({
      ...prevPrices,
      [selectionId]: value
    }));
  };

  useEffect(() => {
    if (fetchedBookmakerData.length > 0) {
      const initialStatus = {};
      const initialBackPrices = {};
      const initialLayPrices = {};
      let overallStatus = "OPEN"; // Initialize overall status to OPEN
  
      fetchedBookmakerData.forEach((bookmaker) => {
        bookmaker.runner.forEach((runner) => {
          const selectionId = runner.selectionId;
          initialStatus[selectionId] = runner.status === "ACTIVE";
          initialBackPrices[selectionId] = (runner.back[0].price).toFixed(2);
          initialLayPrices[selectionId] = (runner.lay[0].price).toFixed(2);
        });
  
        // Aggregate status from all bookmakers
        if (bookmaker.status !== "") {
          overallStatus = bookmaker.status;
        }
      });
  
      setBookmakerStatus(overallStatus);
      setActiveStatus(initialStatus);
      setBackPrices(initialBackPrices);
      setLayPrices(initialLayPrices);
    }
  }, [fetchedBookmakerData]);
  
  return (
    <>
      <div className="heading_top border-b-[1px] flex items-center justify-between bg-gray-100 p-2 rounded-lg">
        <h1 className="text-[1.2rem] t_c_1 font-semibold ">Bookmaker Manager </h1>
        <button type="button" onClick={() => setAddBookmaker(prev => !prev)} className="bg-blue-500 text-gray-100 rounded p-2">
          Add Bookmaker
        </button>
      </div>

      {/* Filter */}
      {
        addBookmaker ?
          <AddBookmaker setAddBookmaker={setAddBookmaker} />
          : ""
      
      }

      {/* main body */}
      <div className="w-full mt-2">
        {fetchedBookmakerData.length > 0 && fetchedBookmakerData.length > 0 && fetchedBookmakerData.map((mkt, i1) => {

          return (
            <div className="flex flex-col bg-orange-500 px-2 py-3 mb-2 rounded">
              <div className="flex items-center justify-between">
                <p className="t_c_1 tracking-wide font-bold text-[1rem]">Match: {mkt.match_name}</p>
              </div>
              <div className="grid grid-cols-9 text-gray-200 font-bold text-[0.833rem]">
                <div className="col-span-4">
                  Runner Name
                </div>
                <div className="col-span-5 grid grid-cols-8">
                  <div className="col-span-2">
                    Back
                  </div>
                  <div className="col-span-2">
                    Lay
                  </div>
                  <div className="col-span-2">
                    Min/Max Setting
                  </div>
                  <div className="col-span-2">
                    Action
                  </div>
                </div>
              </div>
              {
                mkt.runner.map((runner_, i2) => (
                  <div className="grid grid-cols-9 items-center bg-gray-500 rounded mb-1 text-[0.803rem]" key={i2 + i1}>
                    <div className="col-span-4 text-gray-200 p-1 font-medium">
                      {runner_.name}
                    </div>
                    <div className="col-span-5 grid grid-cols-8 items-center">
                      <div className="col-span-2 font-medium flex">
                        <input
                          type="number"
                          name=""
                          id=""
                          placeholder={(runner_.back[0].price).toFixed(2)}
                          className="bg-[#78B5EA]/[0.9] w-[100px] text-white rounded h-6 px-1 text-center text-[0.694rem] text-white"
                          value={backPrices[runner_.selectionId] || ''}
                          onChange={(e) => handleBackPriceChange(runner_.selectionId, e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 font-medium flex">
                        <input
                          type="number"
                          name=""
                          id=""
                          placeholder={(runner_.lay[0].price).toFixed(2)}
                          className="bg-[#F5ACD4]/[0.9] w-[100px] text-white rounded h-6 px-1 text-center text-[0.694rem] text-white"
                          value={layPrices[runner_.selectionId] || ''}
                          onChange={(e) => handleLayPriceChange(runner_.selectionId, e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 flex flex-col items-end">
                        <div className="text-[0.803rem] font-bold flex items-center mb-1 space-x-2">
                          <label className="text-gray-200 text-[0.694rem]" htmlFor="max_setting">maxBet</label>
                          <input
                            type="text"
                            name="max_setting"
                            id="max_setting"
                            placeholder=""
                            className="bg-black w-[100px] text-white rounded h-6 px-1 text-[0.694rem] text-white"
                            value={maxBet ? maxBet : mkt.maxBet}
                            onChange={(e) => setMaxBet(e.target.value)}
                          />
                        </div>
                        <div className="text-[0.803rem] font-bold flex items-center space-x-2">
                          <label className="text-gray-200 text-[0.694rem]" htmlFor="max_market_setting">minBet</label>
                          <input
                            type="text"
                            name="max_market_setting"
                            id="max_market_setting"
                            placeholder=""
                            className="bg-black w-[100px] text-white rounded h-6 px-1 text-[0.694rem] text-white"
                            value={minBet ? minBet : mkt.minBet}
                            onChange={(e) => setMinBet(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-span-2 text-center t_c_1 p_1_sm font-medium">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="text-white"
                          checked={activeStatus[runner_.selectionId]}
                          onChange={() => handleCheckboxChange(runner_.selectionId)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }


              <div className="flex justify-end items-center">
                {
                  fetchedBookmakerData.length > 0 && (
                    <div className="flex items-center justify-center p-2 gap-x-4">
                      <div className="flex items-center gap-x-2">
                        <div className="col-span-4 t_c_1 p_1_sm font-medium gap-x-2">
                          <button
                            className={`text-gray-200 font-bold p_2 px-3 py-2 rounded ${bookmakerStatus === "OPEN" ? 'bg-green-500' : 'bg-red-500'}`}
                            onClick={() => setBookmakerStatus(bookmakerStatus === "OPEN" ? "SUSPENDED" : "OPEN")}
                          >
                            {bookmakerStatus === "OPEN" ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="text-gray-200 font-bold p_2 px-3 py-2 bg-red-600 rounded" type="button" onClick={() => deleteBookmaker(mkt._id)}>Delete Market</button>
                      </div>
                      <div className="flex items-center">
                        <button className="text-gray-200 font-bold p_2 px-3 py-2 bg_1 rounded" type="button" onClick={() => updateBookmaker(mkt._id)}>Save</button>
                      </div>
                    </div>
                  )
                }
              </div>

            </div>
          )
        })}

      </div>

    </>
  );
}
