"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditUserById from "@/app/(u)/components/modals/EditUserById";
import Withdraw from "@/app/(u)/components/modals/Withdraw";
import ActionButton from "@/app/(u)/components/ActionButton";
import { Modal, Group, Tooltip } from "@mantine/core";
import SportsSettings from "@/app/(u)/components/modals/SportsSettings";
import EditCredit from "@/app/(u)/components/modals/EditCredit";
import UserStatusSettings from "@/app/(u)/components/modals/UserSettings";
import EditExposureLimit from "../modals/EditExposure";
import Plmanager from "../modals/Plmanager";

const UsersTableComponent = ({
  refresh,
  setRefresh,
  userType,
  controlSent,
  ctlSent,
  levelId,
  isScOrCtl,
}) => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);
  const [userData, setUserData] = useState({});
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openCustomizer, setOpenCustomizer] = useState(false);
  const [openBanking, setOpenBanking] = useState(false);
  const [openPlmanager, setOpenPlmanager] = useState(false);
  const [openEditCredit, setOpenEditCredit] = useState(false);
  const [openEditExposureLimit, setOpenEditExposureLimit] = useState(false);
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [openSportsSettings, setOpenSportsSettings] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [deleted, setDeleted] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // clear status notification and let user continue browsing
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 1000);
  }, [errorMessage, successMessage]);

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
  const handleCloseCustomizer = () => {
    setOpenCustomizer(false);
  };
  const handleCloseBanking = () => {
    setOpenBanking(false);
  };
  const handleCloseEditCredit = () => {
    setOpenEditCredit(false);
  };
  const handleCloseEditExposureLimit = () => {
    setOpenEditExposureLimit(false);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${
            isScOrCtl === false
              ? userType
              : `control/${userType === "agents" ? "panels" : userType}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          if (res.status === 200) {
            setInitialFetch(true);
            if (res.data.statusCode === 404) {
              setLoading(false);
              setAdminList([]);
            } else if (res.data.statusCode === 200) {
              setLoading(false);
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
              setDeleted(false);
            } else if (res.data.statusCode === 200) {
              setLoading(false);
              setDeleted(true);
              setOpenDelete(false);
              setRefresh(true);
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
  const handleTemplateEdit = (userObj) => {
    setUserData(userObj);
    setOpenCustomizer(true);
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
    setOpenBanking(true);
  };
  const handlePlmanager = (userObj) => {
    setUserData(userObj);
    setOpenPlmanager(true);
  };
  const handleEditCredit = (userObj) => {
    setUserData(userObj);
    setOpenEditCredit(true);
  };
  const handleEditExposureLimit = (userObj) => {
    setUserData(userObj);
    setOpenEditExposureLimit(true);
  };

  const handleDeleteUser = (user) => {
    delUser(user);
  };
  const handleOPenDelete = (user) => {
    setDeleteUser(user);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="p_2 text-gray-200 tracking-wider bg_1 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th scope="col" className="px-3 py-3">
              User Name
            </th>
            {/* <th scope="col" className="px-3 py-3">
              Credit Ref.
            </th> */}
            <th scope="col" className="px-3 py-3">
              Balance
            </th>
            <th scope="col" className="px-3 py-3">
              Ref. P/L
            </th>
            <th scope="col" className="px-3 py-3">
              Avail. Bal.
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
              Status
            </th>
            <th scope="col" className="px-3 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {adminList.length === 0 && initialFetch && (
            <tr className="px-3 py-2 p_3 font-bold tracking-wide">
              No data at the moment
            </tr>
          )}
          {adminList.length > 0 &&
            adminList.map((useObj) => (
              <tr key={useObj.username} className="border-b border-gray-400 ">
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  {useObj.username}
                </td>
                {/* <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  <div className="flex justify-end items-center gap-x-2">
                    {parseFloat(useObj.creditRef).toFixed(2)}
                    <Tooltip
                      openDelay={500}
                      closeDelay={100}
                      position="bottom-start"
                      offset={2}
                      arrowPosition="side"
                      arrowOffset={15}
                      arrowSize={5}
                      arrowRadius={2}
                      withArrow
                      label="Edit Credit Ref."
                    >
                      <ActionButton
                        icon="/edit.gif"
                        styling=""
                        alt="edit"
                        onClick={() => handleEditCredit(useObj)}
                      />
                    </Tooltip>
                  </div>
                </td> */}
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  {parseFloat(useObj.balance).toFixed(2)}
                </td>
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  {parseFloat(useObj.refPL).toFixed(2)}
                </td>
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  {parseFloat(useObj.availableBalance).toFixed(2)}
                </td>
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  {parseFloat(useObj.partnership).toFixed(2)}
                </td>
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  <div className="flex justify-between items-center gap-x-1">
                    {parseFloat(useObj.exposure).toFixed(2)}
                  </div>
                </td>
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">
                  <div className="flex justify-between items-center gap-x-1">
                    {parseFloat(useObj.exposureLimit).toFixed(2)}
                    <Tooltip
                      openDelay={500}
                      closeDelay={100}
                      position="bottom-start"
                      offset={2}
                      arrowPosition="side"
                      arrowOffset={15}
                      arrowSize={5}
                      arrowRadius={2}
                      withArrow
                      label="Edit Exposure Limit"
                    >
                      <ActionButton
                        icon="/edit.gif"
                        styling=""
                        alt="edit"
                        onClick={() => handleEditExposureLimit(useObj)}
                      />
                    </Tooltip>
                  </div>
                </td>
               
                <td className="px-3 py-2 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide">{`${
                  useObj.status.charAt(0).toUpperCase() + useObj.status.slice(1)
                }`}</td>
                <td className="px-3 py-1">
                  <div className="bg-gray-300 p-1 rounded flex items-center gap-x-1">
                    <Tooltip.Group>
                      <Group justify="center">
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Banking"
                        >
                          <ActionButton
                            icon="/banking.png"
                            alt="withdraw"
                            onClick={() => handleWithdraw(useObj)}
                          />
                        </Tooltip>
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="P/L Manager"
                        >
                          <ActionButton
                            icon="/icons8-profit-loss-32.png"
                            alt="plmanager"
                            onClick={() => handlePlmanager(useObj)}
                          />
                        </Tooltip>
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Profit & Loss"
                        >
                          <ActionButton
                            icon="/plflow.png"
                            alt="p&l"
                            onClick={() =>
                              alert(
                                "This feature is under maintenance, come back later"
                              )
                            }
                          />
                        </Tooltip>
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Bet History"
                        >
                          <ActionButton
                            icon="/history.png"
                            alt="history"
                            onClick={() =>
                              alert(
                                "This feature is under maintenance, come back later"
                              )
                            }
                          />
                        </Tooltip>
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Status settings"
                        >
                          <ActionButton
                            icon="/user_settings.gif"
                            alt="edit"
                            onClick={() => handleUserSettings(useObj)}
                          />
                        </Tooltip>
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Sport Settings"
                        >
                          <ActionButton
                            icon="/sport_settings.png"
                            alt="edit"
                            onClick={() => handleSportSettings(useObj)}
                          />
                        </Tooltip>
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Edit User"
                        >
                          <ActionButton
                            icon="/edit.gif"
                            alt="edit"
                            onClick={() => handleEdit(useObj)}
                          />
                        </Tooltip>
                        {/* <Tooltip openDelay={500} closeDelay={100} position="bottom-start" offset={2} arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Customize Website">
                          <ActionButton icon="/edit.gif" alt="editTemplate" onClick={() => handleTemplateEdit(useObj)} />
                        </Tooltip> */}
                        <Tooltip
                          openDelay={500}
                          closeDelay={100}
                          position="bottom-start"
                          offset={2}
                          arrowPosition="side"
                          arrowOffset={15}
                          arrowSize={5}
                          arrowRadius={2}
                          withArrow
                          label="Delete"
                        >
                          <ActionButton
                            icon="/delete.png"
                            alt="delete"
                            onClick={() => handleOPenDelete(useObj)}
                          />
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
          <p className="text-sm">
            <span className="italic">{deleteUser.username}</span> will be
            deleted
          </p>
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
        opened={openBanking}
        onClose={() => handleCloseBanking()}
        title="Banking"
        size=""
      >
        <Withdraw
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={() => setTimeout(() => setOpenBanking(false), 1000)}
        />
      </Modal>
      <Modal
        opened={openPlmanager}
        onClose={() => {
          setOpenPlmanager(false);
        }}
        title="P/L Manager"
        size=""
      >
        <Plmanager
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={() => setTimeout(() => setOpenPlmanager(false), 1000)}
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
          setCloseModal={() => setTimeout(() => setOpenEditCredit(false), 1000)}
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
          setCloseModal={() =>
            setTimeout(() => setOpenEditExposureLimit(false), 1000)
          }
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
          setCloseModal={() =>
            setTimeout(() => setOpenUserSettings(false), 1000)
          }
        />
      </Modal>
      <Modal
        opened={openSportsSettings}
        onClose={() => handleCloseSportsSettings()}
        title={successMessage || errorMessage || "Sports Setting"}
        size={""}
        className="relative"
      >
        <SportsSettings
          setRefresh={setRefresh}
          userData={userData}
          setCloseModal={() =>
            setTimeout(() => setOpenSportsSettings(false), 1000)
          }
          userType={userType}
          controlSent={controlSent}
          ctlSent={ctlSent}
          levelId={levelId}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
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
          setCloseModal={() => setTimeout(() => setOpenEditUser(false), 1000)}
        />
      </Modal>
    </div>
  );
};

export default UsersTableComponent;
