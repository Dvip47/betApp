"use client"
import React, {  useEffect, useState } from 'react'
import { Group, Collapse, Box } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from '@mui/icons-material/Lock';
import Loading from './Loading';
import { styling1 } from 'src/app/custom_styling/styling';
import {  formatGMTDateTime, hasDatePassed } from '../utils/competitionCollase';
import { formatNumber, getIcon, separateTeams } from '../utils/utils';
import { EmptyOddCell, OddsComponent } from './OddsComponent';
import { fetchMKTBK } from 'src/app/api/exchange';
import { useRouter } from 'next/navigation';
import { INTERVAL } from '../constants/mktfetchInterval';
import { sleep } from '../utils/sleep';


const MatchesComponent = ({ competitionTitle, events, sportName, eventTypeId, canBet }) => {
  const [openedd, setOpenedd] = useState(true)
  const [hide, setHide] = useState(false)
  const [marketsBook, setMarketsBook] = useState([])
  const [mktIds, setMktIds] = useState([])
  const router = useRouter()
  const icon = getIcon(sportName)

  const handleEventClick = (event) => {
    router.push(`?cpg=${"marketwatch"}&pg=${"matchDetails"}&si=${event.sport_id}&m=${event.match_id}`)
  };


  const onClick = () => {
    setOpenedd(prev => !prev)
  }
  const getMktIds = async () => {
    try {
      if (events) {
        let marketIds = []
        for (const event of events) {
          marketIds.push(event.market_id)
        }
        if (marketIds.length > 0) {
          const mktbook = await fetchMKTBK(marketIds)
          setMarketsBook(mktbook)
          sleep(2000)
          // setMktIds(marketIds)
        }
      }
    } catch (error) {
      console.log(2)
    }
  }

  useEffect(() => {
    if (events && events.length > 0) {
      getMktIds()
    }
  }, [events]);

  useEffect(() => {
    if (mktIds.length > 0) {
      const fetchData = async () => {
        try {
          const mktbook = await fetchMKTBK(mktIds)
          if (mktbook.length > 0) {
            setMarketsBook(mktbook)
          }
        } catch (error) {
          console.error(error);
        }
      };

      const intervalId = setInterval(fetchData, INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [mktIds])





  return (
    <div className=''>
      {
        events && events.length > 0 && (
          <Box mx="auto" className={`bg-gray-800/[0.5] border-b border-gray-900   ${hide && "hidden"}`}>
            <Group position="start" onClick={onClick} className="bg-gradient-to-r from-black to-black px-2 cursor-pointer hover:bg-gray-900/[0.5]">
              <div className="flex text-white justify-between items-center w-full">
                <div className="flex items-center">
                  <p className="text-[0.95rem] font-bold text-gray-300 p-1">{competitionTitle === "Football" ? "Soccer" : competitionTitle}</p>
                </div>
                {openedd ? <ArrowDropUpIcon fontSize='small' className='' /> : events.length === 0 ? <LockIcon fontSize='small' /> : <ArrowDropDownIcon fontSize='small' />}
              </div>
            </Group>

            <Collapse in={openedd} className="text-white p-1 w-full">
              {/* LEAGUES */}
              <div className='flex gap-x-4 w-full'>
                <div className="w-full">
                  {events.length > 0 ?
                    <div className="w-full grid grid-cols-12 gap-x-2">
                    </div> : <Loading />
                  }
                  {events && events.length > 0 &&
                    events.map((event_, i) => {

                      const [team1, team2] = separateTeams(event_.match_name);
                      const pass = hasDatePassed(event_.openDate)

                      let prices = {}
                      if (marketsBook && marketsBook.length > 0) {
                        const marketPrices = marketsBook.filter(marketprice => marketprice.marketId == event_.market_id)
                        if (marketPrices.length > 0) {
                          prices = marketPrices[0]
                        }
                      }
                      const eId = event_.match_id
                      const date_ = formatGMTDateTime(event_.openDate)
                      if (styling1) {
                        return (
                          <div key={i}>
                            <div className="grid grid-cols-12 md:grid-cols-12 bg-gray-900 border-b border-t border-gray-600 gap-x-2 hover:bg-gray-700/[0.5] p-1">
                              {/* time */}
                              <div className={`mk:col-span-1 col-span-2 mk:block hidden ${pass && "bg-green-600 flex justify-center items-center"} hover:bg-gray-900 h-full rounded-r  shadow-lg`}>
                                {pass ?
                                  <div className="flex justify-center items-center w-full h-full">
                                    <p className='p_3 tracking-wider text-gray-200 font-medium'>In Play</p>
                                  </div> :
                                  <div className="flex flex-col justify-center items-center">
                                    <p className='p_3 tracking-wider text-gray-200 font-medium'>{date_.date}</p>
                                    <p className='p_3 tracking-wider text-gray-200 font-medium'>{date_.time} </p>
                                  </div>}
                              </div>
                              <div className="mk:col-span-11 col-span-12 mk:grid-cols-12 grid gap-x-2 flex flex-col">
                                {/* event name */}
                                <div className="col-span-6 mk:col-span-8 md:col-span-6 bg-gray-900 hover:bg-gray-900 shadow-lg grid grid-cols-7 max-mk:grid-cols-9 cursor-pointer items-center rounded py-1" onClick={() => handleEventClick(event_)} >

                                  <div className='col-span-3 max-mk:col-span-4  flex justify-end px-1 bg-gray-900/[0.5]'>
                                    <p className={`${styling1.teamNames} `}>{team1}</p>
                                  </div>
                                  <div className={`col-span-1 flex justify-center px-1 hidden bg-yellow-900/[0.2]`}>
                                    <p className={`${styling1.teamNames} `}>vs</p>
                                  </div>
                                  <div className={`col-span-1 flex justify-center `}>
                                    {
                                      icon && icon != null && (
                                        <img className="h-auto w-[1.25rem]" src={icon.url} alt="cricket-ball--v1" />
                                      )
                                    }
                                  </div>
                                  <div className='col-span-3 max-mk:col-span-4 flex justify-start px-1 bg-gray-900/[0.5]'>
                                    <p className={`${styling1.teamNames} truncate`}>{team2}</p>
                                  </div>
                                </div>

                                {/* event odds */}
                                <div className="col-span-6 mk:col-span-4 md:col-span-3 grid grid-cols-6 mk:grid-cols-4 md:grid-cols-4 max-mk:grid-cols-7 ">

                                  <div className={`col-span-1 mk:hidden ${pass && "bg-green-600 flex justify-center items-center"} hover:bg-gray-900 h-full rounded-r  shadow-lg max-mk:mr-1`}>
                                    {
                                      pass ?
                                        <div className="flex justify-center gap-x-1  items-center w-full h-full">

                                          <p className='text-[0.695rem] md:text-[0.785rem]   tracking-wide text-gray-300 font-bold'>In Play</p>
                                        </div> :
                                        <div className="flex flex-col justify-center items-center">
                                          <p className='text-[0.65rem] md:text-[0.8rem]  tracking-wide text-gray-300 font-bold'>{date_.date}</p>
                                          <p className='text-[0.65rem] md:text-[0.8rem]  tracking-wide text-gray-300 font-bold'>{date_.time} </p>
                                        </div>
                                    }

                                  </div>

                                  <div className="relative col-span-5  max-mk:col-span-6 md:col-span-4 grid grid-cols-6 gap-x-2">
                                    {
                                      prices.status === "CLOSED" ?
                                        prices.inplay === true ? <div className={`bg-[#F5ACD4]/[0.9] flex justify-center
                                     col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center z-30`}>
                                          <p className='font-medium text-black uppercase'>Betting Paused</p>
                                        </div> : <div className={`
                                      ${prices.status === "CLOSED" ? "bg-[#F5ACD4]/[0.9]" : "bg-[#F5ACD4]"} flex justify-center
                                      col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center z-30`}>
                                          <p className='font-medium text-black uppercase'>{prices.status}</p>
                                        </div> : ""
                                    }

                                    {/* HOME */}
                                    <div className='col-span-2 '>
                                      <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                        <div>
                                          {prices && prices.runners && prices.runners[0].ex.availableToBack && prices.runners[0].ex.availableToBack.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={team1}
                                              price={prices.runners[0].ex.availableToBack[0].price}
                                              size={formatNumber(prices.runners[0].ex.availableToBack[0].size)}
                                             
                                              eventId={eId}
                                              type="back"
                                              marketType="Match Odds"
                                            />

                                          ) : (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={team1}
                                             
                                              eventId={eId}
                                              type="back"
                                              marketType="Match Odds"
                                            />
                                          )}
                                        </div>
                                        <div>
                                          {prices && prices.runners && prices.runners[0].ex.availableToLay && prices.runners[0].ex.availableToLay.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={team1}
                                              price={prices.runners[0].ex.availableToLay[0].price}
                                              size={formatNumber(prices.runners[0].ex.availableToLay[0].size)}
                                             
                                              eventId={eId}
                                              type="lay"
                                              marketType="Match Odds"
                                            />
                                          ) : (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={team1}
                                             
                                              eventId={eId}
                                              type="lay"
                                              marketType="Match Odds"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>


                                    {/*  tie */}
                                    <div className='col-span-2 '>
                                      <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                        <div>

                                          {prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2].ex.availableToBack && prices.runners[2].ex.availableToBack.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={"The Draw"}
                                              price={prices.runners[2].ex.availableToBack[0].price}
                                              size={formatNumber(prices.runners[2].ex.availableToBack[0].size)}
                                             
                                              eventId={eId}
                                              type="back"
                                              marketType="Match Odds"
                                            />
                                          ) : (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              team={"The Draw"}
                                              marketId={event_.market_id}
                                             
                                              eventId={eId}
                                              type="back"
                                              marketType="Match Odds"
                                            />
                                          )}
                                        </div>
                                        {/* lay */}
                                        <div>
                                          {prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2].ex.availableToLay && prices.runners[2].ex.availableToLay.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={"The Draw"}
                                              price={prices.runners[2].ex.availableToLay[0].price}
                                              size={formatNumber(prices.runners[2].ex.availableToLay[0].size)}
                                             
                                              eventId={eId}
                                              type="lay"
                                              marketType="Match Odds"
                                            />
                                          ) : (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              canBet={canBet}
                                              eventName={event_.match_name}
                                              marketId={event_.market_id}
                                              team={"The Draw"}
                                             
                                              eventId={eId}
                                              type="lay"
                                              marketType="Match Odds"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {/* away */}
                                    {
                                      prices && prices.runners && prices.numberOfRunners === 3 ?
                                        (
                                          <div className='col-span-2 '>
                                            <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                              {/* back */}
                                              <div>
                                                {prices.runners[1].ex.availableToBack && prices.runners[1].ex.availableToBack.length > 0 ? (
                                                  <OddsComponent
                                                    styling1={styling1}
                                                    canBet={canBet}
                                                    eventName={event_.match_name}
                                                    team={team2}
                                                    price={prices.runners[1].ex.availableToBack[0].price}
                                                    size={formatNumber(prices.runners[1].ex.availableToBack[0].size)}
                                                
                                                    eventId={eId}
                                                    marketId={event_.market_id}
                                                    type="back"
                                                    marketType="Match Odds"
                                                  />
                                                ) : (
                                                  <EmptyOddCell
                                                    styling1={styling1}
                                                    canBet={canBet}
                                                    eventName={event_.match_name}
                                                    team={team2}
                                                    marketId={event_.market_id}
                                                
                                                    eventId={eId}
                                                    type="back"
                                                    marketType="Match Odds"
                                                  />
                                                )}
                                              </div>
                                              {/* lay */}
                                              <div>
                                                {prices.runners[1].ex.availableToLay && prices.runners[1].ex.availableToLay.length > 0 ? (
                                                  <OddsComponent
                                                    styling1={styling1}
                                                    canBet={canBet}
                                                    eventName={event_.match_name}
                                                    team={team2}
                                                    price={prices.runners[1].ex.availableToLay[0].price}
                                                    size={formatNumber(prices.runners[1].ex.availableToLay[0].size)}
                                                
                                                    eventId={eId}
                                                    marketId={event_.market_id}
                                                    type="lay"
                                                    marketType="Match Odds"
                                                  />
                                                ) : (
                                                  <EmptyOddCell
                                                    styling1={styling1}
                                                    canBet={canBet}
                                                    eventName={event_.match_name}
                                                    team={team2}
                                                    marketId={event_.market_id}
                                                
                                                    eventId={eId}
                                                    type="lay"
                                                    marketType="Match Odds"
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ) :
                                        prices && prices.runners && prices.numberOfRunners === 2 ?
                                          (
                                            <div className='col-span-2 '>
                                              <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                                <div>
                                                  {prices.runners[1].ex.availableToBack && prices.runners[1].ex.availableToBack.length > 0 ? (
                                                    <OddsComponent
                                                      styling1={styling1}
                                                      canBet={canBet}
                                                      eventName={event_.match_name}
                                                      team={team2}
                                                      price={prices.runners[1].ex.availableToBack[0].price}
                                                      size={formatNumber(prices.runners[1].ex.availableToBack[0].size)}
                                                      eventId={eId}
                                                      marketId={event_.market_id}
                                                      type="back"
                                                      marketType="Match Odds"
                                                    />

                                                  ) : (

                                                    <EmptyOddCell
                                                      styling1={styling1}
                                                      canBet={canBet}
                                                      eventName={event_.match_name}
                                                      team={team2}
                                                      eventId={eId}
                                                      marketId={event_.market_id}
                                                      type="back"
                                                      marketType="Match Odds"
                                                    />

                                                  )}
                                                </div>
                                                <div>
                                                  {prices.runners[1].ex.availableToLay && prices.runners[1].ex.availableToLay.length > 0 ? (
                                                    <OddsComponent
                                                      styling1={styling1}
                                                      canBet={canBet}
                                                      eventName={event_.match_name}
                                                      team={team2}
                                                      price={prices.runners[1].ex.availableToLay[0].price}
                                                      size={formatNumber(prices.runners[1].ex.availableToLay[0].size)}
                                                      eventId={eId}
                                                      marketId={event_.market_id}
                                                      type="lay"
                                                      marketType="Match Odds"
                                                    />
                                                  ) : (
                                                    <EmptyOddCell
                                                      styling1={styling1}
                                                      canBet={canBet}
                                                      eventName={event_.match_name}
                                                      team={team2}
                                                      eventId={eId}
                                                      marketId={event_.market_id}
                                                      type="lay"
                                                      marketType="Match Odds"
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                          :
                                          (
                                            <div className='col-span-2 '>
                                              <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                                {/* <div> */}
                                                <EmptyOddCell
                                                  styling1={styling1}
                                                  canBet={canBet}
                                                  eventName={event_.match_name}
                                                  team={team2}
                                                  eventId={eId}
                                                  type="back"
                                                  marketId={event_.market_id}
                                                  marketType="Match Odds"
                                                />
                                                <EmptyOddCell
                                                  styling1={styling1}
                                                  canBet={canBet}
                                                  eventName={event_.match_name}
                                                  team={team2}
                                                  eventId={eId}
                                                  marketId={event_.market_id}
                                                  type="lay"
                                                  marketType="Match Odds"
                                                />

                                              </div>
                                            </div>
                                          )
                                    }
                                  </div>
                                </div>
                                <div className='col-span-1 flex items-center'>
                                  <p className="t_c_1 p_2 font-small cursor-pointer bg-gray-300 p-1 rounded font-bold " onClick={() => {

                                    router.push(`?cpg=${"marketwatch"}&pg=${"betlist"}&evt=${event_.match_id}`)
                                  }}>Bet List</p>
                                </div>
                              </div>
                            </div>

                            <div className="mk:hidden"></div>
                          </div>
                        )
                      }

                    })
                  }
                </div>
              </div>


            </Collapse>
          </Box>
        )
      }
    </div >
  )
}

export default MatchesComponent





