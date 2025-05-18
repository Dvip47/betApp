import React, { useEffect, useState } from "react";
import Pagination from "../utilitycomponents/Pagination";
import axios from "axios";
import { Modal } from "@mantine/core";
import MatchResultsSetting from "../settings/MatchResultsSetting";
import useGetSports from "../utilityfunctions/GetSports";

export default function MatchResultManual() {

  const [pageNumber, setPageNumber] = useState(1);

  const [markets, setMarkets] = useState([])
  const [matches, setMatches] = useState([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [matchObj, setMatchObj] = useState({})
  const [matchData, setMatchData] = useState({})
  const [openMatchResultsModal, setOpenMatchResultsModal] = useState(false)
  const [openMatchMarketsModal, setOpenMatchMarketsModal] = useState(false)
  const [sportId, setSportId] = useState("4");
  const [matchName, setMatchName] = useState("");
  const [marketName, setMarketName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );

  const handleMatchResultsModalView = (match) => {
    // alert(match.marketId)
    if (match) {
      setMatchObj(match)
    } else {
      setMatchObj({})
    }
    setOpenMatchResultsModal(prev => !prev);

  };


  const handleMatchMarketsModalView = (match) => {
    if (match) {
      getBetsMarkets()
      setMatchData(match)
      setMatchName(match.match_name)
    }
    setOpenMatchMarketsModal(prev => !prev);

  };

  const getBetsMarkets = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBetsMarkets`,
        { pageno: pageNumber, limit: 40, sport_id: sportId, match_id: matchData.match_id }
      )
      if (res.status === 200) {
        setMarkets(res.data.markets)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const getMatches = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBetsMatches`,
        { pageno: pageNumber, limit: 40, sport_id: sportId }
      )
      if (res.status === 200) {
        setMatches(res.data.matches)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getMatches()
  }, [])
  useEffect(() => {
    getMatches()
  }, [pageNumber, sportId])

  useEffect(() => {
    getBetsMarkets()
  }, [matchData])
  const handleNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  const goToPage = (pgno) => {
    setPageNumber(pgno);
  };


  const handlePrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  }


  return (
    <>
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Match Result Manual</h1>
      </div>

      <div class="flex justify-start gap-x-3 items-center my-3">

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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        {/* <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Series Name
            </label>
            <input
              onChange={(e) => {
                setSeriesName(e.target.value);
              }}
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sereis Name"
              required
            />
          </div>
        </div> */}
        {/* match name */}
        {/* <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Match Name
            </label>
            <input
              onChange={(e) => {
                setMatchName(e.target.value);
              }}
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Match Name"
              required
            />
          </div>
        </div> */}
        {/* market name */}
        {/* <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Market Name
            </label>
            <input
              onChange={(e) => {
                setMarketName(e.target.value);
              }}
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Market Name"
              required
            />
          </div>
        </div> */}

      </div>


      <div class="relative overflow-x-auto min-h-[400px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="p_2 font-bold text-gray-100 bg-[#2F352E]">
            <tr>
              <th scope="col" class="px-6 py-3">
                S NO.
              </th>
              <th scope="col" class="px-6 py-3">
                Sport Name
              </th>
              <th scope="col" class="px-6 py-3">
                Match Name
              </th>
              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#0079BF]">
            {loading ? (
              <span>Loading</span>
            ) : (
              matches &&
              matches.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class="border-b p_2 font-bold text-gray-100"
                  >
                    <th class="px-6 py-2">
                      {index + 1}
                    </th>
                    <td class="px-6 py-2"> {item.sport_name}</td>
                    <td class="px-6 py-2"> {item.match_name}</td>

                    <td class="px-6 py-2 flex gap-x-2">
                      {" "}
                      <button
                        type="button"
                        onClick={() => handleMatchMarketsModalView(item)}
                        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded text-sm px-1.5 py-1 text-center "
                      >
                        Result
                      </button>

                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>




      <Pagination
        pageNumber={pageNumber}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        isLastPage={isLastPage}
        goToPage={goToPage} />

      <Modal
        opened={openMatchMarketsModal}
        onClose={() => handleMatchMarketsModalView()}
        // padding={0}
        size={"50%"}
        title={"Match Market Result Manager"}
      >


        <div class="relative overflow-x-auto min-h-[400px] rounded">
          <div className="flex items-center bg_1 text-gray-50 py-2 px-2">
            <p className="font-bold text-[1.0rem]">{`${matchData.series_name} - ${matchData.match_name}`}</p>
          </div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="p_2 font-bold text-gray-100 bg-[#2F352E]">
              <tr>
                <th className="px-3 py-1 max-w-[10px]">
                  S NO.
                </th>
                <th className="px-3 py-1">
                  MARKET NAME
                </th>
                <th className="px-3 py-1">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#0079BF]">
              {loading ? (
                <span>Loading</span>
              ) : (
                markets &&
                markets.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      class="border-b p_2 font-bold text-gray-100"
                    >
                      <th class="px-6 py-2 max-w-[10px] border-r">
                        {index + 1}
                      </th>
                      <td class="px-6 py-2"> {item.marketName}</td>
                      <td class="px-6 py-2 flex gap-x-2">
                        {" "}
                        <button
                          type="button"
                          disabled={item && item.isResultsComplete === true || false}
                          onClick={() => handleMatchResultsModalView(item)}
                          class={`${item && item.isResultsComplete === true ? "text-gray-50 bg-green-400 font-medium rounded text-sm px-1.5 py-1 text-center" : "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded text-sm px-1.5 py-1 text-center"}`}
                        >
                          {item && item.isResultsComplete === true ? "Results Complete":"Manage"}
                          
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Modal>
      <Modal
        opened={openMatchResultsModal}
        onClose={() => handleMatchResultsModalView()}
        size={""}
        title={"Manual Match Result Manager"}
      >

        <MatchResultsSetting sport_id={sportId} data={matchObj} setRefresh={setRefresh}  setOpenMatchResultsModal={setOpenMatchResultsModal} getBetsMarkets={getBetsMarkets} setOpenMatchMarketsModal={setOpenMatchMarketsModal} />
      </Modal>
    </>
  );
}
