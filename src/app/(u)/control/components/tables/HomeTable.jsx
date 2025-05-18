"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "@mantine/core";
import EditUserById from "@/app/(u)/components/modals/EditUserById";
import Withdraw from "@/app/(u)/components/modals/Withdraw";

const HomeTable = ({ refresh, setRefresh }) => {
  const [adminObj, setAdminObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const userRole = "78545632";
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenEditUser(false);
        setRefresh(true);
      }, 2000);
    }
  }, [closeModal]);

  const handleCloseModal = () => {
    setOpenEditUser(false);
  };
  const handleCloseWithdraw = () => {
    setOpenWithdraw(false);
  };

  const fetchData = async () => {
    setLoading(true);
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
          console.log(res.data)
          if (res.status === 200) {
            if (res.data.statusCode === 404) {
              setLoading(false);
              setAdminObj([]);
            } else if (res.data.statusCode === 200) {
              setLoading(false);
              setAdminObj(res.data.other);
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

  const handleEdit = (userObj) => {
    setUserData(userObj);
    setOpenEditUser(true);
  };

 

  return (
    <div>
      <table
        id="propertyTable"
        className="w-full text-sm text-left rounded text-gray-400 "
      >
        <caption className="py-1 md:py-5 text-lg font-semibold text-left text-gray-900 bg-white bg-gray-100">
          Super User(s) Log
        </caption>
        <thead className="text-xs tracking-wider font-bold text-gray-100 bg-gray-900 ">
          <tr className="">
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody id="adminObj">
          {adminObj ? (
            <tr
              className="bg-white border-b text-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="md:px-6 px-1 py-1 font-medium text-gray-500 whitespace-nowrap"
              >
                <p
                  onClick={() => alert("Opening Property page")}
                  className="hover:underline"
                >
                  {adminObj.userName}
                </p>
              </th>
              <td className="md:px-6 px-1 py-1">{adminObj.creditRef}</td>
              <td className="md:px-6 px-1 py-1">{adminObj.balance}</td>
              <td className="md:px-6 px-1 py-1">{adminObj.partnership}</td>
              <td className="md:px-6 px-1 py-1">{adminObj.exposure}</td>
              <td className="md:px-6 px-1 py-1">{adminObj.exposureLimit}</td>
              <td className="md:px-6 px-1 py-1">{adminObj.availableBalance}</td>
              <td className="md:px-6 px-1 py-1">{adminObj.refPL}</td>
              <td className="md:px-6 px-1 py-1">
                {adminObj.status ? "Active" : "Inactive"}
              </td>
              <td className="md:px-6 px-1 py-1">
                <div className="flex items-center gap-x-1">
                  <p
                    className="bg-orange-500 text-white cursor-pointer rounded p-1"
                    onClick={() => handleEdit(adminObj)}
                  >
                    Edit
                  </p>
                  {/* <p
                    className="bg-green-500 text-white cursor-pointer rounded p-1"
                    onClick={() => handleWithdraw(adminObj)}
                  >
                    Withdraw
                  </p> */}
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td className="md:px-6 px-1 py-1">
                {loading
                  ? "Loading..."
                  : adminObj === 0 && "No data at the moment"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <Modal
        opened={openWithdraw}
        onClose={() => handleCloseWithdraw()}
        title="Withdraw"
        size={"xl"}
      >
        <Withdraw
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal> */}
      <Modal
        opened={openEditUser}
        onClose={() => handleCloseModal()}
        title="Edit Control Records"
        size={"xl"}
      >
        <EditUserById
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal>
    </div>
  );
};

export default HomeTable;
