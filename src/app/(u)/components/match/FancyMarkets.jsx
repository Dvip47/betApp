
import React, {  useEffect, useState } from 'react'
import { styling2 } from '@/app/custom_styling/styling';

const FancyMarketComponent = ({ setRefresh, eventId, fancyMarkets }) => {
  const [category, setCategory] = useState("all_markets")
  const [fancyMktCategories, setFancyMktsCategories] = useState([])
 

  const [fancyMkts, setFancyMkts] = useState(() => {
    if (fancyMarkets && fancyMarkets.fancy && fancyMarkets.fancy.length > 0) {
      return fancyMarkets.fancy
    } else {
      return []
    }
  })
  const defaultStake = 0




  useEffect(() => {
    if (fancyMarkets && fancyMarkets.fancy && fancyMarkets.fancy.length > 0) {
      const allMarketCategories = fancyMarkets.fancy.map(mkt => mkt.catagory)
      let categories = [...fancyMktCategories]
      for (const cat of allMarketCategories) {
        if (!categories.includes(cat)) {
          categories.push(cat)
        }
      }
      if (categories.length > 0) {
        setFancyMktsCategories(categories)
      }

    }
  }, [fancyMarkets])

  useEffect(() => {
    if (fancyMarkets && fancyMarkets.fancy && fancyMarkets.fancy.length > 0) {
      const fancy_mkts = fancyMarkets.fancy
      if (category === "all_markets") {
        setFancyMkts(fancy_mkts)
        return
      }
      const filtered = fancy_mkts.filter(mkt => mkt.catagory === category)
      setFancyMkts(filtered)
    }
  }, [fancyMarkets, category])



  

  return (
    <div className={`flex flex-col bg_1 ${fancyMktCategories.length === 0 && "hidden"} mt-4`}>
      <div className="bg-yellow-400 p-1 w-full ">
        <div className="flex text-white items-center gap-x-2 py-2 w-full">
          {/* <p className={`text-[0.9rem] ${otherMKTS === "other_markets" ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-200"} rounded font-medium p-1 cursor-pointer hover:text-[1rem]`} onClick={() => setOtherMKTS("other_markets")}>Other Markets</p> */}
          <p className={`text-[0.9rem] bg-gray-900 text-gray-200 rounded font-bold p-1 cursor-pointer hover:text-[1rem]`} >Fancy Markets</p>
        </div>
        
        <div className="flex flex-nowrap overflow-x-auto gap-x-2"
          style={{
            "msOverflowStyle": "none",
            "scrollbarWidth": "none",
            "overflow": "auto",
            "maxWidth": "100%"
          }}>
          <p className={`${"all_markets" === category ? "bg-gray-900" : "bg-gray-500"} w-full flex justify-center items-center  max-mk:px-6 py-1 cursor-pointer rounded p_2 text-gray-200 font-medium`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setCategory("all_markets")}>All Markets</p>
          {fancyMktCategories.length > 0 && fancyMktCategories.map((category_, i) => (
            <p key={i} className={`${category_ === category ? "bg-gray-900" : "bg-gray-500"} w-full flex justify-center items-center  max-mk:px-6 py-1 cursor-pointer rounded p_2 text-gray-200 font-medium`}
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => setCategory(category_)}>{category_}</p>
          ))}
        </div>

      </div>

      {/* RUNNERS */}
      <div className="min-mk:pl-1 pt-1 p-1">
        {
          fancyMkts && fancyMkts.length > 0 && fancyMkts.map((mkt, i) => {
            return (

              <div className="relative col-span-3 border-b border-gray-800 grid grid-cols-12 gap-x-1 hover:bg-gray-800 py-1" key={i}>
                <div className="col-span-6 max-mk:col-span-9 flex items-center">
                  <p className={` p_2 font-bold text-gray-200`}>{mkt.marketName}</p>
                </div>
                <div className="col-span-6 max-mk:col-span-3 grid grid-cols-12  items-center">
                  <div className="col-span-6 max-mk:hidden grid grid-cols-7 gap-x-1"></div>
                  <div className="relative max-mk:col-span-12 col-span-6 grid grid-cols-8 max-mk:grid-cols-4 gap-x-1">
                    {
                      mkt.statusName != "ACTIVE" &&
                      <div className="absolute rounded col-span-8 top-0 bottom-0 left-0 right-0 bg-orange-500/[0.9] flex justify-center items-center px-6">
                        <p className='text-sm font-bold text-gray-100 tracking-wider'>{mkt.statusName}</p>
                      </div>
                    }
                    <div
                      className={`${styling2.oddsStyle} ${styling2.backOdd} col-span-2`}
                    >
                      <p className={` ${styling2.oddsT2}`}>
                        {mkt.runsYes}
                      </p>
                      <p className={` ${styling2.oddsP2}`}>
                        {mkt.oddsYes}
                      </p>
                    </div>
                    <div
                      className={`${styling2.oddsStyle} ${styling2.layOdd} col-span-2`}
                    >
                      <p className={` ${styling2.oddsT2}`}>
                        {mkt.runsNo}
                      </p>
                      <p className={` ${styling2.oddsP2}`}>
                        {mkt.oddsNo}
                      </p>
                    </div>
                    <div className="max-mk:hidden col-span-4 flex flex-col w-full justify-center">
                      <p className={` ${styling2.maxSettings}`}>Max Bet: {mkt.maxSetting}</p>
                      <p className={` ${styling2.maxSettings}`}>Max Market: {mkt.ratingExposure}</p>
                    </div>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>

    </div>
  );
};
export default FancyMarketComponent