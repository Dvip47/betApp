"use client"
import { addMsg, getMessage } from 'src/app/api/exchange/messages';
import React, { useEffect, useState } from 'react';

export const MessaeForm = () => {
  const [msg, setMsg] = useState("") 

  const handledMessageSave = async (e) => {
    e.preventDefault()
    try {
      if (msg != "") {
        const res = await addMsg(msg)
        alert(res.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    (async () => {
      const msg = await getMessage()
      if (msg) {
        if (msg.length > 0) {
          setMsg(msg[0].message)
        } else {
          setMsg("Add message")
        }
      }
    })()
  }, [])

  return (
    <div className="w-full">
      <form action="" onSubmit={handledMessageSave} className='flex flex-col items-start max-w-[40vw]'>
        <h4>Message</h4>
        <textarea name="message" id="message" cols="70" rows="2" onChange={(e) => setMsg(e.target.value)} value={msg}></textarea>
        <div className="flex items-center justify-end py-1">
          <button className='bg-black text-white rounded p-1'>Save</button>
        </div>
      </form>
    </div>
  );
}