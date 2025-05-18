"use client";

import React, { useEffect, useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AdminTable from "./tables/AdminTable";
import { Modal } from "@mantine/core";
import AddUserWithRole from "../../components/modals/AddUserWithRole";
import UsersTableComponent from "../../components/tables/UsersTableComponent";

const Master = () => {
  const userRole = "master";
  const [startUpload, setStartUpload] = useState(false);
  const [openAddMaster, setOpenAddMaster] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenAddMaster(false);
        setRefresh(true)
      }, 1000);
    }
  }, [closeModal]);

  const handleCloseModal = () => {
    setOpenAddMaster(false);
  };
  return (
    <div className="text-black m-1">
      <div className="flex flex-col">
        <div className="flex justify-start">
          <p
            className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  text-white  bg-blue-700"
            onClick={() => {
              setOpenAddMaster(true);
            }}
          >
            <ControlPointIcon className="bg-white rounded-full text-black"/>
            Add Master User
          </p>
        </div>
        <UsersTableComponent refresh={refresh} setRefresh={setRefresh} userType="masters"  controlSent={true} isScOrCtl={false}/>
      </div>
      <Modal
        opened={openAddMaster}
        onClose={() => handleCloseModal()}
        title="Add Master User"
        size={""}
      >
        <AddUserWithRole userRole={userRole} setRefresh={setRefresh} setCloseModal={setCloseModal} />
      </Modal>
    </div>
  );
};

export default Master;
