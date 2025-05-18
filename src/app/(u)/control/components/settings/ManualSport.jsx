import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ManualSport = ({sport_id, data, setRefresh, setOpenSportModal}) => {

  const [buttons, setButtons] = useState({
    sport_name: 0,
    
  })


 

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/addManualSport`,
          {
            sport_name: buttons.sport_name,
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
        <label className='p_1_sm t_c_1 font-medium'>Sport Name</label>
        <input type="text" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1 ' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            sport_name: e.target.value
          }
        ))} id="" placeholder={buttons.sport_name} value={buttons.sport_name}/>
      </div>

    

      <div className="flex items-center justify-end">
        <button type='button' className="bg_1 text-gray-200 rounded px-3 py-1 p_2" onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  )
}

export default ManualSport