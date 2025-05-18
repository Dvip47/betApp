"use client"


import React from "react";


const HomeTable = () => {
  const adminList = [
    {
        username: "Krish Main Admin",
        creditRef: 200000,
        balance: 200000,
        partnership: 100,
        exposure: 1400,
        exposureLimit: "",
        availableBalance: 100000,
        refPL: 0,
        status: "Active",
        actions: ["Edit","Delete"]
    },
    {
        username: "Nate Main Admin",
        creditRef: 200000,
        balance: 200000,
        partnership: 100,
        exposure: 100,
        exposureLimit: "",
        availableBalance: 100000,
        refPL: 0,
        status: "Active",
        actions: ["Edit","Delete"]
    },
  ];
  return (
    <div>
      <table
        id="propertyTable"
        className="w-full text-sm text-left text-gray-900 text-gray-400"
      >
        <caption className="py-1 md:py-5 text-lg font-semibold text-left text-gray-900 bg-white bg-gray-100">
          Dashboard
        </caption>
        <thead className="text-xs text-gray-50 uppercase bg-gray-900 bg-gray-100">
          <tr>
            <th scope="col" className="md:px-6 px-1 py-3">
              User Name
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Credit Ref.
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Balance
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Partnership
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Exposure
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Exposure Limit
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Avail. Bal.
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Ref. P/L
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Status
            </th>
            <th scope="col" className="md:px-6 px-1 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody id="adminList">
          {adminList.length > 0 ? (
            adminList.map((admin, index) => (
              <tr
                key={index}
                className="bg-white border-b text-gray-700 border-gray-700"
              >
                <th
                  scope="row"
                  className="md:px-6 px-1 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  <p
                    onClick={() => alert("Opening Property page")}
                    className="hover:underline"
                  >
                    {admin.username}
                  </p>
                </th>
                <td className="md:px-6 px-1 py-4">{admin.creditRef}</td>
                <td className="md:px-6 px-1 py-4">{admin.balance}</td>
                <td className="md:px-6 px-1 py-4">{admin.partnership}</td>
                <td className="md:px-6 px-1 py-4">{admin.exposure}</td>
                <td className="md:px-6 px-1 py-4">{admin.exposureLimit}</td>
                <td className="md:px-6 px-1 py-4">{admin.availableBalance}</td>
                <td className="md:px-6 px-1 py-4">{admin.refPL}</td>
                <td className="md:px-6 px-1 py-4">{admin.status}</td>
                <td className="md:px-6 px-1 py-4">{admin.actions[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="md:px-6 px-1 py-4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
