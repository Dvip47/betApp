import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";

import { isAuthenticated } from "../funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";

import { Button, Modal } from "@mantine/core";
import Create from "../Modal/Create";
import Login from "../Modal/Login";

import { fetchUserData } from 'src/app/api/exchange';
import { useRouter } from "next/navigation";


export default function MobileBottom({ toggleSideBar }) {
  const [userBal, setUserBal] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [currentPage, setCurrentPage] = useState("")
  const containerRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false);
  const [userExposure, setUserExposure] = useState("");

  const { openLogin, setOpenLogin, setOpenRegister, openRegister, setUserData, userData, getfreshUserData } =
    useContext(AuthContext);


  useEffect(() => {
    const crnturl = localStorage.getItem("current_pg")
    if (crnturl) {
      const currentpg = JSON.parse(crnturl)
      setCurrentPage(currentpg)
    } else {
      setCurrentPage("Home")
    }
    const loggedIN = isAuthenticated();
    if (loggedIN) {
      fetchUserData();
    }
  }, []);



  useEffect(() => {
    const action = localStorage.getItem("openLogin");
    if (action) {
      setOpened(true);
    }
    const auth = isAuthenticated();
    if (auth) {
      setLoggedIN(true);
    }
  }, []);
  useEffect(() => {
    const action = localStorage.getItem("openRegister");
    if (action) {
      setOpenedCreate(true);
    }
  }, [openRegister]);
  useEffect(() => {
    if (openLogin) {
      setOpened(true);
    } else {
      opened && setOpened(false);
    }
  }, [openLogin]);

  const handleCloseLogin = () => {
    setOpenLogin(false);
    setOpened(false);
    const op = localStorage.getItem("openLogin");
    op && localStorage.removeItem("openLogin");
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
    setOpenedCreate(false);
    const op = localStorage.getItem("openRegister");
    op && localStorage.removeItem("openRegister");
  };

  const handleLogout = async () => {
    console.log("loggin out");
    setDisable(true);

    try {
      const tk = localStorage.getItem("tk");
      if (!tk) {
        window.location.replace("/");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      if (res && res.status === 200) {
        localStorage.removeItem("tk");
        if (localStorage.getItem("openLogin")) {
          localStorage.removeItem("openLogin");
        }
        setOpenLogin(false);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (userData != {}) {
      // const bal = parseInt(userData.availableBalance)
      // const exposure = parseInt(userData.exposure)
      // setUserBal(bal)
      // setUserExposure(exposure)
    } else {
      getfreshUserData()
    }
  }, [userData])



  const [isScreenSmall, setIsScreenSmall] = useState("false");

  useEffect(() => {
    // Define the width at which the screen is considered small
    const screenWidthThreshold = 768; // Example threshold, you can change it as needed

    // Function to handle screen size change
    const handleScreenSizeChange = (e) => {
      if (e.matches) {
        setIsScreenSmall("true"); // Set state to "true" if screen is small
      } else {
        setIsScreenSmall("false"); // Set state to false if screen is not small
      }
    };

    // Listen for changes in screen size
    const mediaQuery = window.matchMedia(`(max-width: ${screenWidthThreshold}px)`);

    // Initial check for screen size
    handleScreenSizeChange(mediaQuery);

    // Add event listener for screen size changes
    mediaQuery.addEventListener('change', handleScreenSizeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenSizeChange);
    };
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-black flex justify-between gap-x-1 px-2 py-1 items-center">
      <div className="w-full flex justify-start items-center">
        <Link href="/#" passHref >
          <p className="text-[1rem] tracking-wide font-bold">
            <span className="text-white">Aura-</span>
            <span className="text-orange-800 rounded p-1  bg-white">
              Bet
            </span>
          </p>
        </Link>
      </div>
      <div className="flex gap-1 items-center justify-end w-full">
        {!loggedIN ? (
          <div className="flex items-center justify-end gap-x-4 px-1 rounded font-bold py-3 cursor-pointer text-white  text-[0.8rem]">
            <div onClick={() => setOpenLogin(true)} className={`bg-gradient-to-l from-black to-yellow-400 flex items-center justify-center gap-1  rounded py-1 px-3 hover:text-gray-200 cursor-pointer`}>
              <VpnKeyIcon fontSize="small" color="white" />
              <p className="font-bold truncate">
                Login
              </p>
            </div>
          </div>
        ) : (
          <div className={`flex items-center justify-end gap-x-4 px-1 rounded font-bold py-2 cursor-pointer text-white  text-[0.8rem]`} onClick={() => isScreenSmall === "false" && setToggle(prev => !prev)}>

            <div className="text-[0.7rem]">
              <p>Exposure</p>

              {userData != {} && userData.exposure ? (
                <p className="text-red-500">
                  {parseInt(userData.exposure).toFixed(2)}
                </p>
              ) :
                (
                  <p className="text-red-500">{`--`}</p>
                )
              }
            </div>
            <div className="text-[0.7rem]">
              <p>Balance</p>
              {userData != {} && userData.availableBalance ? (
                <p className="text-green-400">
                  {parseInt(userData.availableBalance).toFixed(2)}
                </p>
              ) :
                (
                  <p className="text-green-400">{`--`}</p>)
              }
            </div>
            <Button
              disabled={disable}
              onClick={handleLogout}
              className="inline-block rounded-md border-none bg-gray-700  px-3 py-1 hover:bg-orange-500/[0.2] text-gray-200 text-[0.8rem]"
            >
              Logout
            </Button>
          </div>
        )}

      </div>
      <Modal
        opened={openLogin}
        onClose={() => handleCloseLogin()}
        title="Login"
        size={""}
        className="bg-gray-900"
      >
        <Login />
      </Modal>
      <Modal
        opened={openRegister}
        onClose={() => handleCloseRegister()}
        title="Register"
        size={""}
      >
        <Create />
      </Modal>
    </div>

  );
}