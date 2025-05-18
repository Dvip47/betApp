"use client";
import React, { useState, useEffect } from "react";
import Admins from "./Admins";
import Users from "./Users";
import Settings from "./Settings";
import Home from "./Home";
import Masters from "./Masters";
import SuperUser from "./SuperUser";
import Panel from "./Panels";
import { useSearchParams } from "next/navigation";
import MarketWatch from "../../components/marketwatch/MarketWatch";
import ActiveMatches from "../../components/activeMatches/ActiveMatches";
import { controlLinks } from "../../constants/sideBarLinks";
import Bets from "../../components/bets/Bets";
import MatchDetails from "../../components/match/MatchDetails";
import DeleteDeclaredMarkets from "./settings/DeleteDeclaredMarkets";
import MatchRollbackTable from "./tables/MatchRollback";
import CasinoReportsTable from "./tables/CasinoReportsTable";
import Settlement from "./tables/reporttables/Settlement";
import BetHistory from "./tables/reporttables/BetHistory";
import DeletedBets from "./tables/reporttables/DeletedBets";
import AccountStatements from "./tables/reporttables/AccountStatements";
import ProfitLossByMatchTable from "./tables/ProfitLossByMatchTable";
import ProfitLossByUpline from "./tables/ProfitLossByUpline";
import BetMarkets from "./tables/reporttables/BetMarkets";
import MatchResultManual from "./tables/MatchResultManual";
import Whitelevel from "./Whitelevel";
import Agent from "./Agent";
import WhitelevelCustomizer from "./WhitelevelCustomizer";
import Dashboard from "./Dashboard";
import Casinohistory from "./tables/reporttables/Casinohistory";
import ProfitLoss from "./tables/ProfitLoss";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [componentToRender, setComponentToRender] = useState(null);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("pg");

  useEffect(() => {
    setLoading(true);
    let newComponentToRender = null;

    switch (currentPage) {
      case "home":
        newComponentToRender = <Home />;
        break;
      case "dashboard":
        newComponentToRender = <Dashboard />;
        break;
      case "whitelevel":
        newComponentToRender = <Whitelevel />;
        break;
      case "casino":
        newComponentToRender = <WhitelevelCustomizer />;
        break;
      case "adminII":
        newComponentToRender = <Admins />;
        break;
      case "admin":
        newComponentToRender = <Admins />;
        break;
      case "master":
        newComponentToRender = <Masters />;
        break;
      case "super":
        newComponentToRender = <SuperUser />;
        break;
      case "panel":
        newComponentToRender = <Panel />;
        break;
      case "agent":
        newComponentToRender = <Agent />;
        break;
      case "normalUser":
        newComponentToRender = <Users />;
        break;
      case "settings":
        newComponentToRender = <Settings />;
        break;
      case "matchResultsManual":
        newComponentToRender = <MatchResultManual />;
        break;
      case "deletedeclaredmarkets":
        newComponentToRender = <DeleteDeclaredMarkets />;
        break;
      case "marketwatch":
        newComponentToRender = <MarketWatch />;
        break;
      case "activeMatches":
        newComponentToRender = <ActiveMatches />;
        break;
      case "matchDetails":
        newComponentToRender = <MatchDetails />;
        break;
      case "betlist":
        newComponentToRender = <Bets />;
        break;
      case "settlement":
        newComponentToRender = <Settlement />;
        break;
      case "bet_history":
        newComponentToRender = <BetHistory />;
        break;
      case "casino_result_report":
        newComponentToRender = <CasinoReportsTable />;
        break;
      case "casinobethistory":
        newComponentToRender = <Casinohistory />;
        break;
      case "profit_loss":
        newComponentToRender = <ProfitLoss />;
        break;
      case "account_statement":
        newComponentToRender = <AccountStatements />;
        break;
      case "profit_loss_by_match":
        newComponentToRender = <ProfitLossByMatchTable />;
        break;
      case "profit_loss_by_upline":
        newComponentToRender = <ProfitLossByUpline />;
        break;
      case "deleted_bets":
        newComponentToRender = <DeletedBets />;
        break;
      case "matchrollback":
        newComponentToRender = <MatchRollbackTable />;
        break;
      case "market_bets":
        newComponentToRender = <BetMarkets />;
        break;
      default:
        newComponentToRender = <MarketWatch/>;
    }

    setComponentToRender(newComponentToRender);
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="">
      {currentPage != "" &&
        controlLinks &&
        controlLinks.map((currentMainLink, index) => {
          if (currentMainLink.id === currentPage) {
            return (
              <p index={index} className="t_c_1 h_6 font-bold ">
                {currentMainLink.name}
              </p>
            );
          }
        })}

      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <p>Loading ...</p>
        </div>
      ) : (
        componentToRender
      )}
    </div>
  );
}
