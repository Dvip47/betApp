"use client";

import React, { useState, useEffect } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AdminTable from "./tables/AdminTable";
import { Modal } from "@mantine/core";
import AddUserWithRole from "../../components/modals/AddUserWithRole";
import UsersTableComponent from "../../components/tables/UsersTableComponent";


const Admins = () => {
  const userRole = "admin"
  const [startUpload, setStartUpload] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenAddAdmin(false);
        setRefresh(true)
      }, 1000);
    }
  }, [closeModal]);

  const handleCloseModal = () => {
    setOpenAddAdmin(false);
  };
  return (
    <div className="text-black m-1">
      <p
        className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  w-[150px]  bg-gray-200"
        onClick={() => {
          setOpenAddAdmin(true)
        }}
      >
        <ControlPointIcon className="bg-white rounded-full text-black"/>
        Add Admin
      </p>

      <UsersTableComponent refresh={refresh} setRefresh={setRefresh} userType="admins" controlSent={true} isScOrCtl={false} />


      <Modal
        opened={openAddAdmin}
        onClose={() => handleCloseModal()}
        title="Add Admin"
        size={""}
      >
        <AddUserWithRole userRole={userRole} setRefresh={setRefresh} setCloseModal={setCloseModal} />
      </Modal>

    </div>
  );
};

export default Admins;
