import React, { useState } from "react";
import Pagination from "../utilitycomponents/Pagination";
import { useEffect } from "react";
import { formatHumanDate } from "@/app/(u)/utils/competitionCollase";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import useGetSports from "../utilityfunctions/GetSports";

export default function MatchRollbackTable() {


  const [sportId, setSportId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [matchName, setMatchName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [marketName, setMarketName] = useState("");
  const [marketId, setMarketId] = useState("");
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sports, setSports] = useState([])


  const [isLastPage, setIsLastPage] = useState(false)

  const handleNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  const goToPage = (pgno) => {
    setPageNumber(pgno);
  };


  const handlePrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleMarketModalView = () => {
    alert("Rollback feature is under maintainance!")
  };

  const body = {
    series_name: seriesName,
    market_name: marketName,
    market_id: marketId,
    match_name: matchName,
    pageno: pageNumber,
    sport_id: sportId,
    limit: "",
  };

  const getAllSports = async () => {
    try {
      const res = await sendHttpRequest(`/v1/getAllSports`, "get", body)
      if (res.status === 200) {
        if (res.data.eventTypes && res.data.eventTypes.length > 0) {
          setSports(res.data.eventTypes)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllSports()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSelections`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const jsonData = await response.json();
        // console.log(jsonData)
        setFetchedData(jsonData.selections);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchName, pageNumber, sportId, marketName, seriesName, marketId]);

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );
  return (
    <>
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Match Rollback</h1>
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="">
                Please Select Sport
              </option>
              {dataObj.loading ? (
                <span>Loading</span>
              ) : (
                dataObj &&
                dataObj.data.eventTypes.map((item, index) => {
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Match Name"
              required
            />
          </div>
        </div>
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Market Name"
              required
            />
          </div>
        </div>
        <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Market Id
            </label>
            <input
              onChange={(e) => {
                setMarketId(e.target.value);
              }}
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Market Id"
              required
            />
          </div>
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
                SELECTION NAME
              </th>
              <th scope="col" class="px-6 py-3">
                DATE
              </th>
              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#8A4B78]">
            {loading ? (
              <span>loading</span>
            ) : (
              fetchedData &&
              fetchedData.map((item, index) => {
                return (

                  <tr key={index} className={`border-b border-gray-300 hover:bg-gray-100/[0.2] text-gray-100`}>
                    <td class="px-6 py-2 font-medium text-gray-100 ">
                      {index + 1}
                    </td>
                    <td class="px-6 py-2">{item.sport_name}</td>
                    <td class="px-6 py-2">{item.competition_name}</td>
                    <td class="px-6 py-2">{item.match_name}</td>
                    <td class="px-6 py-2">{item.market_name}</td>
                    <td class="px-6 py-2">{item.market_id}</td>
                    <td class="px-6 py-2">{item.selection_name}</td>
                    <td class="px-6 py-2">{formatHumanDate(item.openDate)}</td>

                    <td class="px-6 ">
                      <button
                        type="button"
                        onClick={() => handleMarketModalView()}
                        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded text-sm px-1.5 py-1 text-center "
                      >
                        Rollback
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
        goToPage={goToPage}

      />


    </>
  );
}
