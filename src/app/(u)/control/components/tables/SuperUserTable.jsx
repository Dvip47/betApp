"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperUserTable = ({ refresh }) => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/control/supers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          console.log(res.data);
          if (res.status === 200) {
            if (res.data.statusCode === 404) {
              setLoading(false);
              setAdminList([]);
            } else if (res.data.statusCode === 200) {
              setLoading(false);
              console.log("setting admin");
              setAdminList(res.data.adminsData);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refresh === true) {
      fetchData();
    }
  }, [refresh]);

  return (
    <div>
      <table
        id="propertyTable"
        className="w-full text-sm text-left text-gray-900 text-gray-400"
      >
        <caption className="p-1 md:p-5 text-lg font-semibold text-left text-gray-900 bg-white bg-gray-100">
          Super User(s) Log
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
                    {admin.userName}
                  </p>
                </th>
                <td className="md:px-6 px-1 py-4">{admin.creditRef}</td>
                <td className="md:px-6 px-1 py-4">{admin.balance}</td>
                <td className="md:px-6 px-1 py-4">{admin.partnership}</td>
                <td className="md:px-6 px-1 py-4">{admin.exposure}</td>
                <td className="md:px-6 px-1 py-4">{admin.exposureLimit}</td>
                <td className="md:px-6 px-1 py-4">{admin.availableBalance}</td>
                <td className="md:px-6 px-1 py-4">{admin.refPL}</td>
                <td className="md:px-6 px-1 py-4">
                  {admin.status ? "Active" : "Inactive"}
                </td>
                <td className="md:px-6 px-1 py-4">Edit</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="md:px-6 px-1 py-4">{loading
                ? "Loading..."
                : adminList.length === 0 && "No data at the moment"}</td>
              
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuperUserTable;
