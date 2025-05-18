"use client";

import React, { useState } from "react";
import ActiveMatchesTableComponent from "../tables/ActiveMatchesTable";
import { AuthProvider } from "@/app/context/AuthContext";
import { MantineProvider } from "@mantine/core";


const ActiveMatches = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="">
      <AuthProvider>
        <MantineProvider>
          <ActiveMatchesTableComponent refresh={refresh} setRefresh={setRefresh} actions={true} controlSent={true} />

        </MantineProvider>
      </AuthProvider >

    </div>
  );
};

export default ActiveMatches;
