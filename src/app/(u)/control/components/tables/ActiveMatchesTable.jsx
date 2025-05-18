import React, { useState } from "react";
import Toggle from "../utilitycomponents/Toggle";
import useGetSports from "../utilityfunctions/GetSports";
import { useEffect } from "react";
import { formatHumanDate } from "@/app/(u)/utils/competitionCollase";
import Pagination from "../utilitycomponents/Pagination";
import axios from "axios";
import { Modal } from "@mantine/core";
import MatchSetting from "../settings/MatchSettings";

export default function ActiveMatchesTable({ matches, filters }) {
  const [sportId, setSportId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState("");
  const [matchName, setMatchName] = useState("");
  // const [matches, setFetchedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [matchObj, setMatchObj] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
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

  const [openMatchModal, setOpenMatchModal] = useState(false)
  const handleMatchModalView = (match) => {
    if (match) {
      setMatchObj(match)
    }
    setOpenMatchModal(prev => !prev);
  };

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );
  const body = {
    match_name: matchName,
    pageno: pageNumber,
    sport_id: sportId,
    limit: "",
    status: status,
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllMatches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const jsonData = await response.json();
      setFetchedData(jsonData.matches);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [matchName, pageNumber, sportId, status]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
          fetchData()
        }

      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {
        filters === true &&
        <div class="flex justify-start gap-x-3 items-center my-3">
          <div className="fdropdown flex  justify-center items-center">
            <div class="w-[200px] mx-auto ">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="2">
                  All
                </option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
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
          <div className="button self-end ">
            <button
              type="button"
              class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Manual Series
            </button>
          </div>
        </div>
      }

      <div class="relative overflow-x-auto min-h-[400px] mt-1">
        <table class="w-full text-sm text-left rtl:text-right t_c_1 dark:text-gray-400">
          <thead class="text-xs text-gray-100 bg-[#2F352E] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                MATCH NAME
              </th>
              <th scope="col" class="px-6 py-3">
                SERIES NAME
              </th>
              <th scope="col" class="px-6 py-3">
                DATE & TIME
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#8A4B78] text-gray-100">
            {loading ? (
              <td>loading</td>
            ) : (
              matches &&
              matches.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class={`border-b border-gray-900 p_2 font-bold ${index%2===0?"":""}`}
                  >

                    <td class="px-6 py-2">{item.match_name}</td>
                    <td class="px-6 py-2">{item.series_name}</td>
                    <td class="px-6 py-2">{formatHumanDate(item.openDate)}</td>

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

      <Modal
        opened={openMatchModal}
        onClose={() => handleMatchModalView()}
        size={""}
        title={"Match setting"}
      >
        {/* Match Component goes here */}
        <MatchSetting sport_id={sportId} data={matchObj} setRefresh={setRefresh} setOpenMatchModal={setOpenMatchModal} />
      </Modal>

    </>
  );
}
