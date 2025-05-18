import React, { useEffect, useState } from 'react'
import axios from "axios"


const MarketSetting = ({ sport_id, marketObj, data, setRefresh, setOpenMarketModal }) => {
  const [buttons, setButtons] = useState({
    max_bet_liability: 0,
    max_market_liability: 0,
    max_market_profit: 0
  })

  useEffect(() => {
    if (data != {}) {
      setButtons({
        max_bet_liability: data.max_bet_liability,
        max_market_liability: data.max_market_liability,
        max_market_profit: data.max_market_profit
      })
    }
  }, [data])

 
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token && marketObj != {}) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateMarketSetting`,
          {
            max_bet_liability: buttons.max_bet_liability,
            max_market_liability: buttons.max_market_liability,
            max_market_profit: buttons.max_market_profit,
            sport_id,
            market_id: marketObj.market_id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          alert(res.data.message)
          setRefresh(prev => !prev)
          setOpenMarketModal(prev => !prev);
        }

      }
    } catch (error) {
      console.error(error)                  
    }
  };


  return (
    <div className='w-full'>
      <div className="flex flex-col ">
        <lable className='t_c_1 p_1_sm'>Max Bet Liability</lable>
        <input type="number" name="" className='border border-gray-200 rounded px-3 py-1 p_2 t_c_1 font-medium' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            max_bet_liability: e.target.value
          }
        ))} id="" placeholder={buttons.max_bet_liability} value={buttons.max_bet_liability} />
      </div>

      <div className="flex flex-col ">
        <lable className='t_c_1 p_1_sm'>Max Market Liability</lable>
        <input type="number" name="" className='border border-gray-200 rounded px-3 py-1 p_2 t_c_1 font-medium' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            max_market_liability: e.target.value
          }
        ))} id="" placeholder={buttons.max_market_liability} value={buttons.max_market_liability} />
      </div>

      <div className="flex flex-col ">
        <lable className='t_c_1 p_1_sm'>Max Market Profit</lable>
        <input type="number" name="" className='border border-gray-200 rounded px-3 py-1 p_2 t_c_1 font-medium' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            max_market_profit: e.target.value
          }
        ))} id="" placeholder={buttons.max_market_profit} value={buttons.max_market_profit} />
      </div>

      <div className="flex items-center justify-end mt-4">
        <button type='button' className=" bg_1 text-gray-200 rounded p_4 px-2 py-1" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default MarketSetting