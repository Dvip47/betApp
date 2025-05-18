import React, { useEffect, useState } from "react";
import { Button, TextInput, PasswordInput, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
export default function ClearAllData() {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      password: "",
      password1: ""
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setErrorM("")
    }, 5000)
  }, [errorM])

  useEffect(() => {
    setTimeout(() => {
      setSuccess("")
    }, 7000)
  }, [success])



  const clearAllData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("tk")
      if (form.values.password.trim() != "" && token) {

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/clearAllData`,
          {
            master_pwd: form.values.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

        if (res && res.status === 200 && res.data.statusCode === 200) {
          setSuccess(res.data.message)
        } else {
          alert("Something went wrong, please contact support for help")
        }
        setLoading(false);
      } else {
        setErrorM("Master Passoird is Required")
        setLoading(false);

      }



    } catch (error) {
      console.log(error);
      setErrorM("Something went wrong, contact support for help");
      setLoading(false);

    }
  };

  return (
    <div className="bg-gray-100 p-2 ">
      <h1 className="text-xl font-semibold mb-4 ">Clear All Data</h1>
      <div className="p-12 flex flex-col items-center gap-2 justify-center ">

        <p className="t_c_1 h_6 font-bold"><span className="text-orange-500 underline font-bold h_5">Note:</span> Here All Record of bet history, transfer statement, profit & loss, All user data, All Match data,All Series will be deleted.After this your panel will work as a new Panel.</p>

        <div className="flex flex-col p-10 rounded bg-blue-700/[0.1]">
          <div className="flex items-center py-2">
            <p className="text-green-500 h_6">{success && success}</p>
          </div>

          <div className={`gap-2 flex mt-4 ${errorM && "border-2 border-orange-500 rounded p-2"}`}>
            <PasswordInput
              placeholder=""
              className="min-w-[200px]"
              label="Master Passoword "
              {...form.getInputProps("password")}
            />
          </div>

          <div className="flex items-center py-2">
            <p className="text-orange-500">{errorM && errorM}</p>
          </div>
          <button className="bg-orange-500 p_1 p-2 font-bold rounded text-gray-100 mt-10" disabled={loading} type="button" onClick={() => clearAllData()}>{loading ? "Please wait, clearing.." : "DELETE"}</button>
        </div>
      </div>
    </div>
  );
}
