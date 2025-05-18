import axios from 'axios'
import React, { useEffect, useState } from 'react'


const FancyCategoryMarketForm = ({handleManualModalView}) => {

  const [fancyTemplates, setFancyTemplates] = useState([])
  const [marketData, setMarketData] = useState({
    market_name: '',
    category: "",
  })

  useEffect(() => {
    getFancyTemplates()
  }, [])



  const getFancyTemplates = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getFancyTemplates`,
        marketData
      )
      if (res && res.status === 200) {
        setFancyTemplates(res.data.templates)
      }
    } catch (error) {
      console.error(error)
    }
  };


  const addFancyCategoryTemplate = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/addFancyCategoryTemplate`,
        marketData
      )
      if (res && res.status === 200) {
        alert(res.data.message)
        handleManualModalView()
      }
    } catch (error) {
      console.error(error)
    }
  };


  return (
    <div className='w-full bg-gray-300 grid grid-cols-6 p-2 rounded'>
      <div className="col-span-6">
        <div className="flex flex-col ">
          <lable className='form-label'>Category Name</lable>
          <input type="text" name="" className='rounded  ' onChange={(e) => setMarketData(prev => (
            {
              ...prev,
              category: e.target.value
            }
          ))} />

        </div>
      </div>
      <div className="col-span-6">
        <div className="flex flex-col">
          <lable className='form-label'>Market Name</lable>
          <input type="text" name="" className='rounded  ' onChange={(e) => setMarketData(prev => (
            {
              ...prev,
              market_name: e.target.value
            }
          ))} />
        </div>
      </div>
      <div className="col-span-6 flex justify-end p-2">
        <div className="flex items-center justi">
          <button type='button' onClick={() => addFancyCategoryTemplate()} className="bg_1 text-gray-200 rounded px-3 py-2 p_2">Submit</button>
        </div>
      </div>

    </div>
  )
}

export default FancyCategoryMarketForm