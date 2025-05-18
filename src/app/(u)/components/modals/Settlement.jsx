"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const SettlementModal = ({ setCloseModal, setRefresh, settleType, settlement }) => {


  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [notification, setNotification] = useState("")

  const sendRequest = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/settlementTransaction`,
          {
            user_id: settlement.user_id,
            type: settleType,
            description: description,
            settle_amount: amount,
            settlement_id: settlement.settlement_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res && res.status === 200) {
          if (res.data.error === false) {
            setNotification(res.data.message)
          }
          setTimeout(() => {
            setCloseModal(false)
            setRefresh(true)
            setNotification("")
          }, 1000)
        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center">
        <p className="font-bold  text-green-500 p_2">{notification && notification}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 w-full">
          <label className="p_1  font-bold " htmlFor="description">Description</label>
          <input type="text" name="description" id="" onChange={(e) => setDescription(e.target.value)} className="w-full rounded px-3 py-1 border-gray-300 border-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 items-end">
        <div className="col-span-1 w-full">
          <label className="p_1  font-bold " htmlFor="settle_amount">Amount</label>
          <input type="number" name="settle_amount" id="" onChange={(e) => setAmount(e.target.value)} placeholder={settlement && settlement.settle_amount} className="w-full rounded px-3 py-1 border-gray-300 border-2" />
        </div>
        <div className="col-span-1 justify-end flex items-center">
          <button onClick={() => sendRequest()} type="button" className={` ${settleType === "debit" ? `bg-yellow-500` : `bg-green-500`}  text-gray-100 rounded p_1 font-bold px-2 py-1`}>{settleType === "debit" ? `Debit` : `Credit`}</button>
        </div>

      </div>

    </div>
  );
};
export default SettlementModal;
