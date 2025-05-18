import React, { useEffect, useState } from "react";
import { formatHumanDate, formatTime } from "@/app/(u)/utils/competitionCollase";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import useGetSports from "../../utilityfunctions/GetSports";

export default function DeletedBets() {
  const [eventType, setEventType] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [allBets, setAllBets] = useState([])
  const [loading, setLoading] = useState(true)
  const [sportId, setSportId] = useState("");
  const [userName, setUserName] = useState("")
  const [selectedBets, setSelectedBets] = useState([])

  const getDeletedBets = async () => {
    try {
      setLoading(true)
      const res = await sendHttpRequest("/v1/getDeletedBets", "post", {
        pageno: "1", sport_id: sportId, user_name: userName, limit: "20"
      })
      if (res.data && res.data.bets) {
        if (res.data.bets.length > 0) {
          setAllBets(res.data.bets)
        } else {
          setAllBets([])
        }
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDeletedBets()
  }, [])

  useEffect(() => {
    getDeletedBets()
  }, [sportId, userName])

  const deleteBet = async (bet_id) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        setLoading(true)
        const res = await sendHttpRequest("/bets/delDeletedBets", "post", {
          bets: [bet_id]
        })
        if (res && res.status === 200) {
          alert(res.data.message);
          setLoading(false)
          getDeletedBets()
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
        const res = await sendHttpRequest("/bets/delDeletedBets", "post", {
          bets: selectedBets
        })
        if (res && res.status === 200) {
          alert(res.data.message);
          setLoading(false)
          setSelectedBets([]);
          getDeletedBets();
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
  const styles_01 = `px-3 py-1 border-r border-gray-800 text-[0.8rem] text-gray-700 font-bold tracking-wide`

  const custom_table_styles = {
    t_header: `border-[1px] border-[#000]  text-gray-100 text-start uppercase font-bold p_2 `
  }

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );

  return (
    <div className="overflow-x-auto">
      <div className="bg-[#333] w-full">
        <div className="bg-white inline-block p-[15px] w-full">
          <div className="mb-[20px] pb-[10px] w-full">
            <h2 className="text-[#000] text-[20px] m-0 p-0">Deleted Bets</h2>
          </div>
          <div className="row flex space-x-4 mb-2">
            <div className="pl-0">
              <div className="form-group">
                <label>Search UserName</label>
                <input
                  className="py-[6px] block px-[12px] text-[14px] w-full h-[36px] shadow-inset-custom border-[1px] border-[#ccc] focus:ring-[#ccc] focus:border-[#ccc]"
                  placeholder="Search By User"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row flex justify-end mb-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={deleteSelectedBets}
              disabled={loading || selectedBets.length === 0}
            >
              Delete Selected
            </button>
          </div>
          <div className="row">
            <div className="bg-[#eee] w-full">
              <div className="w-full">
                <table className="table mb-0 bg-transparent border-collapse border-spacing-0 w-full">
                  <thead className="w-full">
                    <tr className="bg_1">
                      <th className={`${custom_table_styles.t_header} max-w-[30px]`}>
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            setSelectedBets(
                              e.target.checked
                                ? allBets.map(bet => bet._id)
                                : []
                            )
                          }
                          checked={selectedBets.length === allBets.length && allBets.length > 0}
                        />
                      </th>
                      <th className={custom_table_styles.t_header}>S No.</th>
                      <th className={custom_table_styles.t_header}>Placed</th>
                      <th className={custom_table_styles.t_header}>Description</th>
                      <th className={custom_table_styles.t_header}>UserName</th>
                      <th className={custom_table_styles.t_header}>Type</th>
                      <th className={custom_table_styles.t_header}>Odds{" "}</th>
                      <th className={custom_table_styles.t_header}>Stack{" "}</th>
                      <th className={custom_table_styles.t_header}>Profit</th>
                      {/* <th className={custom_table_styles.t_header}>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {allBets.length > 0 && allBets.map((betObj, i) => {
                      return (
                        <tr key={i} className={`${betObj.type === "back" ? "bg-[#A7D8FD]" : "bg-[#F4A8BA]"} whitespace-nowrap overflow-x-auto border-b border-gray-700`}>
                          <td className={`${styles_01} max-w-[30px]`}>
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
                          <td className={styles_01}>{betObj.type === "back" ? <span className="">Back</span> : <span className="">Lay</span>}</td>
                          <td className={styles_01}>{parseFloat(betObj.price).toFixed(2)}</td>
                          <td className={styles_01}>{parseFloat(betObj.stack).toFixed(2)}</td>
                          <td className={`${styles_01} text-green-500`}>{(parseFloat(betObj.price).toFixed(2) - 1) * parseFloat(betObj.stack).toFixed(2)}</td>
                          {/* <td className={styles_01}><button disabled={loading} onClick={() => deleteBet(betObj._id)} className="bg-red-500 rounded px-2 py-1 text-gray-50">D</button></td> */}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
