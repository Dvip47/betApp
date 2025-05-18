"use client"

import React, {useState, useEffect} from "react";
import {  Modal } from "@mantine/core";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddUserWithRole from "../../components/modals/AddUserWithRole";
import UsersTableComponent from "../../components/tables/UsersTableComponent";

const Users = () => {
  const userRole = "normalUser"
  const [openAddMainAdmin, setOpenAddNormalUser] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenAddNormalUser(false);
        setRefresh(true)
      }, 3000);
    }
  }, [closeModal]);

  const handleCloseModal = () => {
    setOpenAddNormalUser(false);
  };

  return (
    <div className="text-black">
      <div className="flex flex-col">
        <div className="flex justify-start">
        <p
          className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  text-white  bg-blue-700"
          onClick={() => {
            setOpenAddNormalUser(true)
          }}
        >
          <ControlPointIcon className="bg-white rounded-full text-black"/>
          Add Normal User
        </p>
        </div>
        <UsersTableComponent refresh={refresh} setRefresh={setRefresh} userType="normals" controlSent={true} isScOrCtl={true}/>
      </div>
      <Modal
        opened={openAddMainAdmin}
        onClose={() => handleCloseModal()}
        title="Add User"
        size={""}
      >
        <AddUserWithRole userRole={userRole} setRefresh={setRefresh} setCloseModal={setCloseModal}/>
      </Modal>
    </div>
  );
};

export default Users;
