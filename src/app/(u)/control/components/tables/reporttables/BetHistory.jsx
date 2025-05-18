import { formatHumanDate, formatTime } from "@/app/(u)/utils/competitionCollase";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import React, { useEffect, useState } from "react";
import useGetSports from "../../utilityfunctions/GetSports";

export default function BetHistory() {
  const [eventType, setEventType] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bets, setBets] = useState([])
  const [filteredIds, setFilteredIds] = useState([])
  const [allBets, setAllBets] = useState([])
  const [selectedBets, setSelectedBets] = useState([]);  // Track selected bets
  const [loading, setLoading] = useState(true)
  const [sportId, setSportId] = useState("");
  const [userName, setUserName] = useState("")
  const [totalLiability, setTotalLiabilty] = useState("")
  const [totalProfit, setTotalProfit] = useState("")

  const getBets = async () => {
    try {
      setLoading(true)
      const res = await sendHttpRequest("/v1/getBetHistory", "post", {
        pageno: "1", sport_id: sportId, user_name: userName, limit: ""
      })
      if (res.data && res.data.bets) {
        setBets([])
        console.log(res.data)
        if (res.data.bets.length > 0) {
          setAllBets(res.data.bets)
          setTotalProfit(res.data.total_profit)
          setTotalLiabilty(res.data.total_liability)
        } else {
          setAllBets([])
          setTotalProfit("")
          setTotalLiabilty("")
        }
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBets()
  }, [])


  useEffect(() => {
    getBets()
  }, [sportId, userName])

  const filter_ = (eventType, startDate, endDate) => {
    let filteredBets = [...allBets];

    if (eventType && eventType !== "All") {
      filteredBets = filteredBets.filter(bet => bet.sportName === eventType);
    }
    if (startDate == endDate) {
      const parsedStartDate = new Date(startDate);
      const startDateYear = parsedStartDate.getFullYear();
      const startDateMonth = parsedStartDate.getMonth();
      const startDateDate = parsedStartDate.getDate();
      filteredBets = filteredBets.filter(acc => {
        const betCreatedAt = new Date(acc.createdAt);
        const betDateYear = betCreatedAt.getFullYear();
        const betDateMonth = betCreatedAt.getMonth();
        const betDateDate = betCreatedAt.getDate();
        return betDateYear == startDateYear && betDateMonth == startDateMonth && betDateDate == startDateDate;
      });
      setBets(filteredBets);
      const filterIds = filteredBets.map(bet => bet._id)
      setFilteredIds(filterIds)
      return
    }


    if (startDate) {
      const parsedStartDate = new Date(startDate);
      const startDateSeconds = parsedStartDate.getTime() / 1000; // Convert milliseconds to seconds
      // Filter bets by start date
      filteredBets = filteredBets.filter(bet => {
        const betDate = new Date(bet.createdAt);
        const betDateSeconds = betDate.getTime() / 1000; // Convert milliseconds to seconds
        return betDateSeconds >= startDateSeconds;
      });
    }

    if (endDate) {
      const parsedEndDate = new Date(endDate);
      const endDateSeconds = parsedEndDate.getTime() / 1000; // Convert milliseconds to seconds
      // Filter bets by end date
      filteredBets = filteredBets.filter(bet => {
        const betDate = new Date(bet.createdAt);
        const betDateSeconds = betDate.getTime() / 1000; // Convert milliseconds to seconds
        return betDateSeconds <= endDateSeconds;
      });
    }

    setBets(filteredBets);
    const filterIds = filteredBets.map(bet => bet._id);
    setFilteredIds(filterIds);

  }


  useEffect(() => {
    filter_(eventType, startDate, endDate)
  }, [eventType, startDate, endDate, allBets]);

  const deleteBet = async (bet_id) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        setLoading(true)
        const res = await sendHttpRequest("/bets/delBets", "post", {
          bets: [bet_id]
        })
        if (res && res.status === 200) {

          alert(res.data.message);
          setLoading(false)
          getBets()
        }

      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  const deleteSelectedBets = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token && selectedBets.length > 0) {
        setLoading(true)
        const res = await sendHttpRequest("/bets/delBets", "post", {
          bets: selectedBets
        })
        if (res && res.status === 200) {
          alert(res.data.message);
          setLoading(false)
          setSelectedBets([]);
          getBets();
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  const handleCheckboxChange = (betId) => {
    setSelectedBets(prevSelectedBets =>
      prevSelectedBets.includes(betId)
        ? prevSelectedBets.filter(id => id !== betId)
        : [...prevSelectedBets, betId]
    );
  }

  const betHistoryBtn = `px-3 py-1 bg-gray-500 text-gray-100 rounded`
  const styles_01 = `px-3 py-1 border-r border-gray-800 p_2 text-gray-700 text-end font-bold tracking-wide`

  const custom_table_styles = {
    t_header: `border-[1px] border-[#000] text-gray-100 text-start uppercase font-bold p_2 `
  }
  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );

  return (
    <div className="leading-[26px] text-[15px] ">
      <div className="bg-[#333] float-right  w-full ">
        <div className="bg-white inline-block p-[15px] w-full">
          <div className="mb-[20px] pb-[10px] w-full border-b-[2px] border-b-black">
            <h2 className="text-[#000] text-[20px] m-0 p-0 ">Bet History</h2>
          </div>
          <div className="row flex space-x-4 mb-2 ">
            <div className='flex flex-col col-span-1'>
              <label htmlFor="start_date" className='font-bold text-[0.8rem] '>Start Date</label>
              <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} placeholder='Start Date' className='text-gray-700 rounded bg-gray-300 p-1' />
            </div>

            <div className='flex flex-col col-span-1'>
              <label htmlFor="end_date" className='font-bold text-[0.8rem] '>End Date</label>
              <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} placeholder='End Date' className='text-gray-700 rounded bg-gray-300 p-1 ' />
            </div>
            <div className="fdropdown flex  justify-center items-center ">
              <div className='flex flex-col col-span-1'>
                <label htmlFor="end_date" className='font-bold text-[0.8rem] '>Sport Name</label>
                <select
                  value={sportId}
                  onChange={(e) => {
                    setSportId(e.target.value);
                  }}
                  className='text-gray-700 rounded bg-gray-300 p-1'
                >
                  <option selected value={""}>All Sport</option>
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
            <div className=" pl-0">
              <div className="form-group">
                <label>Search UserName</label>
                <input
                  className="py-[6px] block px-[12px] text-[14px] w-full h-[36px] shadow-inset-custom border-[1px] border-[#ccc] focus:ring-[#ccc] focus:border-[#ccc] "
                  placeholder="Search By User "
                  type="text"

                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                className={betHistoryBtn}
                type="button"
              >
                Matched
              </button>
              <button
                className={betHistoryBtn}
                type="button"
              >
                Unmatched
              </button>
              <button
                className={betHistoryBtn}
                type="button"
              >
                Past
              </button>
              <button
                className={betHistoryBtn}>
                Download CSV
              </button>
            </div>
          </div>
          <div className="row">
            <div className="usertable_area bg-[#eee]">
              <div className="w-full mb-2">
                <button 
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={deleteSelectedBets}
                  disabled={selectedBets.length === 0 || loading}
                >
                  Delete Selected
                </button>
              </div>
              <div className="w-full">
                <table className="table mb-0 bg-transparent border-collapse border-spacing-0 w-full ">
                  <thead className="">
                    <tr className="bg_1">
                      <th className={`${custom_table_styles.t_header} max-w-[30px]`}>
                        <input 
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBets(allBets.map(bet => bet._id));
                            } else {
                              setSelectedBets([]);
                            }
                          }}
                          checked={selectedBets.length === allBets.length}
                        />
                      </th>
                      <th className={`${custom_table_styles.t_header} max-w-[30px]`}>
                        S No.
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Placed
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Description
                      </th>
                      <th className={custom_table_styles.t_header}>
                        UserName
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Dealer
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Master
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Super master
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Bet Type
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Type
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Odds{" "}
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Stack{" "}
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Liability{" "}
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Potential Profit{" "}
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBets.length > 0 &&
                      allBets.map((betObj, i) => {
                        // console.log(betObj)
                        return (
                          <tr key={i} className={`${betObj.type === "back" ? "bg-[#A7D8FD] " : "bg-[#F4A8BA]"} whitespace-nowrap overflow-x-auto border-b border-gray-700`}>
                            <td className={`${styles_01} max-w-[30px] `}>
                              <input 
                                type="checkbox"
                                checked={selectedBets.includes(betObj._id)}
                                onChange={() => handleCheckboxChange(betObj._id)}
                              />
                            </td>
                            <td className={`${styles_01} max-w-[30px]`}>{`${i + 1}.`}</td>
                            <td className={styles_01}>{formatHumanDate(betObj.createdAt)}</td>
                            <td className={`px-3 border-r border-gray-800 text-gray-700`}>
                              <div className="flex flex-col">
                                <p className="p_3_sm leading-tight font-bold">{`${betObj.match_name}`}</p>
                                <p className="p_3_sm leading-tight font-bold">{`${betObj.match_name} - ${betObj.market_name} `}</p>
                                <p className="p_3_sm leading-tight font-bold">{`Bet ID:${(betObj._id)}`}</p>
                              </div>
                            </td>
                            <td className={styles_01}>{`${betObj.user_name}`}</td>
                            <td className={styles_01}></td>
                            <td className={styles_01}></td>
                            <td className={styles_01}></td>
                            <td className={styles_01}></td>
                            <td className={styles_01}>{betObj.type === "back" ? <span className="">Back</span> : <span className="">Lay</span>}</td>
                            <td className={styles_01}>{parseFloat(betObj.price).toFixed(2)}</td>
                            <td className={styles_01}>{parseFloat(betObj.stack).toFixed(2)}</td>
                            <td className={`${styles_01}`}>{parseFloat(betObj.potential_loss)}</td>
                            <td className={styles_01}>{parseFloat(betObj.potential_profit)}</td>
                            <td className={styles_01}><button disabled={loading} onClick={() => deleteBet(betObj._id)} className="bg-red-500 rounded px-2 py-1 text-gray-50">D</button></td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <div className=" w-full grid grid-cols-2 my-2">
                <div className="">
                  <h3 className="p_1_sm font-bold">
                    Total Liability: <span className="text-red-500 font-bold"> {totalLiability !== "" && totalLiability}</span>
                  </h3>
                </div>
                <div className="">
                  <h3 className="p_1_sm font-bold">
                    Total Profit: <span className="text-green-500 font-bold">{totalProfit !== "" && totalProfit}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

