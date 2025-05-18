import React, { useContext, useEffect, useState } from 'react'
import { styling2 } from '@/app/custom_styling/styling';


const BookmakerMarketComponent = ({ bookmakerMarkets }) => {
  
  const defaultStake = 0



  return (
    <div className={`flex flex-col bg_1 rounded ${bookmakerMarkets.length === 0 && "hidden"}`}>

      <div position="start" className="bg-black p-1 col-span-12">
        <div className="flex justify-between text-white items-center w-full">
          <p className="text-[1rem] font-bold text-white p-1">Bookmaker</p>
        </div>
      </div>


      {/* RUNNERS */}
      <div className="min-mk:pl-1 pt-1 p-1 ">
        {
          bookmakerMarkets && bookmakerMarkets.length > 0 && bookmakerMarkets.map((mkt, i) => {
            return (

              <div className="relative col-span-3 border-b border-gray-800 grid grid-cols-12 gap-x-1 hover:bg-gray-800 py-1" key={i}>
                <div className="col-span-6 max-mk:col-span-9 flex items-center">
                  <p className={`p_2 font-bold text-gray-200`}>{mkt.selectionName}</p>
                </div>
                <div className="col-span-6 max-mk:col-span-3 grid grid-cols-12  items-center">
                  <div className="col-span-6 max-mk:hidden grid grid-cols-7 gap-x-1"></div>
                  <div className="relative max-mk:col-span-12 col-span-6 grid grid-cols-8 max-mk:grid-cols-4 gap-x-1">
                    {
                      mkt.selectionStatus != "ACTIVE" &&
                      <div className="absolute rounded col-span-8 top-0 bottom-0 left-0 right-0 bg-orange-500/[0.9] flex justify-center items-center px-6">
                        <p className='text-sm font-bold text-gray-100 tracking-wider'>{mkt.selectionStatus}</p>
                      </div>
                    }
                    <div
                      className={`${styling2.oddsStyle} ${styling2.backOdd} col-span-2`}
                    >
                      <p className={` ${styling2.oddsT2}`}>
                        {mkt.backOdds}
                      </p>
                    </div>
                    <div
                      className={`${styling2.oddsStyle} ${styling2.layOdd} col-span-2`}
                    >
                      <p className={` ${styling2.oddsT2}`}>
                        {mkt.layOdds}
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
export default BookmakerMarketComponent