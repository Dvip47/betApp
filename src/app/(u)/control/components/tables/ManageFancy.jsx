import React, { useEffect, useState } from "react";
import Pagination from "../utilitycomponents/Pagination";
import useGetSports from "../utilityfunctions/GetSports";
import axios from "axios";
import { Modal } from "@mantine/core";
import FancyCategoryMarketForm from "../FancyCategoryMarketForm";


export default function ManageFancy() {
  const [records, setRecords] = useState();
  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );

  const [sportId, setSportId] = useState("4");
  const [seriesId, setSeriesId] = useState("");
  const [matchName, setMatchName] = useState("");
  const [matchId, setMatchId] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [fetchedSeriesData, setFetchedSeriesData] = useState([]);
  const [fetchedMatchesData, setFetchedMatchesData] = useState([]);
  const [fetchedMarketsData, setFetchedMarketsData] = useState([]);
  const [error, setError] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  
  const [openManualModal, setOpenManualModal] = useState(false)
  const [inputs, setInputs] = useState({
    runs_yes: '',
    odds_yes: '',
    runs_no: '',
    odds_no: '',
    market_id: '',
    max_setting: '',
    max_market_setting: '',
  });

  const handleManualModalView = (manual) => {
    if (manual) {
      // setManualObj(manual)
    }
    setOpenManualModal(prev => !prev)
  };


  const handleChange = (e, market) => {
    const { name, value } = e.target;

    // Check if the market ID of the input matches the current market
    if (inputs.market_id !== market._id) {
      // If it doesn't match, reset all inputs and set the new market ID
      setInputs({
        runs_yes: market.runsYes,
        odds_yes: market.oddsYes,
        runs_no: market.runsNo,
        odds_no: market.oddsNo,
        market_id: market._id
      });
    }

    // Update the input value and the market ID
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
      market_id: market._id
    }));
  };


  useEffect(() => {
    console.log(inputs)
  }, [inputs])


  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage("")
    }, 400)
  }, [notificationMessage])

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
  const getFancyMarkets = async () => {
    const body_ = {
      pageno: "",
      match_id: matchId,
      limit: "",
      is_active: ""
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getFancyMarkets`,
        body_
      );
      if (response && response.status === 200) {
        setRecords(response.data.markets);
      }
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
      setFetchedMarketsData([])
      // setFetchedMarketSelectionsData([])
    } else {
      fetchSeries()
    }
  }, [sportId])

  useEffect(() => {
    if (seriesId === "") {
      setFetchedMatchesData([])
      setFetchedMarketsData([])
      // setFetchedMarketSelectionsData([])
    } else {
      fetchMatches()
    }
  }, [seriesId])

  useEffect(() => {
    if (matchId === "") {
      setRecords([])
    } else {
      getFancyMarkets()
    }
  }, [matchId])

  const suspendMarket = async (market) => {
    try {
      if (market) {
        const body = {
          match_id: matchId,
          market_id: market._id,
          suspended: market.suspended === "0" ? "1" : "0"
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/suspendMarket`,
          body
        )
        if (res) {
          alert(res.data.message)
          // setNotificationType("success")
          // setNotificationMessage(res.data.message)
          getFancyMarkets()
        }
      }
    } catch (error) {
      // console.error(error)
    }
  }

  const activateMarket = async (market) => {
    try {
      if (market) {
        const body = {
          match_id: matchId,
          market_id: market._id,
          is_active: market.is_active === "0" ? "1" : "0"
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/activateMarket`,
          body
        )
        if (res) {
          alert(res.data.message)
          // setNotificationType("success")
          // setNotificationMessage(res.data.message)
          getFancyMarkets()
        }
      }
    } catch (error) {
      // console.error(error)
    }
  }

  const ballRunFancy = async (market) => {
    try {
      if (market) {
        const body = {
          match_id: matchId,
          market_id: market._id,
          ball_running: market.ball_running === "0" ? "1" : "0"
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ballRunFancy`,
          body
        )
        if (res) {
          alert(res.data.message)
          // setNotificationType("success")
          // setNotificationMessage(res.data.message)
          getFancyMarkets()
        }
      }
    } catch (error) {
      // console.error(error)
    }
  }

  const updatedPriceOddsFancy = async (market) => {
    try {
      if (market && market._id === inputs.market_id) {
        const body = {
          match_id: matchId,
          market_id: market._id,
          ...inputs
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updatedPriceOddsFancy`,
          body
        )
        if (res) {
          alert(res.data.message)
          // setNotificationType("success")
          // setNotificationMessage(res.data.message)
          getFancyMarkets()
        }
      }
    } catch (error) {
      // console.error(error)
    }
  }

  return (
    <div className="relative">
      {/* {
        notificationMessage &&
        <div className="absolute right-0">
          <Notification message={notificationMessage} type={notificationType} />
        </div>
      } */}

      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4">Fancy Manager</h1>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex gap-x-3 items-center my-3">

          <div className="fdropdown flex  justify-center items-center ">
            <div class="w-[200px] mx-auto">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Sport Name{" "}
              </label>
              <select
                value={sportId}
                onChange={(e) => {
                  setSportId(e.target.value);
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value={""}>Please Select Sport</option>
                {dataObj.loading ? (
                  <span>Loading</span>
                ) : (
                  dataObj &&
                  dataObj.data && dataObj.data.eventTypes.map((item, index) => {
                    return (
                      <option key={index} value={item.sport_id}>
                        {item.sport_name}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>
          {/* series name */}
          <div class="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Series Name
            </label>
            <select
              value={seriesId}
              onChange={(e) => {
                const selectedSeriesId = e.target.value;
                const selectedSeries = fetchedSeriesData.find(item => item.competition_id === selectedSeriesId);
                if (selectedSeries) {
                  setSeriesId(selectedSeriesId);
                  setSeriesName(selectedSeries.competition_name); // Set seriesName here
                }
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={""}>Please Select Series</option>
              {fetchedSeriesData && fetchedSeriesData.length > 0 &&
                fetchedSeriesData.map((item, index) => (
                  <option key={index} value={item.competition_id}>
                    {item.competition_name}
                  </option>
                ))}
            </select>
          </div>
          {/* match name */}
          <div class="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Match Name
            </label>
            <select
              value={matchId}
              onChange={(e) => {
                const selectedMatchId = e.target.value;
                const selectedMatch = fetchedMatchesData.find(item => item.match_id === selectedMatchId);
                if (selectedMatch) {
                  setMatchId(selectedMatchId);
                  setMatchName(selectedMatch.match_name); // Set matchName here
                }
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={""}>Please Select Match</option>
              {fetchedMatchesData.length > 0 &&
                fetchedMatchesData.map((item, index) => (
                  <option key={index} value={item.match_id}>
                    {item.match_name}
                  </option>
                ))}
            </select>
          </div>

        </div>
        <div class="">

          <button type="button" onClick={()=>handleManualModalView()}  className={`${"bg-orange-500"}  text-gray-50 px-2 py-1 rounded`}>
            Add Category
          </button>
        </div>

      </div>

      <div className="relative overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-50 bg_1">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              {/* <th scope="col" className="px-6 py-3">
                  Market Name
                </th> */}
              <th scope="col" className="px-6 py-3">
                Market Name
              </th>
              <th scope="col" className="px-6 py-3">
                Back (Yes)
              </th>
              <th scope="col" className="px-6 py-3">
                Lay (No)
              </th>
              <th scope="col" className="px-6 py-3">
                Min/Max Setting
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-50">
            {records && records.length > 0 && records.map((record, index) => (
              <tr
                className="bg-blue-900 border-b dark:bg-gray-700 dark:border-gray-700 mb-1"
                key={index}
              >
                <td className="px-6 py-2 border-r border-blue-700">{record.category}</td>
                {/* <td className="px-6 py-2 border-r border-blue-700"></td> */}
                <td className="px-6 py-2 border-r border-blue-700">{record.marketName}</td>
                <td className="flex flex-col justify-end items-end px-2 border-r border-blue-700 py-1">
                  <div className="text-[0.803rem] font-bold flex items-center mb-1 space-x-2">
                    <label className="text-gray-200 text-[0.694rem]" htmlFor="runs_yes">Runs</label>
                    <input
                      type="number"
                      name="runs_yes"
                      id="runs_yes"
                      placeholder=""
                      className="bg-[#78B5EA]/[0.9] w-[70px] text-white rounded h-6 px-1 text-[0.694rem]"
                      value={inputs.market_id === record._id ? inputs.runs_yes : record.runsYes}
                      onChange={(e) => handleChange(e, record)}
                    />
                  </div>
                  <div className="text-[0.803rem] font-bold flex items-center space-x-2">
                    <label className="text-gray-200 text-[0.694rem]" htmlFor="odds_yes">Odds</label>
                    <input
                      type="number"
                      name="odds_yes"
                      id="odds_yes"
                      placeholder=""
                      className="bg-[#78B5EA]/[0.9] w-[70px] text-white rounded h-6 px-1 text-[0.694rem]"
                      value={inputs.market_id === record._id ? inputs.odds_yes : record.oddsYes}
                      onChange={(e) => handleChange(e, record)}
                    />
                  </div>
                </td>
                <td className="px-2 border-r border-blue-700 py-1">
                  <div className="text-[0.803rem] font-bold flex items-center mb-1 space-x-2">
                    <label className="text-gray-200 text-[0.694rem]" htmlFor="runs_no">Runs</label>
                    <input
                      type="number"
                      name="runs_no"
                      id="runs_no"
                      placeholder=""
                      className="bg-[#F5ACD4]/[0.9] w-[70px] text-white rounded h-6 px-1 text-[0.694rem]"
                      value={inputs.market_id === record._id ? inputs.runs_no : record.runsNo}
                      onChange={(e) => handleChange(e, record)}
                    />
                  </div>
                  <div className="text-[0.803rem] font-bold flex items-center space-x-2">
                    <label className="text-gray-200 text-[0.694rem]" htmlFor="odds_no">Odds</label>
                    <input
                      type="number"
                      name="odds_no"
                      id="odds_no"
                      placeholder=""
                      className="bg-[#F5ACD4]/[0.9] w-[70px] text-white rounded h-6 px-1 text-[0.694rem]"
                      value={inputs.market_id === record._id ? inputs.odds_no : record.oddsNo}
                      onChange={(e) => handleChange(e, record)}
                    />
                  </div>
                </td>
                <td className="flex flex-col justify-end items-end px-2 border-r border-blue-700 py-1">
                  <div className="text-[0.803rem] font-bold flex items-center mb-1 space-x-2">
                    <label className="text-gray-200 text-[0.694rem]" htmlFor="max_setting">maxBet</label>
                    <input
                      type="number"
                      name="max_setting"
                      id="max_setting"
                      placeholder=""
                      className="bg-black w-[70px] text-white rounded h-6 px-1 text-[0.694rem]"
                      value={inputs.market_id === record._id ? inputs.max_setting : record.maxSetting}
                      onChange={(e) => handleChange(e, record)}
                    />
                  </div>
                  <div className="text-[0.803rem] font-bold flex items-center space-x-2">
                    <label className="text-gray-200 text-[0.694rem]" htmlFor="max_market_setting">maxMarket</label>
                    <input
                      type="number"
                      name="max_market_setting"
                      id="max_market_setting"
                      placeholder=""
                      className="bg-black w-[70px] text-white rounded h-6 px-1 text-[0.694rem]"
                      value={inputs.market_id === record._id ? inputs.max_market_setting : record.ratingExposure}
                      onChange={(e) => handleChange(e, record)}
                    />
                  </div>
                </td>



                <td className="px-6 py-2">
                  <div className="bottom flex gap-x-3">

                    <button type="button" onClick={() => suspendMarket(record)} className={`${record.suspended === "0" ? "bg-orange-700" : "bg-orange-500"}  text-gray-50 px-2 py-1 rounded`}>
                      {record.suspended === "0" ? "Suspend" : "Suspended"}
                    </button>
                    <button type="button" onClick={() => ballRunFancy(record)} className={`${record.ball_running === "0" ? "bg-pink-700" : "bg-pink-500"}  text-gray-50 px-2 py-1 rounded`}>

                      {record.ball_running === "0" ? "Ball Stopped" : "Ball Running"}
                    </button>
                    <button type="button" onClick={() => activateMarket(record)} className={`${record.is_active === "0" ? "bg-green-700" : "bg-green-500"}  text-gray-50 px-2 py-1 rounded`}>

                      {record.is_active === "0" ? "Activate" : "Activated"}
                    </button>
                    <button type="button" onClick={() => updatedPriceOddsFancy(record)} className={`bg-blue-500  text-gray-50 px-2 py-1 rounded`}>
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      <Modal
        opened={openManualModal}
        onClose={() => handleManualModalView()}
        size={""}
      >
        <FancyCategoryMarketForm  handleManualModalView={handleManualModalView}/>
        
      </Modal>
    </div>
  );
}
