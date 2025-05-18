import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MatchSetting = ({ sport_id, data, setRefresh, setOpenMatchModal }) => {

  const [selectedOption, setSelectedOption] = useState(data.score_type);

  const [buttons, setButtons] = useState({
    max_stack: 0,
    min_stack: 0,
    volume_limit: 0,
    odd_limit: 0,
    score_key: 0,
    score_type: ""
  })


  useEffect(() => {
    if (data != {}) {
      setButtons({
        max_stack: data?.max_stack,
        min_stack: data.min_stack,
        volume_limit: data.volume_limit,
        odd_limit: data.odd_limit,
        score_key: data.score_key,
        score_type: data.score_type
      })
    }
  }, [data])


  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateMatchSetting`,
          {
            sport_id: data.sport_id,
            match_id: data.match_id,
            max_stack: buttons.max_stack,
            min_stack: buttons.min_stack,
            volume_limit: buttons.volume_limit,
            odd_limit: buttons.odd_limit,
            score_key: buttons.score_key,
            score_type: buttons.score_type
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
          setOpenMatchModal(prev => !prev);
        }

      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className='w-full flex flex-col gap-y-2'>
      <div className="flex flex-col">
        <label className='p_1_sm t_c_1 font-medium'>Max Stack</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            max_stack: e.target.value
          }
        ))} id="" placeholder={buttons.max_stack} />
      </div>

      <div className="flex flex-col ">
        <label className='p_1_sm t_c_1 font-medium'>Min Stack</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            min_stack: e.target.value
          }
        ))} id="" placeholder={buttons.min_stack} />
      </div>

      <div className="flex flex-col ">
        <label className='p_1_sm t_c_1 font-medium'>Volume Limit</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1 ' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            volume_limit: e.target.value
          }
        ))} id="" placeholder={buttons.volume_limit} />
      </div>

      <div className="flex flex-col ">
        <label className='p_1_sm t_c_1 font-medium'>OddsLimit</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            odd_limit: e.target.value
          }
        ))} id="" placeholder={buttons.odd_limit} />
      </div>

      <div className="">
        <p className='p_1_sm t_c_1 font-medium'> Score Type </p>
        <div className="flex items-center gap-x-4 border border-gray-200 p-3 rounded">

          <div>
            <p className='p_2 t_c_1 font-medium'> <label htmlFor="Ball By Ball" >Ball By Ball</label> </p>
            <input
              type="radio"
              id="Ball By Ball"
              value="ball_by_ball"
              checked={selectedOption === '2'}
              onChange={(e) => {
                setSelectedOption("2");
                setButtons(prev => (

                  {
                    ...prev,
                    score_type: "2"
                  }
                ))
              }}
              className='cursor-pointer'
            />

          </div>
          <div>
            <p> <label htmlFor="Ball By Ball" className='p_2 t_c_1 font-medium'>Betfair</label> </p>
            <input
              type="radio"
              id="Ball By Ball"
              value="betfair"
              checked={selectedOption === '1'}
              onChange={(e) => {
                setSelectedOption("1");
                setButtons(prev => (

                  {
                    ...prev,
                    score_type: "1"
                  }
                ))
              }}
              className='cursor-pointer'
            />

          </div>
        </div>
      </div>

      <div className="flex flex-col ">
        <label className='p_1_sm t_c_1 font-medium'>Score Key</label>
        <input type="number" name="" className='rounded border border-gray-200 t_c_1 p_2 px-3 py-1' onChange={(e) => setButtons(prev => (
          {
            ...prev,
            score_key: e.target.value
          }
        ))} id="" placeholder={buttons.score_key} />
      </div>

      <div className="flex items-center justify-end">
        <button type='button' className="bg_1 text-gray-200 rounded px-3 py-1 p_2" onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  )
}

export default MatchSetting