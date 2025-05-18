"use client"

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import AddUserWithRole from "../../components/modals/AddUserWithRole";
import UsersTableComponent from "../../components/tables/UsersTableComponent";

const Agent = () => {
  const userRole = "panel"
  const [openAddMainAdmin, setOpenAddPanelUser] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenAddPanelUser(false);
        setRefresh(true)
      }, 3000);
    }
  }, [closeModal]);

  const handleCloseModal = () => {
    setOpenAddPanelUser(false);
  };

  return (
    <div className="text-black">
      <div className="flex flex-col">
        <div className="flex justify-start">
          <p
            className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  text-white  bg-blue-700"
            onClick={() => {
              setOpenAddPanelUser(true)
            }}
          >
            <ControlPointIcon className="bg-white rounded-full text-black"/>
            Add Agent User
          </p>
        </div>
        <UsersTableComponent refresh={refresh} setRefresh={setRefresh} userType="agents" controlSent={true} isScOrCtl={true} />
      </div>
      <Modal
        opened={openAddMainAdmin}
        onClose={() => handleCloseModal()}
        title="Add Agent User"
        size={""}
      >
        <AddUserWithRole userRole={userRole} setRefresh={setRefresh} setCloseModal={setCloseModal}/>
      </Modal>
    </div>
  );
};

export default Agent;
