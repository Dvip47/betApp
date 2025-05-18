import React, { useEffect, useState } from "react";
import Toggle from "../utilitycomponents/Toggle";
import useGetSports from "../utilityfunctions/GetSports";
import { formatHumanDate } from "@/app/(u)/utils/competitionCollase";
// import Pagination from "../utilitycomponents/Pagination";
import axios from "axios";
import { getCasinoBets } from "@/app/api/exchange/bets";
import {
  getCasinoProviders,
  sendHttpRequest,
} from "@/app/api/ship_yard/sender";

export default function Casinobethistory() {
  const [provider, setProvider] = useState("ALL");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [filterDate, setFilterDate] = useState({
    start: Date.now(),
    end: Date.now(),
  });
  const [fetchedData, setFetchedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [matchObj, setMatchObj] = useState({});
  const [refresh, setRefresh] = useState(false);

  const [openMatchModal, setOpenMatchModal] = useState(false);
  const handleMatchModalView = (match) => {
    if (match) {
      setMatchObj(match);
    }
    setOpenMatchModal((prev) => !prev);
  };

  const [dataObj, setDataObj] = useState({});
  const body = {
    game_name: username,
    pageno: pageNumber,
    game_name: provider,
    start_date: Date.now(),
    end_date: Date.now(),
    limit: "",
    status: status,
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCasinoBets(body);
      const data = response;
      setFetchedData(data.bets);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProviders = async () => {
    try {
      // setLoading(true);
      const response = await getCasinoProviders(body);
      const data = response;
      console.log(data);
      setDataObj((prev) => ({ ...prev, data: data, loading: false }));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username, filterDate, pageNumber, provider]);

  useEffect(() => {
    fetchData();
    fetchProviders();
  }, []);

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
          alert(res.data.message);
          fetchData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBet = async (bet_id) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        // setLoading(true);
        const res = await sendHttpRequest("/bets/delCasinoBets", "post", {
          bets: [bet_id],
        });
        if (res && res.status === 200) {
          alert(res.data.message);
          // setLoading(false);
          // getBets();
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Casino Bets</h1>
      </div>
      <div class="flex justify-start gap-x-3 items-center my-3">
        <div className="fdropdown flex  justify-center items-center ">
          <div class="w-[200px] mx-auto">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Casino Game
            </label>
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={"ALL"}>
                All Casino
              </option>
              {dataObj.loading ? (
                <span>Loading</span>
              ) : (
                dataObj &&
                dataObj.data &&
                dataObj.data.map((item, index) => {
                  return (
                    <option key={index} value={item.game_name}>
                      {item.game_name}
                    </option>
                  );
                })
              )}
            </select>
          </div>
        </div>
        <div className="fdropdown flex flex-col justify-center items-center">
          <div class="w-[200px] mx-auto ">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Market ID"
              required
            />
          </div>
        </div>
        <div className="fdropdown flex  justify-center items-center">
          <div className="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Start date
            </label>
            <input
              onChange={(e) => {
                setFilterDate((prev) => ({ ...prev, start: e.target.value }));
              }}
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="fdropdown flex  justify-center items-center">
          <div className="w-[200px]">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              End date
            </label>
            <input
              onChange={(e) => {
                setFilterDate((prev) => ({ ...prev, end: e.target.value }));
              }}
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
        </div>
      </div>

      <div class="relative overflow-x-auto min-h-[400px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-200  bg_1  dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Username
              </th>
              <th scope="col" class="px-6 py-3">
                Game
              </th>
              <th scope="col" class="px-6 py-3">
                Stack
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Bet Status
              </th>
              <th scope="col" class="px-6 py-3">
                P/L Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Placing Time
              </th>
              <th scope="col" class="px-6 py-3">
                Finishing Time
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-800/[0.1]">
            {loading ? (
              <td>loading</td>
            ) : (
              fetchedData &&
              fetchedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                      item.bet_status == "BET_WON"
                        ? "bg-green-300 text-black"
                        : item.bet_status == "BET_LOST" &&
                          "bg-red-300 text-black"
                    } hover:bg-gray-300`}
                  >
                    <td class="px-6 py-2">{item.user_id}</td>
                    <td class="px-6 py-2">{item.game_name}</td>
                    <td class="px-6 py-2 ">
                      {parseFloat(item.stack).toFixed(2)}
                    </td>
                    <td class="px-6 py-2">{item.status}</td>
                    <td class="px-6 py-2">{item.bet_status}</td>
                    <td class="px-6 py-2 ">
                      {parseFloat(item.result_amount).toFixed(2)}
                    </td>
                    <td class="px-6 py-2">
                      {formatHumanDate(item.betPlacingTime)}
                    </td>
                    <td class="px-6 py-2">
                      {formatHumanDate(item.betFinishingTime)}
                    </td>
                    <td class="px-6 py-2">
                      <p
                        className="text-white bg-red-500 p-2"
                        onClick={() => deleteBet(item._id)}
                      >
                        D
                      </p>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* <Pagination
        pageNumber={pageNumber}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        isLastPage={isLastPage}
        goToPage={goToPage}

      /> */}
    </>
  );
}
