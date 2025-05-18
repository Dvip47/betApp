"use client";

import React, { useState } from "react";
import HomeUserTableComponent from "../../components/tables/HomeUserTable";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="text-black m-1">
      <HomeUserTableComponent
        refresh={refresh}
        setRefresh={setRefresh}
        actions={true}
        controlSent={true}
      />
    </div>
  );
};

export default Home;
