"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditUserById from "@/app/(u)/components/modals/EditUserById";
import Withdraw from "@/app/(u)/components/modals/Withdraw";
import ActionButton from "@/app/(u)/components/ActionButton";
import UserSettings from "@/app/(u)/components/modals/UserSettings";
import { Modal, Group, Tooltip } from '@mantine/core';
import SportsSettings from "@/app/(u)/components/modals/SportsSettings";
import EditCredit from "@/app/(u)/components/modals/EditCredit";
import UserStatusSettings from "@/app/(u)/components/modals/UserSettings";

const MainAdminTable = ({ refresh, setRefresh }) => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const userRole = "78545632";
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openEditCredit, setOpenEditCredit] = useState(false);
  const [openEditExposure, setOpenEditExposure] = useState(false);
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [openSportsSettings, setOpenOpenSportsSettings] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState({})
  const [deleted, setDeleted] = useState(false)
  const [openDelete, setOpenDelete] = useState(false);

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
  const handleCloseEditCredit = () => {
    setOpenEditCredit(false);
  };
  const handleCloseEditExposure = () => {
    setOpenEditExposure(false);
  };
  const handleCloseUserSettings = () => {
    setOpenUserSettings(false);
  };
  const handleCloseSportsSettings = () => {
    setOpenOpenSportsSettings(false);
  };


  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/mainadmins`,
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

  const delUser = async (user) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tk");
      if (token) {

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/delete`,
          { user },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          if (res.status === 200) {
            if (res.data.statusCode === 404) {
              setLoading(false);
              setDeleted(false)
              console.log("failed")

            } else if (res.data.statusCode === 200) {
              setLoading(false);
              console.log("ok")
              setDeleted(true)
              setOpenDelete(false)
              setRefresh(true)
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (refresh === true) {
      fetchData();
    }
  }, [refresh]);

  const handleEdit = (userObj) => {
    setUserData(userObj);
    setOpenEditUser(true);
  };
  const handleSportSettings = (userObj) => {
    setUserData(userObj);
    setOpenOpenSportsSettings(true);
  };
  const handleUserSettings = (userObj) => {
    setUserData(userObj);
    setOpenUserSettings(true);
  };

  const handleWithdraw = (userObj) => {
    setUserData(userObj);
    setOpenWithdraw(true);
  };
  const handleEditCredit = (userObj) => {
    setUserData(userObj);
    setOpenEditCredit(true);
  };
  const handleEditExposure = (userObj) => {
    setUserData(userObj);
    setOpenEditExposure(true);
  };

  const handleDeleteUser = (user) => {
    delUser(user)
  }
  const handleOPenDelete = (user) => {
    setDeleteUser(user)
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }


  return (


    <div className="relative overflow-x-auto shadow-md rounded">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 tracking-wider bg-gray-700 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th scope="col" className="px-3 py-3">
              User Name
            </th>
            <th scope="col" className="px-3 py-3">
              Credit Ref.
            </th>
            <th scope="col" className="px-3 py-3">
              Balance
            </th>
            <th scope="col" className="px-3 py-3">
              Partnership
            </th>
            <th scope="col" className="px-3 py-3">
              Exposure
            </th>
            <th scope="col" className="px-3 py-3">
              Exposure Limit
            </th>
            <th scope="col" className="px-3 py-3">
              Avail. Bal.
            </th>
            <th scope="col" className="px-3 py-3">
              Ref. P/L
            </th>
            <th scope="col" className="px-3 py-3">
              Status
            </th>
            <th scope="col" className="px-3 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {adminList.length > 0 &&
            adminList.map((useObj) => (
              <tr key={useObj.userName} className="border-b border-gray-300 hover:bg-gray-200/[0.5]">
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{useObj.userName}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">
                  <div className="flex justify-between items-center gap-x-1">
                    {useObj.creditRef}
                 
                  </div>
                </td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{useObj.balance}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{useObj.partnership}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">
                  <div className="flex justify-between items-center gap-x-1">
                    {useObj.exposure}
                  </div>
                </td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{useObj.exposureLimit}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{useObj.availableBalance}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{useObj.refPL}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{`${useObj.status.charAt(0).toUpperCase() + useObj.status.slice(1)}`}</td>
                <td className="px-3 py-1">
                  <div className="bg-gray-300 p-1 rounded flex items-center gap-x-1">
                    <Tooltip.Group>
                      <Group justify="center">
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Banking">
                          <ActionButton icon="/banking.png" alt="withdraw" onClick={() => handleWithdraw(useObj)} />
                        </Tooltip>
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Profit & Loss">
                          <ActionButton icon="/plflow.png" alt="p&l" onClick={() => alert("This feature is under maintenance, come back later")} />
                        </Tooltip>
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Bet History">
                          <ActionButton icon="/history.png" alt="history" onClick={() => alert("This feature is under maintenance, come back later")} />
                        </Tooltip>
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Status settings">
                          <ActionButton icon="/user_settings.gif" alt="edit" onClick={() => handleUserSettings(useObj)} />
                        </Tooltip>
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Sport Settings">
                          <ActionButton icon="/sport_settings.png" alt="edit" onClick={() => handleSportSettings(useObj)} />
                        </Tooltip>
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Edit User">
                          <ActionButton icon="/edit.gif" alt="edit" onClick={() => handleEdit(useObj)} />
                        </Tooltip>
                        <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Delete">
                          <ActionButton icon="/delete.png" alt="delete" onClick={() => handleOPenDelete(useObj)} />
                        </Tooltip>
                      </Group>
                    </Tooltip.Group>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal
        opened={openDelete}
        onClose={() => handleCloseDelete()}
        title="Confirm Deletion"
        size=""
      >
        <div className="flex mb-3 justify-start items-center">
          <p className="text-sm"><span className="italic">{deleteUser.userName}</span> will be deleted</p>
        </div>
        <div className="flex justify-start items-center">
          <button
            className="bg-red-500 text-white cursor-pointer rounded p-1"
            onClick={() => handleDeleteUser(deleteUser)}
            disabled={loading}
          >
            {loading ? "Deleting .." : "Delete"}
          </button>
        </div>
      </Modal>
      <Modal
        opened={openWithdraw}
        onClose={() => handleCloseWithdraw()}
        title="Withdraw"
        size=""
      >
        <Withdraw
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal>
      <Modal
        opened={openEditCredit}
        onClose={() => handleCloseEditCredit()}
        title="Edit Credit Reference"
        size={""}
      >
        <EditCredit
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal>
      <Modal
        opened={openEditExposure}
        onClose={() => handleCloseEditExposure()}
        title="Edit Exposure"
        size={""}
      >
        <Withdraw
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal>
      <Modal
        opened={openUserSettings}
        onClose={() => handleCloseUserSettings()}
        title="Change Status"
        size={""}

      >
        <UserStatusSettings
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal>
      <Modal
        opened={openSportsSettings}
        onClose={() => handleCloseSportsSettings()}
        title="Sports Settings"
        size={""}

      >
        <SportsSettings
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={setCloseModal}
        />
      </Modal>
      <Modal
        opened={openEditUser}
        onClose={() => handleCloseModal()}
        title="Edit User"
        size=""
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

export default MainAdminTable;


