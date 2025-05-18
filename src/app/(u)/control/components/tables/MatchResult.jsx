import React, { useEffect, useState } from "react";
import Pagination from "../utilitycomponents/Pagination";
import axios from "axios";
import { Modal } from "@mantine/core";
import MatchResultsSetting from "../settings/MatchResultsSetting";
import useGetSports from "../utilityfunctions/GetSports";

export default function MatchResult() {
  const [pageNumber, setPageNumber] = useState(1);
  const [markets, setMarkets] = useState([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)
  const [sportId, setSportId] = useState("");
  const [matchName, setMatchName] = useState("");
  const [marketName, setMarketName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [matchObj, setMatchObj] = useState({})
  const [openMatchResultsModal, setOpenMatchResultsModal] = useState(false)
  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );

  const handleMatchResultsModalView = (match) => {
    if (match) {
      setMatchObj(match)
    }
    setOpenMatchResultsModal(prev => !prev);
  };

  const getMatchResults = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMarketsUndeclared`,
        {
          pageno: pageNumber,
          sport_id: sportId,
          series_name: seriesName,
          match_name: matchName,
          market_name: marketName,
          limit: 40
        }
      )
      if (res.status === 200) {
        setMarkets(res.data.markets)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getMatchResults()
  }, [pageNumber, sportId, seriesName, matchName, marketName])
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
        <h1 className="text-xl font-semibold mb-4 ">Match Result</h1>
      </div>
      <div className="flex items-end my-2 justify-between">
        <div class="flex justify-start gap-x-3 items-center">
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
          <div className="fdropdown flex flex-col justify-center items-center">
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
          </div>
          {/* match name */}
          <div className="fdropdown flex flex-col justify-center items-center">
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
          </div>
          {/* market name */}
          <div className="fdropdown flex flex-col justify-center items-center">
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
          </div>
        </div>

        <div className="flex items-center justify-end ">
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded text-sm px-5 py-2.5 text-center "
          >
            Auto Result Declare
          </button>
        </div>
      </div>

      <div class="relative overflow-x-auto min-h-[400px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="p_2 font-bold text-gray-100 bg-[#2F352E]">
            <tr>
              <th scope="col" class="px-6 py-3">
                S NO.
              </th>
              <th scope="col" class="px-6 py-3">
                SPORT NAME
              </th>
              <th scope="col" class="px-6 py-3">
                SERIES NAME
              </th>
              <th scope="col" class="px-6 py-3">
                MATCH NAME
              </th>
              <th scope="col" class="px-6 py-3">
                MARKET NAME
              </th>
              <th scope="col" class="px-6 py-3">
                MARKET ID
              </th>
              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#8A4B78]">
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
                    <th class="px-6 py-2">
                      {index + 1}
                    </th>
                    <td class="px-6 py-2"> {item.sport_name}</td>
                    <td class="px-6 py-2"> {item.competition_name}</td>
                    <td class="px-6 py-2"> {item.match_name}</td>
                    <td class="px-6 py-2"> {item.market_name}</td>
                    <td class="px-6 py-2"> {item.market_id}</td>

                    <td class="px-6 py-2 flex gap-x-2">
                      {" "}
                      <button
                        type="button"
                        onClick={() => handleMatchResultsModalView(item)}
                        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded text-sm px-1.5 py-1 text-center "
                      >
                        Result
                      </button>
                      <button
                        type="button"
                        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded text-sm px-1.5 py-1 text-center "
                      >
                        Abandon
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
        opened={openMatchResultsModal}
        onClose={() => handleMatchResultsModalView()}
        size={""}
        title={"Result Declare"}
      >

        <MatchResultsSetting sport_id={sportId} data={matchObj} setRefresh={setRefresh} setOpenMatchResultsModal={setOpenMatchResultsModal} />
      </Modal>
    </>
  );
}