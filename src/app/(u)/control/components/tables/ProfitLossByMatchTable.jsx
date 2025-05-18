import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProfitLossByMatchTable() {
  const router = useRouter();

  const [records, setRecords] = useState(null);
  const [marketBets, setMarketBets] = useState([]);

  const [active, setActive] = useState("");
  const [totalStack, setTotalStack] = useState("")

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounting/getPLMatchwise`,
          {
            start_date: "",
            end_date: "",
            match_id: active,
            market_id: "",
            sport_id: ""
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res && res.status === 200) {
          setTotalStack(res.data.total_stack)
          setRecords(res.data.matches);
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
            match_id: active,
            market_id: "",
            sport_id: ""
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          console.log(res.data.markets)
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
    if (active === "") return
    getMatchMarketBetsPL(active);
  }, [active]);

  const handleMatchNavigation = (match_id, market_id) => {
    router.push(`?pg=market_bets&match=${match_id}&market=${market_id}`);
  };

  const handleDropdown = (record_id) => {
    if (active === record_id) {
      setActive("");
    } else {
      setActive(record_id);
      // focusSeriesMatches(`${item.sport_id}`, `${item.competition_id}`);
    }
  };

  return (
    <>
      <div>
        <div className="heading_top border-b-[1px] border-b-black">
          <h1 className="text-xl font-semibold mb-4 ">
            Profit And Loss By Match
          </h1>
        </div>
        <div className="flex justify-start gap-x-3 items-center my-3">
          <div className="fdropdown flex flex-col justify-center items-center">
            <div className="w-[200px]">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                From date
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="fdropdown flex flex-col justify-center items-center">
            <div className="w-[200px]">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                To date
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="fdropdown w-full flex-col justify-center items-center">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by User name or user id"
                required
              />
            </div>
          </div>
          <div class="pl-0 flex  gap-1 mt-4">
            <button class="w-max font-medium rounded-sm text-sm px-[6px] py-[9px] mt-3 me-2 bg-[#ffca10]">
              Submit
            </button>
            <button class="w-max font-medium rounded-sm text-sm px-[6px] py-[9px] mt-3 me-2 bg-[#ffca10]">
              Download PDF
            </button>
            <button class="w-max font-medium rounded-sm text-sm px-[6px] py-[9px] mt-3 me-2 bg-[#ffca10]">
              Download CSV
            </button>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto ">
        <div className="w-full grid grid-cols-12 bg_1 items-center text-left text-[0.8rem] text-gray-50">
          <th className="col-span-5 px-2 py-1">
            U ID.
          </th>
          <th className="col-span-1 px-2 py-1 ">
            Stake
          </th>
          <th className="col-span-1 px-2 py-1 ">
            Player P/L
          </th>
          <th className="col-span-1 px-2 py-1 ">
            Downline
          </th>
          <th className="col-span-1 px-2 py-1 ">
            Comm
          </th>
          <th className="col-span-2 px-2 py-1 ">
            Casino comm
          </th>
          <th className="col-span-1 px-2 py-1 ">
            UPLINE PIL
          </th>
        </div>
        {records &&
          records.map((record, index) => {
            return (
              <div className="grid grid-col-12" key={index}>
                <div className="col-span-12 grid grid-cols-12 bg-blue-800 border-b border-gray-500 text-gray-50 text-[0.8rem] font-bold">
                  <div className="col-span-5 flex  items-center text-gray-100 text-[0.833rem] font-bold gap-2 p-1 border-r border-gray-500">
                    <span
                      className="bg-pink-500 rounded p-2 text-gray-100 cursor-pointer "
                      onClick={() => {
                        handleDropdown(record.match_id);

                      }}
                    >
                      {active === record.match_id ? "Close" : "Open"}
                    </span>
                    {/* {record.sport_name + "|" + record.match_name} */}
                    <p>{record.referred_name}</p>
                  </div>
                  <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-500">
                    {record.stack}
                  </div>
                  <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-500">
                    0
                  </div>
                  <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-500">
                    0
                  </div>
                  <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-500">
                    0
                  </div>
                  <div className="col-span-2 px-2 flex  items-center py-1 border-r border-gray-500">
                    0
                  </div>
                  <div className="col-span-1 px-2 py-1 ">
                    0
                  </div>
                </div>

                <div className="bg-gray-500 col-span-12 grid grid-cols-12 border">
                  {
                    marketBets.length > 0 && active === record.match_id &&
                    marketBets.map((marketBet, index) => {
                      return (
                        <div key={index}
                          className="col-span-12 grid grid-cols-12 bg-gray-500 border-b border-gray-500 text-gray-50 text-[0.8rem] font-bold">
                          <div className="col-span-5 flex  items-center text-gray-100 text-[0.833rem] font-bold gap-2 p-1 border-r border-gray-400">
                            <p className="pl-4 cursor-pointer hover:underline" onClick={() => handleMatchNavigation(marketBet.match_id, marketBet.market_id,)}>
                              {`${marketBet.market_name} | Round Id ${marketBet.market_id}  `}
                            </p>
                          </div>
                          <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-400">
                            {marketBet.stack}
                          </div>
                          <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-400">
                            0
                          </div>
                          <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-400">
                            0
                          </div>
                          <div className="col-span-1 px-2 flex  items-center py-1 border-r border-gray-400">
                            0
                          </div>
                          <div className="col-span-2 px-2 flex  items-center py-1 border-r border-gray-400">
                            0
                          </div>
                          <div className="col-span-1 px-2 py-1 ">
                            0
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

              </div>
            );
          })}
        {/* totals */}
        <div className="w-full grid grid-cols-12  items-center text-left text-[0.8rem] text-gray-50">
          <th className="col-span-5 px-2 text-end t_c_1 text-[0.833rem]">Totals</th>
          <div className="col-span-7 grid grid-cols-7 bg-gray-700 py-1 items-center text-left text-[0.8rem] text-gray-50">
            <th className="col-span-1 px-2 ">
              {totalStack && parseFloat(totalStack).toFixed(2)}
            </th>
            <th className="col-span-1 px-2 border-r  border-gray-500 ">
            </th>
            <th className="col-span-1 px-2 border-r  border-gray-500 ">
            </th>
            <th className="col-span-1 px-2 border-r  border-gray-500 ">
            </th>
            <th className="col-span-1 px-2 border-r  border-gray-500 ">
            </th>
            <th className="col-span-1 px-2 ">
            </th>
          </div>

        </div>


      </div>
    </>
  );
}

export default ProfitLossByMatchTable;
