import React, { useContext, useEffect, useState, useRef } from "react";
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useSearchParams } from "next/navigation";
import { NAVContext } from "@/app/context/NavContext";
import { isAuthenticated } from "../funcStore/authenticate";
import { AuthContext } from "@/app/context/AuthContext";

export default function MobileBottomNav({ toggleSideBar, setHideSideBar }) {
    const { setView, setCurrentCenter } = useContext(NAVContext)
    const { setOpenLogin } = useContext(AuthContext);
    const loggedIn = isAuthenticated()
    const searchParams = useSearchParams()
    const prof = searchParams.get("ac")
    const [toggle, setToggle] = useState(false)


    return (
        <div className="relative py-3 px-4 w-full bg-black rounded flex justify-between gap-x-1 items-center">
            <div className={`${toggle ? "" : "hidden"} absolute left-0 bottom-0 right-0 h-[100vh] w-[100vw] bg-gray-900/[0.8] flex flex-col items-end justify-end `}>
                <div className="rounded-r-[0px] relative min-h-[20vh] w-[50vw] px-1 pb-20">
                    <div className="flex justify-end items-center my-6">
                        <p className="rounded-full bg-gray-500  text-sm font-bold" onClick={() => setToggle(prev => !prev)}>
                            <img src="https://img.icons8.com/ios/50/circled-left--v1.png" className="h-[26px] w-[26px] bg-white border rounded-full" alt="left-arrow" />
                        </p>
                    </div>
                    <div className=" grid grid-cols-1 items-center gap-2">
                        <div
                            onClick={() => {
                                setCurrentCenter("ac_statements")
                                setToggle(prev => !prev)
                            }}
                            className="col-span-1 rounded flex  justify-end gap-x-4 items-center"
                        >
                            <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Acc. Statements</p>
                            <img src="/ac_statements.png" alt="home-icon" className="w-[26px] h-[26px] rounded-full" />
                        </div>
                        <div
                            onClick={() => {
                                setCurrentCenter("p&l")
                                setToggle(prev => !prev)
                            }}
                            className="col-span-1 rounded flex  justify-end gap-x-4 items-center"
                        >
                            <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Profit & Loss</p>
                            <img src="/pl.png" alt="home-icon" className="bg-white w-[26px] h-[26px] rounded" />
                        </div>
                        <div
                            onClick={() => {
                                setCurrentCenter("bet_history")
                                setToggle(prev => !prev)
                            }}
                            className="col-span-1 rounded flex  justify-end gap-x-4 items-center">
                            <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Bet History</p>
                            <img src="/profitloss.png" alt="home-icon" className="w-[26px] h-[26px] rounded-full" />
                        </div>
                        <div
                            onClick={() => {
                                setCurrentCenter("profile")
                                setToggle(prev => !prev)
                            }}
                            className="col-span-1 rounded flex  justify-end gap-x-4 items-center">
                            <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Profile</p>
                            <img src="/user_profile.png" alt="home-icon" className="w-[26px] h-[26px] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div
                onClick={() => {
                    setView(prev => ({
                        ...prev,
                        currentView: ""
                    }))
                    setCurrentCenter("home")
                }}
            >
                <p className="flex flex-col items-center tracking-wide font-bold" onClick={() => setHideSideBar && setHideSideBar(false)}>
                    <img src="https://img.icons8.com/office/16/home--v1.png" alt="home-icon" className="w-[22px] h-[22px] rounded-full" />
                    <span className="text-[0.7rem] text-gray-300">Home</span>
                </p>
            </div>

            <>
                <div onClick={() => {
                    // setView(prev => ({
                    //     ...prev,
                    //     currentView: ""
                    // }))
                    toggleSideBar()
                }} className={`min-w-[40px] md:hidden flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                    <p className="flex flex-col items-center tracking-wide font-bold">
                        <SportsSoccerIcon
                            fontSize="medium"
                            className={`rounded-full`}
                            color={`white`}
                        />
                        <span className="text-[0.7rem] text-gray-300">Sports</span>
                    </p>

                </div>
                <div
                    onClick={() => {
                        setCurrentCenter("inplay")
                    }}
                >
                    <p className="flex flex-col items-center tracking-wide font-bold">
                        <AlarmOnRoundedIcon
                            fontSize="medium"
                            className={`rounded-full`}
                            color={`white`}
                        />
                        <span className="text-[0.7rem] text-gray-300">Inplay</span>
                    </p>
                </div>

                {/* <Link href="/profile?ac=t" passHref >

                        </Link> */}
                <div className="flex flex-col justify-center items-center" onClick={() => {
                    loggedIn ?
                        setToggle(prev => !prev) : setOpenLogin(true)
                }}>
                    <img src="https://img.icons8.com/material-outlined/24/user-male-circle.png" alt="profile" className="w-[22px] h-[22px] bg-white rounded-full" />
                    <p className="text-[0.7rem] text-gray-300">Account</p>
                </div>
            </>


        </div>

    );
}