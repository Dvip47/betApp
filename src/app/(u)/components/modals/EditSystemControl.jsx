"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";

const EditSystemControl = ({ userData, setRefresh,setCloseModal }) => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAdded, setUserAdded] = useState("");
  

  const form = useForm({
    initialValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      exposure: userData.exposure,
      exposureLimit: userData.exposureLimit,
      partnership: userData.partnership,
      creditRef: userData.creditRef,
      user_id: userData._id
    },
  });

  const EditUser = async (formData) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/control/patch`,
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
      console.log("failed req");
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
    console.log(form.values);

    const requiredFields = [
      "firstName",
      "lastName",
      "exposure" ,
      "exposureLimit",
      "partnership",
      "creditRef",
      "availableBalance",
      "balance",

    ];

    if (requiredFields.every((field) => form.values[field] !== "")) {
      try {
        const res = await EditUser(form.values);
        console.log(res);
        if (res) {
          if (res.status === 200) {
            setLoading(false);
            if (res.data.statusCode === 200) {
              setRefresh(true)
              setUserAdded("Successfully Added");
              setCloseModal(true);
              setSuccess(true);
            } else {
              setUserAdded(res.data.message);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-1">
            <TextInput
              label="First Name"
              placeholder={userData.firstName || "First Name"}
              {...form.getInputProps("firstName")}
            />
          </div>
          <div className="col-span-1">
            <TextInput
        
              label="Last Name"
              placeholder={userData.lastName || "Last Name"}
              {...form.getInputProps("lastName")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-1">
            <NumberInput
              label="Exposure"
              placeholder={userData.exposure}
              {...form.getInputProps("exposure")}
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              label="Exposure Limit"
              placeholder={userData.exposureLimit}
              {...form.getInputProps("exposureLimit")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-1">
            <NumberInput
              label="Balance"
              placeholder={userData.balance}
              {...form.getInputProps("balance")}
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              label="Available Balance"
              placeholder={userData.availableBalance}
              {...form.getInputProps("availableBalance")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-1">
            <NumberInput
              label="Partnership"
              placeholder={userData.partnership || "--"}
              value={userData.partnership}
              {...form.getInputProps("partnership")}
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              label="Credit Ref."
              placeholder={userData.creditRef || "--"}
              {...form.getInputProps("creditRef")}
            />
          </div>
        </div>

        <div className=" mt-2 mb-2 flex justify-end  text-white">
          <Button
            className="bg-blue-600"
            disabled={loading || success}
            onClick={() => handleRegister()}
          >
            {loading ? "Processing" : success ? "Success" : "Edit & Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditSystemControl;
