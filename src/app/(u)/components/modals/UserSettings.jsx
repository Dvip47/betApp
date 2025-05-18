"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";
import StatusRow from "../StatusGrid";

const UserStatusSettings = ({ userData, setRefresh, setCloseModal }) => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAdded, setUserAdded] = useState("");
  const [userStatus, setUserStatus] = useState(userData.status);

  const editUserStatus = async (formData) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/status_patch`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res && res.status === 200) {
          return res;
        }
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorM(error.response.data.message);
      }
      return;
    }
  };

  const handleUserStatus = async () => {
    setLoading(true);
    setRefresh(false);
    if (userStatus != "" && userData) {
      try {
        const res = await editUserStatus({ userStatus, user_id: userData._id, });
        if (res) {
          if (res.status === 200) {
            setLoading(false);
            if (res.data.statusCode === 200) {
              setRefresh(true);
              setUserAdded("Successfully Modified User Status");
              setCloseModal(true);
              setSuccess(true);
            } else {
              setUserAdded("Oops something went wrong");
            }
          } else {
            setLoading(false);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorM(error.response.data.message);
        }
      }
    } else {
      setLoading(false);
      setErrorM("Please enter your password");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
      setUserAdded("");
    }, 7000);
  }, [errorM]);

  useEffect(() => {
    setTimeout(() => {
      setUserAdded("");
    }, 5000);
  }, [userAdded]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  }, [success]);
  return (
    <div>
      <form>
        <StatusRow userStatus={userStatus} setUserStatus={setUserStatus} />
        <div className="grid grid-cols-3 pt-10">
          <div className="col-span-1">
            {errorM && (
              <div className=" bg-white">
                <p className="text-red-900 font-bold text-[0.75rem]">{errorM}</p>
              </div>
            )}
            {userAdded && (
              <div className="bg-white">
                <p className="text-green-900 font-bold text-[0.75rem]">{userAdded}</p>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className="flex gap-x-4 items-center justify-end  text-white">
              {/* <PasswordInput
                className="w-[60%]"
                placeholder={userData.availableBalance || "Password"}
                value={userData.availableBalance}
                {...form.getInputProps("availableBalance")}
              /> */}
              <Button
                className="bg-gray-900 text-[0.8rem]"
                disabled={loading}
                onClick={() => handleUserStatus()}
              >
                {loading ? "Processing" : success ? "Success" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UserStatusSettings;
