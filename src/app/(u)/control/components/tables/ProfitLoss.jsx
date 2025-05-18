import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProfitLoss() {
  const router = useRouter();

  const [records, setRecords] = useState(null);
  const [marketBets, setMarketBets] = useState([]);
  const [active, setActive] = useState("");
  const [totalStack, setTotalStack] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/control/normals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res && res.status === 200) {
          setRecords(res.data.adminsData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchMarketBetsPL = async (active) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounting/getMatchMarketBetsPL`,
          {
            start_date: "",
            end_date: "",
            username: active,
            market_id: "",
            sport_id: "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          setMarketBets(res.data.markets);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (active === "") return;
    getMatchMarketBetsPL(active);
  }, [active]);

  const handleDropdown = (record_id) => {
    setActive(active === record_id ? "" : record_id);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Profit and Loss By User
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full sm:w-auto"
            />
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full sm:w-auto"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="border rounded px-3 py-2"
              placeholder="Search by username or ID"
            />
          </div>
          <div className="flex items-end gap-2">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
              Submit
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300">
              Download PDF
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300">
              Download CSV
            </button>
          </div>
        </div>

        {/* User Records */}
        {records &&
          records.map((record, index) => {
            const totalStake = record.profitLoss.reduce(
              (sum, item) => sum + item.profitLoss,
              0
            ); // Calculate total stake
            const stakeColor =
              totalStake < 0 ? "text-red-500" : "text-green-500"; // Determine color

            return (
              <div key={index} className="border p-2 border-gray-200 mb-2">
                {/* User Row */}
                <div
                  className={`grid grid-cols-3 md:grid-cols-12 text-white   ${
                    active === record.username ? "bg-black" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-x-2  ${
                      record.username == active ? "text-white" : "text-black"
                    }`}
                  >
                    <span>{index + 1}.</span>
                    <p
                      className={`${record.username == active && "text-white"}`}
                    >
                      {record.username}
                    </p>
                  </div>

                  <div className={`${record.username == active ?"text-white" : "text-black"}`}>
                    P/L:{" "}
                    <span className={` ${stakeColor}`}>{totalStake.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() => handleDropdown(record.username)}
                      className="bg-blue-500 px-3 py-1  text-sm"
                    >
                      {active === record.username ? "Close" : "Open"}
                    </button>
                  </div>
                </div>

                {/* Profit/Loss Dropdown */}
                {active === record.username && (
                  <div className="bg-white mx-4 max-w-2xl">
                    {record.profitLoss.length > 0 ? (
                      record.profitLoss.map((marketBet, index) => (
                        <div
                          key={index}
                          className="flex items-center  border-b border-x border-gray-300 first:border-t text-sm"
                        >
                          <div className="grid grid-cols-2 px-2 w-full">
                            <div className="flex items-center">
                              <span className="">{`${marketBet.type} | ${marketBet.gameName}`}</span>
                            </div>
                            <div className="border-l p-1">
                              <span
                                className={`${
                                  marketBet.profitLoss < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {marketBet.profitLoss}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No profit/loss data available.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

      </div>
    </div>
  );
}

export default ProfitLoss;
