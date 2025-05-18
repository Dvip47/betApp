"use client";

import React, { useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AdminTable from "./tables/AdminTable";

const SuperUser = () => {
  const [startUpload, setStartUpload] = useState(false);
  return (
    <div className="text-black m-1">
      <p
        className="flex items-center gap-2 p-1 my-2 cursor-pointer rounded border-l  w-[150px]  bg-gray-200"
        onClick={() => setStartUpload((prev) => !prev)}
      >
        <ControlPointIcon className="bg-white rounded-full text-black"/>
        {startUpload ? "Close" : "Add "}
      </p>

      <AdminTable />
    </div>
  );
};

export default SuperUser;
