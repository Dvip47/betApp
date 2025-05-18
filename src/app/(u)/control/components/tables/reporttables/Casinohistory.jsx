import { formatHumanDate, formatTime } from "@/app/(u)/utils/competitionCollase";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import React, { useEffect, useState } from "react";
import useGetSports from "../../utilityfunctions/GetSports";

export default function Casinohistory() {
  const [eventType, setEventType] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bets, setBets] = useState([])
  const [filteredIds, setFilteredIds] = useState([])
  const [allBets, setAllBets] = useState([])
  const [selectedBets, setSelectedBets] = useState([]);  // Track selected bets
  const [loading, setLoading] = useState(true)
  const [gameName, setGameName] = useState("");
  const [userName, setUserName] = useState("")
  const [totalLiability, setTotalLiabilty] = useState("")
  const [totalProfit, setTotalProfit] = useState("")

  const getBets = async () => {
    try {
      setLoading(true)
      const res = await sendHttpRequest("/v1/getCasinoBetHistory", "post", {
        pageno: "1", game_name: gameName, user_name: userName, limit: 1000,startDate, endDate
      })
      if (res.data && res.data.bets) {
        setBets([])
        
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
  }, [gameName, userName, startDate, endDate])

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
        const res = await sendHttpRequest("/bets/delCasinoBets", "post", {
          bets: [bet_id]
        })
        if (res && res.status === 200) {

          alert(res.data.message);        
          getBets()
        }

      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  const deleteSelectedBets = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token && selectedBets.length > 0) {
        setLoading(true)
        const res = await sendHttpRequest("/bets/delCasinoBets", "post", {
          bets: selectedBets
        })
        if (res && res.status === 200) {
          alert(res.data.message);
          setSelectedBets([]);
          getBets();
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
  const styles_02 = `px-3 py-1 border-r border-gray-800 p_2 text-gray-700 text-start font-bold tracking-wide`

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
          <div className="mb-[20px] pb-[10px] w-full border-b border-gray">
            <h2 className="text-[#000] text-[20px] m-0 p-0 ">Casino Bets History</h2>
          </div>
          <div className="row flex space-x-4 mb-2 ">
            
            {/* <div className='flex flex-col col-span-1'>
              <label htmlFor="start_date" className='font-bold text-[0.8rem] '>Start Date</label>
              <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} placeholder='Start Date' className='text-gray-700 rounded bg-gray-300 p-1' />
            </div> */}

            {/* <div className='flex flex-col col-span-1'>
              <label htmlFor="end_date" className='font-bold text-[0.8rem] '>End Date</label>
              <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} placeholder='End Date' className='text-gray-700 rounded bg-gray-300 p-1 ' />
            </div> */}
          
            <div className=" pl-0">
              <div className="form-group">
                <label>Search by Game name</label>
                <input
                  className="py-[6px] block px-[12px] text-[14px] w-full h-[36px] shadow-inset-custom border-[1px] border-[#ccc] focus:ring-[#ccc] focus:border-[#ccc] "
                  placeholder="Search By Game "
                  type="text"

                  onChange={(e) => setGameName(e.target.value)}
                />
              </div>
            </div>
            <div className=" pl-0">
              <div className="form-group">
                <label>Search by Username</label>
                <input
                  className="py-[6px] block px-[12px] text-[14px] w-full h-[36px] shadow-inset-custom border-[1px] border-[#ccc] focus:ring-[#ccc] focus:border-[#ccc] "
                  placeholder="Search By User "
                  type="text"

                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
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
                     
                      <th className={custom_table_styles.t_header}>
                        Username
                      </th>
                      <th className={custom_table_styles.t_header}>
                      Game
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Stack{" "}
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Bet Status
                      </th>
                      <th className={custom_table_styles.t_header}>
                        P/L Amount
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Starting Time
                      </th>
                      <th className={custom_table_styles.t_header}>
                        Finishing Time
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
                          <tr key={i} className={`${betObj.bet_status === "BET_WON" ? "bg-[#A7D8FD] " : "bg-[#F4A8BA]"} whitespace-nowrap overflow-x-auto border-b border-gray-700`}>
                            <td className={`${styles_01} max-w-[30px] `}>
                              <input 
                                type="checkbox"
                                checked={selectedBets.includes(betObj._id)}
                                onChange={() => handleCheckboxChange(betObj._id)}
                              />
                            </td>
                            <td className={styles_02}>{`${betObj.user_name}`}</td>
                            <td className={styles_02}>{betObj.game_name}</td>
                            <td className={styles_02}>{parseFloat(betObj.stack).toFixed(2)}</td>
                            <td className={styles_02}>{betObj.bet_status}</td>
                            <td className={styles_02}>{parseFloat(betObj.result_amount).toFixed(2)}</td>
                            <td className={`${styles_02}`}>{formatHumanDate(betObj.betPlacingTime)}</td>
                            <td className={`${styles_02}`}>{formatHumanDate(betObj.betFinishingTime)}</td>
                            <td className={styles_02}><button disabled={loading} onClick={() => deleteBet(betObj._id)} className="bg-red-500 rounded px-2 py-1 text-gray-50">D</button></td>
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

