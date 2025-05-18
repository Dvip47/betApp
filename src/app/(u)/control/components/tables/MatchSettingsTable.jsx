import React, { useState } from "react";
import Toggle from "../utilitycomponents/Toggle";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import useGetSports from "../utilityfunctions/GetSports";
import { useEffect } from "react";
import { formatHumanDate } from "@/app/(u)/utils/competitionCollase";
import Pagination from "../utilitycomponents/Pagination";
import axios from "axios";
import { Modal } from "@mantine/core";
import MatchSetting from "../settings/MatchSettings";
import ManualSetting from "../settings/ManualSetting";

export default function MatchSettingsTable() {
  const [sportId, setSportId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState("");
  const [matchName, setMatchName] = useState("");
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [matchObj, setMatchObj] = useState({})
  const [manualObj, setManualObj] = useState({})
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

  const [openManualModal, setOpenManualModal] = useState(false)
  const handleManualModalView = (manual) => {
    if (manual) {
      setManualObj(manual)
    }
    setOpenManualModal(prev => !prev)
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
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Match Setting</h1>
      </div>
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
            onClick={() => handleManualModalView()}
            class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Manual Match
          </button>
        </div>
      </div>

      <div class="relative overflow-x-auto min-h-[400px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="p_2 font-bold text-gray-100 bg-[#2F352E]">
            <tr>

              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                DATE & TIME
              </th>
              <th scope="col" class="px-6 py-3">
                SETTING
              </th>
              {/* <th scope="col" class="px-6 py-3">
                ACTION
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-[#8A4B78]">
            {loading ? (
              <td>loading</td>
            ) : (
              fetchedData &&
              fetchedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class="border-b p_2 font-bold text-gray-100"
                  >

                    <td class="px-6 py-2">{item.match_name}</td>
                    <td class="px-6 py-2">{formatHumanDate(item.openDate)}</td>
                    <td class="px-6 py-2">
                      {" "}
                      <button
                        type="button"
                        onClick={() => handleMatchModalView(item)}
                        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded-lg text-sm px-1.5 py-1 text-center "
                      >
                        Settings
                      </button>
                    </td>
{/* 
                    <td class="px-6 ">
                      <Toggle
                        initialState={item.is_active === '1'}
                        onToggle={(isActive) => {
                          updateMatchStatus(`${item.sport_id}`, `${item.match_id}`, isActive ? "1" : "0")
                        }}
                      />
                    </td> */}
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

      <Modal
        opened={openManualModal}
        onClose={() => handleManualModalView()}
        size={""}
      >
        <div className="title">
          Add Matches
        </div>
        {/* Manual setting goes here */}
        <ManualSetting />
      </Modal>

    </>
  );
}
