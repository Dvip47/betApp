"use client"
import { fetchEventFancyMarkets, fetchMKTBK, fetcheEventMarkets } from "@/app/api/exchange";
import React, { useEffect, useState } from "react";
import { INTERVAL } from "../../constants/mktfetchInterval";
import { useSearchParams } from "next/navigation";
import MarketComponent from "./MarketComponent";
import BookmakerMarketComponent from "./Bookmaker";
import FancyMarketComponent from "./FancyMarkets";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MainMatchDetailsView = () => {
  const [mkts, setMkts] = useState([]);

  const searchParams = useSearchParams();
  const m = searchParams.get("m");
  const si = searchParams.get("si");

  const [mktIds, setMktIds] = useState([])
  const [mktBks, setMktBks] = useState([])
  const [fancyMarkets, setFancyMarkets] = useState({})
  const [bookmakerMarkets, setBookmakerMarkets] = useState([])

  const run = async () => {
    if (m) {
      const fancy_markets = await fetchEventFancyMarkets(m)
      if (fancy_markets) {
        setBookmakerMarkets(fancy_markets.bookMaker)
        setFancyMarkets(fancy_markets)
      }
    }
  }

  const runner_ = async (mktIds) => {
    try {
      // console.log("Hitting here")
      const mkt_book = await fetchMKTBK(mktIds)
      if (mkt_book && mkt_book.length > 0) {
        setMktBks(mkt_book)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    // selected market ids only
    if (mkts.length > 0) {
      let selectedMarkets = ["Match Odds", "Tied Match", "Moneyline"];
      let uniqueMarketIds = [];

      for (let mkt of mkts) {
        if (selectedMarkets.includes(mkt.marketName) && !uniqueMarketIds.includes(mkt.marketId)) {
          uniqueMarketIds.push(mkt.marketId);
        }
      }

      setMktIds(uniqueMarketIds);
    }
  }, [mkts]);


  useEffect(() => {
    if (mktIds.length > 0) {
      const intervalId = setInterval(() => {
        runner_(mktIds)
        run()
      }, INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [mktIds]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (m ) {
          // Fetch event markets first
          const markets = await fetcheEventMarkets(m, si);

          if (markets) {
            setMkts(markets);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [m, si]);




  return (
    <div className="grid grid-cols-12 gap-x-1">
      <div className="flex flex-col col-span-8">
        <h6 className="h_6_sm t_c_1 tracking-wider font-bold">Match Details</h6>
        <div className="grid grid-cols-12 gap-x-1">
          {mkts != undefined &&
            mkts.map((market, i) => {
              if (market.marketName === "Match Odds") {
                return (
                  <div className="col-span-12" key={i}>
                    <MarketComponent
                      eventId={m}
                      market={market}
                      openedd={true}
                      mktBks={mktBks}
                    />
                  </div>
                );
              }
              if (market.marketName === "Tied Match") {
                return (
                  <div className="col-span-12" key={i}>
                    <MarketComponent
                      eventId={m}
                      market={market}
                      openedd={true}
                      mktBks={mktBks}
                    />
                  </div>
                );
              }
              if (market.marketName === "Moneyline") {
                return (
                  <div className="col-span-6" key={i}>
                    <MarketComponent
                      eventId={m}
                      market={market}
                      openedd={true}
                      mktBks={mktBks}
                    />
                  </div>
                );
              }

            })}
        </div>

        <div className="w-full mt-1">
          <BookmakerMarketComponent bookmakerMarkets={bookmakerMarkets} />
          <FancyMarketComponent fancyMarkets={fancyMarkets} />
        </div>

      </div>
      <div className="col-span-4 space-y-1">
        <div className="bg_1 flex items-center justify-between p-2 rounded">
          <p className="text-gray-300 p_2_sm tracking-wider">Unmatched Bets (0)</p>
          {/* <ArrowDropUpIcon fontSize='small' className='' /> */}
          <ArrowDropDownIcon fontSize='small' className="text-orange-400" />
        </div>
        <div className="bg_1 flex items-center justify-between p-2 rounded">
          <p className="text-gray-300 p_2_sm tracking-wider">Matched Bets (0)</p>
          {/* <ArrowDropUpIcon fontSize='small' className='' /> */}
          <ArrowDropDownIcon fontSize='small' className="text-orange-400" />
        </div>
        <div className="bg_1 flex items-center justify-between p-2 rounded">
          <p className="text-gray-300 p_2_sm tracking-wider">Fancy Bets (0)</p>
          {/* <ArrowDropUpIcon fontSize='small' className='' /> */}
          <ArrowDropDownIcon fontSize='small' className="text-orange-400" />
        </div>
      </div>
    </div>
  );
};

export default MainMatchDetailsView;
