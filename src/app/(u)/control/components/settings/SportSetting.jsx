import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SportSetting = ({sport_id, data, setRefresh, setOpenSportModal}) => {

  const [buttons, setButtons] = useState({
    min_odds_limit: 0,
    max_odds_limit: 0,
    
  })

  useEffect(()=>{
    if(data!={}){
      setButtons({
        min_odds_limit: data.min_odds_limit,
        max_odds_limit: data.max_odds_limit,
      })
    }
  },[data])

  useEffect(() => {
    // console.log(buttons)
  }, [buttons])

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateSportSetting`,
          {
            min_odds_limit: buttons.min_odds_limit,
            max_odds_limit: buttons.max_odds_limit,
            pdc_charge: 0,
            pdc_refund: 0,
            sport_id: sport_id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          alert(res.data.message)
          setRefresh(prev=>!prev)
          setOpenSportModal(prev => !prev);
        }

      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <div className="flex flex-col ">
        <label className='p_1_sm t_c_1 font-medium'>Min Odd</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1 ' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            min_odds_limit: e.target.value
          }
        ))} id="" placeholder={buttons.min_odds_limit} value={buttons.min_odds_limit}/>
      </div>

      <div className="flex flex-col ">
        <label className='p_1_sm t_c_1 font-medium'>Max Odd</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1 ' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            max_odds_limit: e.target.value
          }
        ))} id="" placeholder={buttons.max_odds_limit} value={buttons.max_odds_limit}/>
      </div>

    

      <div className="flex items-center justify-end">
        <button type='button' className="bg_1 text-gray-200 rounded px-3 py-1 p_2" onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  )
}

export default SportSetting