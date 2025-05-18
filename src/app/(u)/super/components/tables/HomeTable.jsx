"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeTable = () => {
  const [superUserData, setSuperAdminUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("tk");
        if (token) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res) {
            console.log(res.data.other);
            if (res.status === 200) {
              setSuperAdminUserData(res.data.other);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
          {superUserData ? (
            <tr
              className="bg-white border-b text-gray-900 border-gray-700"
            >
              <th
                scope="row"
                className="md:px-6 px-1 py-4 font-medium text-gray-500 whitespace-nowrap"
              >
                <p
                  onClick={() => alert("Opening Property page")}
                  className="hover:underline"
                >
                  {superUserData.userName}
                </p>
              </th>
              <td className="md:px-6 px-1 py-4">{superUserData.creditRef}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.balance}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.partnership}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.exposure}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.exposureLimit}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.availableBalance}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.refPL}</td>
              <td className="md:px-6 px-1 py-4">{superUserData.status ? "Active":"Inactive"}</td>
              <td className="md:px-6 px-1 py-4">Edit</td>
            </tr>
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
