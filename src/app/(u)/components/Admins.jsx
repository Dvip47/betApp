"use client";

import React, { useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AdminTable from "./tables/AdminTable";
import { Modal } from "@mantine/core";

const Admins = () => {
  const [startUpload, setStartUpload] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const userRole = "admin"

  const handleCloseModal = () => {
    setOpenAddAdmin(false);
  };
  return (
    <div className="text-black m-1">
      <p
        className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  w-[150px]  bg-gray-200"
        onClick={() => setStartUpload((prev) => !prev)}
      >
        <ControlPointIcon className="bg-white rounded-full text-black"/>
        {startUpload ? "Close" : "Add Admin"}
      </p>

      <AdminTable />
      <Modal
        opened={openAddAdmin}
        onClose={() => handleCloseModal()}
        title="Add Admin"
        size={""}
      >
        form goes here
      </Modal>
      
    </div>
  );
};

export default Admins;
