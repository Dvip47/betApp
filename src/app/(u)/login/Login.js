"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { getGlobalSetings } from "@/app/api";

export default function LoginPage() {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalSettings, setGlobalSettings] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    runner();
    const tk = isAuthenticated();
    if (tk) {
      const tokenObj = localStorage.getItem("tk");
      const decoded = jwt_decode(tokenObj);
      const roleToUrlMap = {
        whitelevel: "/",
        admin: "/",
        master: "/",
        super: "/",
        panel: "/",
      };

      const redirectUrl = roleToUrlMap[decoded.role];
      if (decoded.status === "locked") {
        return alert("Your account has been blocked");
      } else {
        if (redirectUrl) {
          window.location.replace(redirectUrl);
        }
      }
    }
  }, []);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const action = localStorage.getItem("openLogin");
    if (action) {
      localStorage.removeItem("openLogin");
    }
    if (
      formValues.username.trim() === "" ||
      formValues.password.trim() === ""
    ) {
      alert("Input all the fields");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        formValues
      );
      if (res && res.status === 200) {
        if (res.data.statusCode === 200) {
          setLoading(false);
          const token_key = res.data.token;
          localStorage.setItem("tk", token_key);
          const decoded = jwt_decode(token_key);
          const roleToUrlMap = {
            mainAdmin: "/",
            admin: "/",
            whitelevel: "/",
            master: "/",
            super: "/",
            panel: "/",
          };
          if (decoded.status === "locked") {
            setSuccess(false);
            return alert("Your account has been blocked");
          }

          setSuccess(true);

          const redirectUrl = roleToUrlMap[decoded.role];
          if (redirectUrl) {
            window.location.replace(redirectUrl);
          }
        } else {
          setErrorM(res.data.message);
          setLoading(false);
          setSuccess(false);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorM("Something went wrong, contact support for help");
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorM("");
    }, 7000);
    return () => clearTimeout(timer);
  }, [errorM]);

  const runner = async () => {
    try {
      const globalSettings_ = await getGlobalSetings();
      setGlobalSettings(globalSettings_);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#525252] to-[#000] h-screen w-full flex flex-col justify-center items-center ">
     
      <div className="flex justify-center items-center ">
        <div className="max-sm:w-screen min-w-[270px] h-full flex flex-col justify-center">
          <div
            onClick={() => window.location.reload()}
            className="cursor-pointer w-auto h-26 flex items-center justify-center"
          >
            {globalSettings && globalSettings.businessLogo && (
              <img
                src={
                  globalSettings?.businessLogo &&
                  `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}/api/${globalSettings.businessLogo}`
                }
                alt="LOGO"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <form
            className="col-span-1 w-full rounded-lg shadow-lg"
            onSubmit={handleLogin}
          >
            {errorM && (
              <div>
                <p className="text-red-700 font-bold">{errorM}</p>
              </div>
            )}

            <div className="mb-7 flex  items-center w-full">
              {/* <label className="block text-white" htmlFor="password">Password</label> */}
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-6 pr-10 text-black outline-none focus:border-danger focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-danger"
                  value={formValues.username}
                  onChange={handleChange}
                  required
                />
                <div className="absolute right-0 top-0 bottom-0 font-bold border-l-2 border-gray/[0.5] px-2 flex items-center justify-center">
                  <PersonIcon fontSize="medium" className="text-black" />
                </div>
              </div>
            </div>
            <div className="mb-7 flex  items-center w-full">
              <div className="relative w-full flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  // className="w-full  py-3 font-bold  text-lg text-black rounde-lgd border-2 focus:border-danger-400 bg-gray-300"
                  className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-6 pr-10 text-black outline-none focus:border-danger focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-danger"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 text-black text-sm font-bold border-l-2 border-gray/[0.5] px-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" className="" />
                  ) : (
                    <VisibilityIcon fontSize="small" className="" />
                  )}
                </button>
              </div>
            </div>
            <div className="my-1 text-center">
              <button
                type="submit"
                className="bg-[#F6A21E] font-bold text-lg hover:bg-yellow-400 w-full px-4 py-2.5 rounded"
                disabled={loading}
              >
                {loading ? "Processing" : success ? "Redirecting.." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
