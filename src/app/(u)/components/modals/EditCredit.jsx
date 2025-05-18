"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";
import { editCreditRefSender } from "@/app/api/ship_yard/sender";

const EditCredit = ({ userData, setRefresh, setCloseModal }) => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAdded, setUserAdded] = useState("");

  useEffect(() => {
    setTimeout(() => {
      success && setSuccess(false)
    }, 2000)
  }, [success])

  const form = useForm({
    initialValues: {
      user_id: userData._id,
      creditRef: userData.creditRef,
      newCreditRef: 0,
      password: ""
    },
  });

  const handleCreditRef = async () => {
    setLoading(true);
    const requiredFields = [
      "newCreditRef",
      // "password"
    ];
    try {
      setRefresh(false);
      const res = await editCreditRefSender(form.values);
      if (res) {
        if (res.status === 200) {
          setLoading(false);
          if (res.data.statusCode === 200) {
            setRefresh(true);
            setUserAdded("Action Successful");
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
    // if (requiredFields.every((field) => form.values[field] !== "")) {
      
    // } else {
    //   setLoading(false);
    //   setErrorM("Some required fields are missing");
    // }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
      setUserAdded("");
    }, 4000);
  }, [errorM]);

  useEffect(() => {
    setTimeout(() => {
      setUserAdded("");
    }, 5000);
  }, [userAdded]);
  return (
    <div>
      <form>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <NumberInput
              label="Current Credit Ref."
              placeholder={userData.creditRef || "--"}
              value={userData.creditRef}
              readOnly
              {...form.getInputProps("creditRef")}
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              label="New Credit Ref."
              placeholder={"--"}
              {...form.getInputProps("newCreditRef")}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 pt-10">
          <div className="col-span-1">
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
          </div>
          <div className="col-span-2">
            <div className="flex gap-x-4 items-center justify-end  text-white">
              {/* <PasswordInput
                className="w-[60%]"
                placeholder={"Password"}
                value={userData.creditRef}
                {...form.getInputProps("password")}
              /> */}
              <Button
                className="bg-gray-900 text-[0.8rem]"
                disabled={loading || success}
                onClick={() => handleCreditRef()}
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
export default EditCredit;
