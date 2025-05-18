import axios from "axios";
import React, {useState, useEffect} from "react";
import Pagination from "../utilitycomponents/Pagination";

function ProfitLossByUpline (){
  const [records, setRecords] = useState([])
  useEffect(() => {
    axios.get('')
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  },[])
  return(
    <div className="relative overflow-x-auto min-h-[400px]">
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Profit & Loss by Upline</h1>
      </div>
        <table className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr className="bg_1 text-white ">
            <th scope="col" className="px-6 py-3">U ID.</th>
            <th scope="col" className="px-6 py-3 ">STAKE</th>
            <th scope="col" className="px-6 py-3 ">PLAYERPIL</th>
            <th scope="col" className="px-6 py-3 ">DOWNLINE</th>
            <th scope="col" className="px-6 py-3 ">COMM</th>
            <th scope="col" className="px-6 py-3 ">CASINO COMM</th>
            <th scope="col" className="px-6 py-3 ">UPLINE PIL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td className="px-6 py-3" align="center">001</td>
            <td className="px-6 py-3" align="center">000</td>
            <td className="px-6 py-3" align="center">000</td>
            <td className="px-6 py-3" align="center">000</td>
            <td className="px-6 py-3" align="center">000</td>
            <td className="px-6 py-3" align="center">000</td>
            <td className="px-6 py-3" align="center">000</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default ProfitLossByUpline