import React, { useState } from "react";
import Toggle from "../utilitycomponents/Toggle";
import Pagination from "../utilitycomponents/Pagination";
import { useEffect } from "react";
import { Modal } from "@mantine/core";
import MarketSetting from "../settings/MarketSetting";
import axios from "axios";
import AddBookmaker from "../settings/AddBookmaker";

export default function MarketSettingsTable() {

  const [sportId, setSportId] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [matchName, setMatchName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [marketName, setMarketName] = useState("");
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false)
  const [marketObj, setMarketObj] = useState({})

  const [openMarketModal, setOpenMarketModal] = useState(false)
  const [openBookmakerModal, setOpenBookmakerModal] = useState(false)
  const handleMarketModalView = (mkt) => {
    if (mkt) {
      setSportId(mkt.sport_id)
      setMarketObj(mkt)
    }
    setOpenMarketModal(prev => !prev);
  };

  const body = {
    series_name: seriesName,
    market_name: marketName,
    match_name: matchName,
    pageno: pageNumber,
    sport_id: sportId,
    limit: "",
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllMarkets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const jsonData = await response.json();
      setFetchedData(jsonData.markets);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [refresh])
  useEffect(() => {
    fetchData();
  }, [matchName, pageNumber, sportId, marketName, seriesName]);


  const updateMarketStatus = async (sport_id, market_id, is_active) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateMarketStatus`,
          {
            sport_id: sport_id,
            market_id: market_id,
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
          fetchData();
        }

      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Market Setting</h1>
      </div>
      <div className="flex justify-start gap-x-3 items-center my-3">
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
        <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Match Name
            </label>
            <input
              onChange={(e) => {
                setMatchName(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Match Name"
              required
            />
          </div>
        </div>
        <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Market Name
            </label>
            <input
              onChange={(e) => {
                setMarketName(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Market Name"
              required
            />
          </div>
        </div>

        <div className="button self-end ">
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Manual Market
          </button>
        </div>
        <div className="button self-end ">
          <button
            type="button"
            onClick={() => setOpenBookmakerModal(true)}
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Book Marker
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S NO.
              </th>
              <th scope="col" className="px-6 py-3">
                SERIES NAME
              </th>
              <th scope="col" className="px-6 py-3">
                MATCH NAME
              </th>
              <th scope="col" className="px-6 py-3">
                MARKET NAME
              </th>
              <th scope="col" className="px-6 py-3">
                SETTING
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedData &&
              fetchedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">{item.competition_name}</td>
                    <td className="px-6 py-2">{item.match_name}</td>
                    <td className="px-6 py-2">{item.market_name}</td>
                    <td className="px-6 py-2">
                      {" "}
                      <button
                        type="button"
                        onClick={() => handleMarketModalView(item)}
                        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded-lg text-sm px-1.5 py-1 text-center "
                      >
                        Settings
                      </button>
                    </td>
                    <td className="px-6 ">
                      <Toggle
                        initialState={item.is_active === '1'}
                        onToggle={(isActive) => {
                          // console.log(`Toggle state changed to ${isActive} ${item.sport_id}`);
                          updateMarketStatus(`${item.sport_id}`, `${item.market_id}`, isActive ? "1" : "0")
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="">{loading && "Loading .."}</div>
      </div>
      <Pagination />

      <Modal
        opened={openMarketModal}
        onClose={() => handleMarketModalView()}
        size={""}
        title={"Market setting"}
        classNames={{
          root: '.mantine-Modal-title',
        }}
      >
        {/* Matket setting Component goes here */}
        <MarketSetting sport_id={sportId} marketObj={marketObj} data={marketObj} setRefresh={setRefresh} setOpenMarketModal={setOpenMarketModal} />
      </Modal>

      <Modal
        opened={openBookmakerModal}
        onClose={() => setOpenBookmakerModal(false)}
        size={""}
        title={"Add Bookmaker"}

      >
        <AddBookmaker sport_id={sportId} marketObj={marketObj} data={marketObj} setRefresh={setRefresh} setOpenBookmakerModal={setOpenBookmakerModal} />
      </Modal>
    </>
  );
}
