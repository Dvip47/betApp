"use client";

import React, { useState , useEffect } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Modal } from "@mantine/core";
import AddUserWithRole from "../../components/modals/AddUserWithRole";
import UsersTableComponent from "../../components/tables/UsersTableComponent";

const PanelUser = () => {
  const userRole = "panel";
  const [openAddNormal, setOpenAddNormal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setOpenAddNormal(false);
        setRefresh(true)
      }, 1000);
    }
  }, [closeModal]);
  

  const handleCloseModal = () => {
    setOpenAddNormal(false);
  };
  return (
    <div className="text-black m-1">
      <div className="flex flex-col">
        <div className="flex justify-start">
          <p
            className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  text-white  bg-blue-700"
            onClick={() => {
              setOpenAddNormal(true);
            }}
          >
            <ControlPointIcon className="bg-white rounded-full text-black"/>
            Add Panel
          </p>
        </div>

        <UsersTableComponent refresh={refresh} setRefresh={setRefresh} userType="panels" controlSent={true} isScOrCtl={false}/>
      </div>
      <Modal
        opened={openAddNormal}
        onClose={() => handleCloseModal()}
        title="Add Panel"
        size={""}
      >
        <AddUserWithRole userRole={userRole} setRefresh={setRefresh} setCloseModal={setCloseModal} />
      </Modal>
    </div>
  );
};

export default PanelUser;
