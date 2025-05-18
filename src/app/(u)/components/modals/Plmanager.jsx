"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";
import { editExposureLimitSender, sendHttpRequest, transact } from "@/app/api/ship_yard/sender";

const Plmanager = ({ userData, setRefresh, setCloseModal,controlSent }) => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [successdep, setSuccessdep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");

  const form = useForm({
    initialValues: {
      user_id: userData._id,
      refPL: userData.refPL,
      amountToTransact: 0,
      password: ""
    },
  });


  const handleTransaction = async (transaction_type) => {
    setLoading(true);
    setRefresh(false);

    const requiredFields = [
      "amountToTransact",
      "refPL",
      "user_id"
    ];

    if (requiredFields.every((field) => form.values[field] !== "")) {
      try {
        let url =`/ctr/refpl/${transaction_type === "deposit" ? "deposit" : "withdraw"}`
        const res = await sendHttpRequest(url, "post", form.values);
        if (res) {
          if (res.status === 200) {
            setLoading(false);
            if (res.data.statusCode === 200) {
              setRefresh(true);
              setMessageInfo("Transaction Successfull");
              transaction_type === "withdraw" ? setSuccess(true) : setSuccessdep(true)
              setCloseModal(true);
            } else {
              setMessageInfo(res.data.message);
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
      setMessageInfo("");
    }, 7000);
  }, [errorM]);

  useEffect(() => {
    setTimeout(() => {
      setMessageInfo("");
    }, 5000);
  }, [messageInfo]);
  return (
    <div>
      <form>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <NumberInput
              label="Ref P/L"
              placeholder={userData.refPL || "--"}
              value={userData.refPL}
              readOnly
              {...form.getInputProps("refPL")}
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              label="Amount to Withdraw/Deposit"
              placeholder={"--"}
              {...form.getInputProps("amountToTransact")}
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
            {messageInfo && (
              <div className="bg-white">
                <p className="text-green-900">{messageInfo}</p>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className="flex gap-x-4 items-center justify-end  text-white">
              {/* <PasswordInput
                className="w-[60%]"
                placeholder={userData.refPL || "Password"}
                value={userData.refPL}
                {...form.getInputProps("refPL")}
              /> */}
              <Button
                className="bg-green-900 text-[0.8rem]"
                disabled={loading || successdep}
                onClick={() => handleTransaction("deposit")}
              >
                {loading ? "Processing" : successdep ? "Success" : "Deposit"}
              </Button>
              <Button
                className="bg-gray-900 text-[0.8rem]"
                disabled={loading || success}
                onClick={() => handleTransaction("withdraw")}
              >
                {loading ? "Processing" : success ? "Success" : "Withdraw"}
              </Button>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Plmanager;
