"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditUserById from "@/app/(u)/components/modals/EditUserById";
import Withdraw from "@/app/(u)/components/modals/Withdraw";
import ActionButton from "@/app/(u)/components/ActionButton";
import { Modal, Group, Tooltip } from '@mantine/core';
import SportsSettings from "@/app/(u)/components/modals/SportsSettings";
import EditCredit from "@/app/(u)/components/modals/EditCredit";
import UserStatusSettings from "@/app/(u)/components/modals/UserSettings";
import EditExposureLimit from "../modals/EditExposure";

const HomeUserTableComponent = ({ refresh, setRefresh, actions, controlSent }) => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [initialFetch, setInitialFetch] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openEditCredit, setOpenEditCredit] = useState(false);
  const [openEditExposureLimit, setOpenEditExposureLimit] = useState(false);
  const [openEditExposure, setOpenEditExposure] = useState(false);
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [openSportsSettings, setOpenSportsSettings] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState({})
  const [deleted, setDeleted] = useState(false)
  const [openDelete, setOpenDelete] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenEditUser(false);
        setRefresh(true);
      }, 1000);
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
  const handleCloseEditExposureLimit = () => {
    setOpenEditExposureLimit(false);
  };
  const handleCloseEditExposure = () => {
    setOpenEditExposure(false);
  };
  const handleCloseUserSettings = () => {
    setOpenUserSettings(false);
  };
  const handleCloseSportsSettings = () => {
    setOpenSportsSettings(false);
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
          if (res.status === 200) {
            if (res.data.statusCode === 404) {
              setLoading(false);
              setAdminList([]);
            } else if (res.data.statusCode === 200) {
              setLoading(false);
              setAdminList([res.data.other]);
            } else if (res.data.statusCode === 401) {
              setLoading(false);
              setSessionExpired(true)
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
          console.log(res.data);
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
    setOpenSportsSettings(true);
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
  const handleEditExposureLimit = (userObj) => {
    setUserData(userObj);
    setOpenEditExposureLimit(true);
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


    <div className=" overflow-x-auto shadow-md rounded">
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
            {
              actions && controlSent && (
                <th scope="col" className="px-3 py-3">
                  Actions
                </th>
              )
            }
          </tr>
        </thead>
        <tbody className="bg-gray-100">

          {adminList.length > 0 &&
            adminList.map((userObj) => (
              <tr key={userObj.username} className="border-b border-gray-300 hover:bg-gray-200/[0.5]">
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">{userObj.username}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">
                  <div className="flex justify-end items-center gap-x-2 z-10">
                    {parseFloat(userObj.creditRef).toFixed(2)}
                    {controlSent &&
                      <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Edit Credit Ref.">
                        <ActionButton icon="/edit.gif" styling="" alt="edit" onClick={() => handleEditCredit(userObj)} />
                      </Tooltip>
                    }
                  </div>
                </td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">{parseFloat(userObj.balance).toFixed(2)}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">{parseFloat(userObj.partnership).toFixed(2)}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">

                  <div className="flex justify-between items-center gap-x-1">
                    {parseFloat(userObj.exposure).toFixed(2)}
                    {/* {controlSent &&
                      <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Edit Exposure Limit">
                        <ActionButton icon="/edit.gif" styling="" alt="edit" onClick={() => handleEditExposureLimit(userObj)} />
                      </Tooltip>
                    } */}
                  </div>
                </td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">
                  <div className="flex justify-between items-center gap-x-1">
                    {parseFloat(userObj.exposureLimit).toFixed(2)}
                    {controlSent &&
                      <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Edit Exposure Limit">
                        <ActionButton icon="/edit.gif" styling="" alt="edit" onClick={() => handleEditExposureLimit(userObj)} />
                      </Tooltip>
                    }
                  </div>
                </td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">{parseFloat(userObj.availableBalance).toFixed(2)}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">{parseFloat(userObj.refPL).toFixed(2)}</td>
                <td className="px-3 py-2 border-r text-[0.8rem] text-end font-bold tracking-wide">{`${userObj.status.charAt(0).toUpperCase() + userObj.status.slice(1)}`}</td>
                {
                  actions && controlSent && (
                    <td className="px-3 py-1">
                      <div className="bg-gray-300 p-1 rounded flex items-center gap-x-1">
                        <Tooltip.Group>
                          <Group justify="center">
                            <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Banking">
                              <ActionButton icon="/banking.png" alt="withdraw" onClick={() => handleWithdraw(userObj)} />
                            </Tooltip>
                            <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Profit & Loss">
                              <ActionButton icon="/plflow.png" alt="p&l" onClick={() => alert("This feature is under maintenance, come back later")} />
                            </Tooltip>
                            <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Bet History">
                              <ActionButton icon="/history.png" alt="history" onClick={() => alert("This feature is under maintenance, come back later")} />
                            </Tooltip>
                            <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Status settings">
                              <ActionButton icon="/user_settings.gif" alt="edit" onClick={() => handleUserSettings(userObj)} />
                            </Tooltip>
                            {/* <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Sport Settings">
                          <ActionButton icon="/sport_settings.png" alt="edit" onClick={() => handleSportSettings(userObj)} />
                        </Tooltip> */}
                            <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Edit User">
                              <ActionButton icon="/edit.gif" alt="edit" onClick={() => handleEdit(userObj)} />
                            </Tooltip>
                            {/* <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Delete">
                          <ActionButton icon="/delete.png" alt="delete" onClick={() => handleOPenDelete(userObj)} />
                        </Tooltip> */}
                          </Group>
                        </Tooltip.Group>
                      </div>
                    </td>
                  )
                }
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
          <p className="text-sm"><span className="italic">{deleteUser.username}</span> will be deleted</p>
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
        title="Banking"
        size=""
      >
        <Withdraw
          setRefresh={setRefresh}
          userData={userData}
          controlSent={controlSent}
          setCloseModal={() => setTimeout(() => setOpenWithdraw(false), 500)}
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
          setCloseModal={() => setTimeout(() => setOpenEditCredit(false), 500)}
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
          setCloseModal={() => setTimeout(() => setOpenEditExposure(false), 500)}
        />
      </Modal>
      <Modal
        opened={openEditExposureLimit}
        onClose={() => handleCloseEditExposureLimit()}
        title="Edit Exposure Limit"
        size={""}
      >
        <EditExposureLimit
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={() => setTimeout(() => setOpenEditExposureLimit(false), 500)}
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
          setCloseModal={() => setTimeout(() => setOpenUserSettings(false), 500)}
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
          setCloseModal={() => setTimeout(() => setOpenSportsSettings(false), 500)}
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
          setCloseModal={() => setTimeout(() => setOpenEditUser(false), 500)}
        />
      </Modal>

      <Modal
        opened={sessionExpired}
        onClose={() => setSessionExpired(false)}
        title="Session Expired"
        size=""
      >
        <div className="flex items-center justify-between">
          <p className="t_c_1 p_1_sm font-bold">Your session Expired, please login </p>
          <button type="button" className="bg_1 text-gray-100 p_2 font-bold px-2 py-1 rounded"
            onClick={() => {
              setSessionExpired(false)
              localStorage.clear()
              window.location.replace("/login")
            }}>Login</button>
        </div>

      </Modal>
    </div>

  );
};

export default HomeUserTableComponent;


