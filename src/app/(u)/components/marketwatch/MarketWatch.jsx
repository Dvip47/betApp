"use client";

import React, { useState } from "react";
import MarkerWatchTableComponent from "../tables/MarketWatchTable";
import { AuthProvider } from "@/app/context/AuthContext";
import { OpenExchangeEventProvider } from "@/app/context/exchange/OpenExchangeEventProvider";
import { UserExchangeBetslipProvider } from "@/app/context/exchange/UserExchangeBetslipContext";
import { CompetitionProvider } from "@/app/context/exchange/CompetitonContext";
import { MarketBookProvider } from "@/app/context/exchange/MarketBookContext";
import { MarketsProvider } from "@/app/context/exchange/MarketsContext";
import { NAVProvider } from "@/app/context/NavContext";
import { MyBetsProvider } from "@/app/context/MybetsContext";
import { MantineProvider } from "@mantine/core";


const MarketWatch = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="">
      <AuthProvider>
        <OpenExchangeEventProvider>
          <UserExchangeBetslipProvider>
            <CompetitionProvider>
              <MarketBookProvider>
                <MarketsProvider>
                  <NAVProvider>
                    <MyBetsProvider>
                      <MantineProvider>
                        <MarkerWatchTableComponent refresh={refresh} setRefresh={setRefresh} actions={true} controlSent={true} />

                      </MantineProvider>
                    </MyBetsProvider>
                  </NAVProvider>
                </MarketsProvider>
              </MarketBookProvider>
            </CompetitionProvider>
          </UserExchangeBetslipProvider>
        </OpenExchangeEventProvider>
      </AuthProvider >

    </div>
  );
};

export default MarketWatch;
