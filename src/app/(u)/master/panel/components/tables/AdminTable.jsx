"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "@mantine/core";
import EditUserById from "@/app/(u)/components/modals/EditUserById";

const AdminTable = ({ refresh, setRefresh }) => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const userRole = "78545632";
  const [openEditUser, setOpenEditUser] = useState(false);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/normals`,
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
              console.log("setting main admin");
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

  const handleEdit = (userObj) => {
    
    setUserData(userObj);
    setOpenEditUser(true);
  };

  return (
    <div>
      <table
        id="propertyTable"
        className="w-full text-sm text-left text-gray-900 text-gray-400"
      >
        <caption className="py-1 md:py-5 text-lg font-semibold text-left text-gray-900 bg-white bg-gray-100">
          Normal User(s) Log
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
                <td className="md:px-6 px-1 py-4">
                  <div className="flex items-center">
                    <p
                      className="bg-orange-500 text-white cursor-pointer rounded p-1"
                      onClick={() => handleEdit(admin)}
                    >
                      Edit
                    </p>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="md:px-6 px-1 py-4">
                {loading
                  ? "Loading..."
                  : adminList.length === 0 && "No data at the moment"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        opened={openEditUser}
        onClose={() => handleCloseModal()}
        title="Edit User"
        size={"xl"}
      >
        <EditUserById setRefresh={setRefresh} userData={userData} setCloseModal={setCloseModal} />
      </Modal>
    </div>
  );
};

export default AdminTable;
