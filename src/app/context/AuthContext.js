import React, { createContext, useEffect, useState } from "react";
import { fetchUserData } from "../api/exchange";
import { isAuthenticated } from "../components/funcStore/authenticate";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [currentCenter, setCurrentCenter] = useState("home")
  const loggedIn = isAuthenticated()

  const [userData, setUserData] = useState("")
  const runner = async () => {
    try {
      const userData_ = await fetchUserData()
      if (userData_) {
        setUserData(userData_)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(loggedIn){
      runner()
    }else{
      setOpenLogin(true)
    }
  }, [])

  const getfreshUserData = (from) => {
    // alert(`${from} -ok`)
    runner()
  }

  useEffect(() => {
    if (openLogin) {
      localStorage.setItem("openLogin", true);
    }
  }, [openLogin]);

  useEffect(() => {
    if (openRegister) {
      localStorage.setItem("openRegister", true);
      setOpenLogin(false);
    }
  }, [openRegister]);

  return (
    <AuthContext.Provider
      value={{ openLogin, setOpenLogin, openRegister, setOpenRegister, getfreshUserData, setUserData, userData, currentCenter, setCurrentCenter }}
    >
      {children}
    </AuthContext.Provider>
  );
};
