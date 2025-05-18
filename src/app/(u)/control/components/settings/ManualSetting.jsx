import React, {useEffect, useState} from 'react'
import useGetSports from "../utilityfunctions/GetSports";

const ManualSetting = () => {

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`
  );
  const [sportId, setSportId] = useState("");
  const [buttons, setButtons] = useState({
    sport_name: '',
    series_name: '',
    match_name: '',
    date: ''
  })
  
  useEffect(() => {
    console.log(buttons)
  }, [buttons])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:',buttons );
  };

  return (
    <div>

<div className="flex flex-col">
          
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-label">
              Sport Name{" "}
            </label>
            <select
              value={sportId}
              onChange={(e) => {
                setSportId(e.target.value);
              }}
              className='form-input rounded'
            >
              <option selected value={""}>Please Select Sport</option>
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

      

      <div className="flex flex-col ">
        <lable className='form-label'>Series Name</lable>
        <select
         className='form-input rounded'
         onChange={(e) => setButtons(prev => (
          {
              ...prev,
              series_name: e.target.value
          }
      ))} 
        >
          <option value="">Please select series</option>
          <option value="">EPL</option>
          <option value="">UEFA</option>
          <option value="">FIFA</option>
          <option value="">AFC</option>
        </select>
        
      </div>

      <div className="flex flex-col ">
        <lable className='form-label'>Match Name</lable>
        <input type="text"  name="" className='rounded form-input 'onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            match_name: e.target.value
                        }
                    ))} />
      </div>

      <div className="flex flex-col ">
        <lable className='form-label'>Date</lable>
        <input type="date"  name="" className='rounded form-input'onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            date: e.target.value
                        }
                    ))}/>
      </div>

      

      <div className="flex items-center justify-end">
        <button type='button' className="bg_1 text-gray-200 rounded px-3 py-1 p_2" onClick={handleSubmit}>Submit</button>
      </div>
    
    </div>
  )
}

export default ManualSetting