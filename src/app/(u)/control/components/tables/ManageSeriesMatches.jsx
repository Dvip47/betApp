import React, { useState } from "react";
import Toggle from "../utilitycomponents/Toggle";
import Pagination from "../utilitycomponents/Pagination";
import { useEffect } from "react";
import useGetSports from "../utilityfunctions/GetSports";
import axios from "axios"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatHumanDate } from "@/app/(u)/utils/competitionCollase";



export default function ManageSeriesMatches() {
  const [sportId, setSportId] = useState("");
  const [status, setStatus] = useState("");
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [sportName, setSportName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [currentSeriesId, setCurrentSeriesId] = useState("")
  const [openeD, setOpeneD] = useState(false)

  const [pageNumber, setPageNumber] = useState(1);
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


  const [matches, setMatches] = useState([])
  const [error, setError] = useState("");
  const body = {
    series_name: seriesName,
    pageno: pageNumber,
    sport_id: sportId,
    limit: "",
    status: status,
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSeries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const jsonData = await response.json();
      setFetchedData(jsonData.series);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber, sportId, status, sportName, seriesName]);

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );

  const updateSeriesStatus = async (sport_id, series_id, is_active) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateSeriesStatus`,
          {
            sport_id: sport_id,
            series_id: series_id,
            is_active: is_active,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          alert(res.data.message)
          fetchData()
        }

      }
    } catch (error) {
      console.error(error)
    }
  }

  const focusSeriesMatches = async (sport_id, series_id) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMatches`,
          {
            sport_id: `${sport_id}`,
            series_id: `${series_id}`,
            pageno: "1",
            limit: "20"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200 && res.data.matches) {
          setMatches(res.data.matches)
        }

      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateMatchStatus = async (sport_id, match_id, is_active) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateMatchStatus`,
          {
            sport_id: sport_id,
            match_id: match_id,
            is_active: is_active,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          alert(res.data.message)
        }

      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-start gap-x-3 items-center my-3">
        <div className="fdropdown flex  justify-center items-center ">
          <div className="w-[200px] mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sport Name{" "}
            </label>
            <select
              value={sportId}
              onChange={(e) => {
                setSportId(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Series Name
            </label>
            <input
              onChange={(e) => {
                setSeriesName(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Series Name"
              required
            />
          </div>
        </div>
        <div className="button self-end ">
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Manual Series
          </button>
        </div>
      </div>

      <div className="relative bg-[#8A4B78]  w-full text-gray-100" >
        <div className="w-full p_2 text-left rtl:text-right">
          <div className="w-full grid grid-cols-12 bg_1">
            <th scope="col" className="px-6 py-3 col-span-4 ml-6">
              SERIES ID
            </th>
            <th scope="col" className="px-6 py-3 col-span-4">
              SERIES NAME
            </th>
            <th scope="col" className="px-6 py-3 col-span-4">
              ACTION
            </th>
          </div>

          {loading ? (
            <span>Loading</span>
          ) : (
            fetchedData &&
            fetchedData.map((item, index) => {
              return (
                <div className="grid grid-cols-12"
                  key={index}>
                  <div
                    className={`${item.competition_id === currentSeriesId ? "bg-blue-500/[0.8] text-gray-50" : ""} col-span-12 grid grid-cols-12 flex items-center border-b dark:bg-gray-800 dark:border-gray-700`}

                  >
                    <p className="col-span-4 px-6 py-2"><span className="mr-4">{index + 1}.</span>{item.competition_id}</p>
                    <p className="col-span-4 px-6 py-2">{item.competition_name}</p>
                    <div className="col-span-4 flex items-center gap-x-6">
                      <p className=" px-2 py-1 cursor-pointer hover:bg-blue-500/[0.5] bg-blue-900 rounded " onClick={() => {
                        if (currentSeriesId === item.competition_id) {
                          setOpeneD(prev => !prev)
                          setCurrentSeriesId("");
                        } else {
                          setCurrentSeriesId(item.competition_id);
                          setOpeneD(prev => !prev)
                          focusSeriesMatches(`${item.sport_id}`, `${item.competition_id}`);
                        }
                      }}>
                        Matches
                        {
                          currentSeriesId == item.competition_id ? (

                            openeD ? (
                              <ArrowDropUpIcon
                                className="text-orange-500"
                                fontSize="small"
                              />
                            ) : (
                              <ArrowDropDownIcon
                                className="text-orange-400"
                                fontSize="small"
                              />
                            )
                          ) : <ArrowDropDownIcon
                            className="text-orange-400"
                            fontSize="small"
                          />
                        }

                      </p>
                      <Toggle
                        initialState={item.is_active === '1'}
                        onToggle={(isActive) => {
                          updateSeriesStatus(`${item.sport_id}`, `${item.competition_id}`, isActive ? "1" : "0")
                        }}
                        className={`font-small`}
                      />
                    </div>
                  </div>
                  {
                    item.competition_id === currentSeriesId && currentSeriesId !== "" && (
                      <div className="col-span-12 bg-green-900/[0.5] m-1 rounded t_c_1">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="p_2 font-bold text-gray-100 bg-[#2F352E]">
                            <tr>
                              <th scope="col" className="px-6 py-1">
                                MATCH NAME
                              </th>
                              <th scope="col" className="px-6 py-1">
                                MATCH ID
                              </th>

                              <th scope="col" className="px-6 py-1">
                                OPEN DATE
                              </th>
                              <th scope="col" className="px-6 py-1">
                                ACTION
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-[#8A4B40]">
                            {
                              matches.length > 0 &&
                              matches.map((item, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className=" border-b text-gray-100"
                                  >
                                    <td className="px-6 py-2">{index + 1}{". "}{item.match_name}</td>
                                    <td className="px-6 py-2">{item.match_id}</td>
                                    <td className="px-6 py-2">{formatHumanDate(item.openDate)}</td>


                                    <td className="px-6 ">
                                      <Toggle
                                        initialState={item.is_active === '1'}
                                        onToggle={(isActive) => {
                                          updateMatchStatus(`${item.sport_id}`, `${item.match_id}`, isActive ? "1" : "0")
                                        }}
                                      />
                                    </td>
                                  </tr>
                                );
                              })
                            }

                            {
                              matches.length === 0 && (
                                <div className="flex items-center">
                                  <p>No data</p>
                                </div>
                              )
                            }
                          </tbody>
                        </table>

                      </div>
                    )
                  }

                </div>
              );
            })
          )}

        </div>
      </div>
      <Pagination
        pageNumber={pageNumber}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        isLastPage={isLastPage}
        goToPage={goToPage}

      />


    </div>
  );
}
