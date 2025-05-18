"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";

const AddUserWithRole = ({ userRole, setCloseModal, setRefresh,events }) => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAdded, setUserAdded] = useState("");

  const form = useForm({
    initialValues: {
      fullName: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      exposureLimit: 0,
      creditRef: 0,
      balance: 0,
      role: userRole,
      eventList: events || []
    },
  });

  const registerUser = async (formData) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        setRefresh(false)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/adduser`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res && res.status === 200) {
          setRefresh(true)
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

  const handleRegister = async () => {
    setLoading(true);
    // e.preventDefault();
    

    const requiredFields = [
      "fullName",
      "username",
      "phoneNumber",
      "email",
      "password",
      "creditRef",
      "exposureLimit",
      "balance",

    ];

    if (requiredFields.every((field) => form.values[field] !== "")) {
      try {
        const res = await registerUser(form.values);
        console.log(res);
        if (res) {
          if (res.status === 200) {
            setLoading(false);
            if (res.data.statusCode === 200) {
              setUserAdded("Successfully Added");
              setSuccess(true);
              setCloseModal(true);
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
      setErrorM("Some required fields are missing");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
      setUserAdded("");
    }, 10000);
  }, [errorM]);

  useEffect(() => {
    setTimeout(() => {
      setUserAdded("");
    }, 10000);
  }, [userAdded]);
  return (
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
            withAsterisk
            label="Full Name"
            placeholder="Full Name"
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("fullName")}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            withAsterisk
            label="Username"
            placeholder="username"
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("username")}
          />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-2">

        <div className="col-span-1">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("email")}
          />
        </div>
        <div className="col-span-1">
          <NumberInput
            label="Phone Number"
            placeholder="(+9)12345.."
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("phoneNumber")}
          />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <TextInput
            withAsterisk
            label="Credit Ref."
            placeholder="Credit Ref."
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("creditRef")}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            withAsterisk
            label="Exposure Limit"
            placeholder="exposureLimit"
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("exposureLimit")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <TextInput
            withAsterisk
            label="Opening Balance"
            placeholder="Opeing Bal."
            onFocus={() => setSuccess(false)}
            {...form.getInputProps("balance")}
          />
        </div>
        <div className="col-span-1">
          <PasswordInput
            placeholder="Password"
            label="Password"
            onFocus={() => setSuccess(false)}
            // description="Password must include at least one letter, number and special character"
            withAsterisk
            {...form.getInputProps("password")}
          />
        </div>
      </div>


      <div className=" mt-8 flex justify-end mb-2 items-center  text-white">
        <Button
          className="bg-black"
          disabled={loading || success}
          onClick={() => handleRegister()}
        >
          {loading ? "Processing" : success ? "Success" : "Add"}
        </Button>
      </div>
    </form>
  );
};
export default AddUserWithRole;
