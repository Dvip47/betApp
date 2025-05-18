import { parseDateTime } from "@/app/(u)/utils/displayTime";
import { getAccountStatements } from "@/app/api/exchange";
import React, { useEffect, useState } from "react";

export default function AccountStatements() {

  const [userAccountStatements, setUserAccountStatements] = useState([]);
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    try {
      const account_statements = await getAccountStatements({
        username: username,
        start_date: startDate,
        end_date: endDate,
        filter: filter
      });
      setUserAccountStatements(account_statements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, username, filter]);

  const stylings = {
    header: `text-start p-3`,
    body: `px-3 py-2 text-gray-100 text-start text-[0.8rem] font-bold tracking-wide`
  };

  return (
    <div>
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4">Account Statement</h1>
      </div>
      <div className="flex gap-x-2 items-center my-3">
        <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              From date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              To date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="fdropdown flex flex-col justify-center items-center">
          <div className="w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="Free Chip">Free Chip</option>
              <option value="P & L">P & L</option>
              <option value="Settlement">Settlement</option>
            </select>
          </div>
        </div>
        <div className="fdropdown w-full flex-col justify-center items-center">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-[#ccc] focus:border-[#ccc] block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by User name or user id"
              required
            />
          </div>
        </div>
        <div className="pl-0 flex flex-wrap gap-1 mt-4">
          <button className="w-max font-medium rounded-sm text-sm px-[6px] py-[6px] me-2 bg-[#ffca10]">
            Download PDF
          </button>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-200 tracking-wider bg-gray-700 dark:bg-gray-700 dark:text-gray-200">
            <tr className="">
              <th scope="col" className={`${stylings.header}`}>
                Transactions ID
              </th>
              {/* <th scope="col" className={`${stylings.header}`}>
                Market ID
              </th> */}
              <th scope="col" className={`${stylings.header}`}>
                Settled Date
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Narration
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Debit
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Credit
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Running balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-500">
            {userAccountStatements.length>0 && userAccountStatements.map((item, index) => (
              <tr key={index} className={` whitespace-nowrap overflow-x-auto border-b border-gray-700 hover:bg-gray-900/[0.5]`}>
                <td className={`${stylings.body}`}>#-{item._id.slice(-6)}</td>
                {/* <td className={`${stylings.body}`}>{item.marketId}</td> */}
                <td className={`${stylings.body}`}>{parseDateTime(item.settledDate)}</td>
                <td className={`${stylings.body} whitespace-nowrap overflow-x-auto`}>{item.narration}</td>
                <td className={`${stylings.body} text-red-400`}>{parseFloat(item.debit).toFixed(2)}</td>
                <td className={`${stylings.body} text-green-400`}>{parseFloat(item.credit).toFixed(2)}</td>
                <td className={`${stylings.body} text-green-400`}>{parseFloat(item.runningBalance).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
