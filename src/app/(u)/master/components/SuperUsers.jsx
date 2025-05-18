"use client";

import React, { useState, useEffect } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AdminTable from "./tables/AdminTable";
import { Modal } from "@mantine/core";
import AddUserWithRole from "../../components/modals/AddUserWithRole";
import UsersTableComponent from "../../components/tables/UsersTableComponent";

const Super = () => {
  const [openAddSuperUser, setOpenAddSuperUser] = useState(false);
  const userRole = "super";
  const [closeModal, setCloseModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (closeModal) {
        setOpenAddSuperUser(false);
        setRefresh(true)
      }
    }, 1000);
  }, [closeModal]);

  const handleCloseModal = () => {
    setOpenAddSuperUser(false);
  };
  return (
    <div className="text-black m-1">
      <div className="flex justify-start w-full">
        <p
          className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  bg-gray-200"
          onClick={() => {
            setOpenAddSuperUser(true);
          }}
        >
          <ControlPointIcon className="bg-white rounded-full text-black"/>
          Add Super User
        </p>
      </div>

      <UsersTableComponent refresh={refresh} setRefresh={setRefresh} userType="supers" controlSent={true} isScOrCtl={false}/>
      <Modal
        opened={openAddSuperUser}
        onClose={() => handleCloseModal()}
        title="Add Super User"
        size={""}
      >
        <AddUserWithRole userRole={userRole} setRefresh={setRefresh} setCloseModal={setCloseModal} />
      </Modal>
    </div>
  );
};

export default Super;
