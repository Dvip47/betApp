"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";

const EditUserById = ({ userData, setRefresh, setCloseModal }) => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAdded, setUserAdded] = useState("");


  const form = useForm({
    initialValues: {
      fullName: "",
      username: "",
      partnership: "",
      user_id: userData._id,
      password: ""
    },
  });

  const editUser_ = async (formData) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/patch`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("sent req");
        if (res && res.status === 200) {
          console.log(res);
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

  const handleEditUser = async () => {
    setLoading(true);
    setRefresh(false)

    const requiredFields = [
      "fullName",
      "username",
      "partnership",
      "password"
    ];

    if (requiredFields.every(field => field === "")) {
      setErrorM("You have not yet typed anything!");
    }

    try {
      const res = await editUser_(form.values);
      if (res) {
        if (res.status === 200) {
          setLoading(false);
          if (res.data.statusCode === 200) {
            setRefresh(true)
            setUserAdded("Action Successfull");
            setCloseModal(true);
            setSuccess(true);
          } else {
            setRefresh(true)
            setUserAdded(res.data.message);
          }
        } else {
          setRefresh(true)
          setLoading(false);
        }
      }
      setRefresh(true)

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
  return (
    <div>
      <form>
        {errorM && (
          <div className=" bg-white">
            <p className="text-red-900">{errorM}</p>
          </div>
        )}
        {userAdded && (
          <div className="bg-white">
            <p className="text-green-900">{userAdded}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <TextInput
              label="Full Name"
              placeholder={userData.fullName || "Full Name"}
              {...form.getInputProps("fullName")}
            />
          </div>
          <div className="col-span-1">
            <TextInput
              label="Username"
              placeholder={userData.username || "username"}
              {...form.getInputProps("username")}
            />
          </div>

        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <NumberInput
              label="Partnership"
              placeholder={userData.partnership}
              {...form.getInputProps("partnership")}
            />
          </div>
          <div className="col-span-1">
            <PasswordInput
              label="Change User Password"
              placeholder={"NewPassword"}
              withAsterisk
              {...form.getInputProps("password")}
              className="placeholder-gray-500"
            />
          </div>
        </div>


        <div className=" mt-2 mb-2 flex justify-end  text-white">
          <Button
            className="bg-blue-600"
            disabled={loading || success}
            onClick={() => handleEditUser()}
          >
            {loading ? "Processing" : success ? "Success" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditUserById;
