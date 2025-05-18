import { getSettlements } from "@/app/api/exchange";
import React, { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import SettlementModal from "@/app/(u)/components/modals/Settlement";


export default function Settlement() {
  const [credit, setCredit] = useState([])
  const [debit, setDebit] = useState([])
  const [openAddMainAdmin, setOpenAddMainAdmin] = useState(false);
  const [totalDebit, setTotalDebit] = useState("")
  const [totalCredit, setTotalCredit] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [settleType, setSettleType] = useState("")
  const [settlement, setSettlement] = useState({
  })

  const getData = async () => {
    try {
      const settlementsRes = await getSettlements({ pageno: "", limit: "", user_id: "" })
      if (settlementsRes.error === false) {
        setCredit(settlementsRes.data.credit)
        setDebit(settlementsRes.data.debit)
        setTotalDebit(settlementsRes.data.total_debit)
        setTotalCredit(settlementsRes.data.total_credit)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [refresh])
  const handleSettleModal = (type) => {
    setSettleType(type)
    setOpenAddMainAdmin(prev => !prev);
  };

  return (
    <div className="w-full">
      <div className="heading_top border-b-[1px] border-b-black mt-[20px] mb-[10px] ">
        <h1 className="text-xl mb-4 ">Settlement</h1>
      </div>

      <div className="w-full grid grid-cols-2 gap-x-4">
        <div className="rounded">
          <div className="bg_1 p-2">
            <p className="p_1_sm font-bold text-green-500">Plus Account</p>
          </div>

          {/* DEBIT SIDE */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-300  bg_1 w-full">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    S NO.
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Settle Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  credit.length > 0 &&

                  credit.map((credit, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-yellow-500/[0.5] border-b dark:bg-gray-800 dark:border-gray-700 w-full"
                      >
                        <th className="px-6 py-1 text-gray-100">
                          {index + 1}.
                        </th>
                        <td className="px-6 py-1 text-gray-100 font-bold">{credit.user_name}</td>
                        <td className="px-6 py-1 text-green-500 font-bold">{credit.settle_amount}</td>
                        <td className="px-6 flex gap-x-2 font-bold">
                          <button
                            type="button"
                            onClick={() => {
                              handleSettleModal("credit")
                              setSettlement({
                                user_id: credit.user_id,
                                settlement_id: credit._id,
                                user_name: credit.user_name,
                                settle_amount: credit.settle_amount,
                                type: credit.type,
                              })
                            }}
                            className="text-gray-100 bg-blue-500 font-medium rounded text-sm px-2 py-1 text-center "
                          >
                            Settle
                          </button>

                          <button
                            type="button"
                            // onClick={() => handleMarketModalView(item)}
                            className="text-gray-100 bg-blue-500 font-medium rounded text-sm px-2 py-1 text-center "
                          >
                            History
                          </button>


                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className=" w-full grid grid-cols-2 my-2 bg_1 p-2 rounded">
              <div className="">
                <h3 className="p_1_sm font-bold text-gray-200">
                  Total: <span className="text-green-500 font-bold"> {totalCredit !== "" && totalCredit}</span>
                </h3>
              </div>
            </div>

          </div>
        </div>
        {/* CREDIT SIDE */}
        <div className="rounded">
          <div className="bg_1 p-2">
            <p className="p_1_sm font-bold text-red-500">Minus Account</p>
          </div>



          <div className="relative overflow-x-auto min-h-[400px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-300  bg_1">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S NO.
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Settle Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  debit.length > 0 &&

                  debit.map((debit, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-blue-900/[0.9] border-b dark:bg-gray-800 dark:border-gray-700 w-full"
                      >
                        <th className="px-6 py-1 text-gray-100">
                          {index + 1}.
                        </th>
                        <td className="px-6 py-1 text-gray-100 font-bold">{debit.user_name}</td>
                        <td className="px-6 py-1  font-bold text-red-500"> {parseFloat(debit.settle_amount).toFixed(2)}</td>
                        <td className="px-6 flex gap-x-2 font-bold">
                          <button
                            type="button"
                            onClick={() => {
                              // setOpenAddMainAdmin(true)
                              handleSettleModal("debit")
                              setSettlement({
                                user_id: debit.user_id,
                                settlement_id: debit._id,
                                usernamed: debit.user_name,
                                settle_amount: debit.settle_amount,
                                type: debit.type
                              })
                            }

                            }
                            className="text-gray-100 bg-blue-500 font-medium rounded text-sm px-2 py-1 text-center "
                          >
                            Settle
                          </button>

                          <button
                            type="button"
                            // onClick={() => handleMarketModalView(item)}
                            className="text-gray-100 bg-blue-500 font-medium rounded text-sm px-2 py-1 text-center "
                          >
                            History
                          </button>


                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>

            </table>
            <div className=" w-full grid grid-cols-2 my-2 bg_1 p-2 rounded">
              <div className="">
                <h3 className="p_1_sm font-bold text-gray-200">
                  Total: <span className="text-red-500 font-bold">{totalDebit !== "" && `${totalDebit}`}</span>
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Modal
        opened={openAddMainAdmin}
        onClose={() => handleSettleModal()}
        title={settleType === "debit" ? `Debit` : `Credit`}
        size={""}
      >
        <SettlementModal setRefresh={setRefresh} settleType={settleType} settlement={settlement} setCloseModal={setOpenAddMainAdmin} />
      </Modal>
    </div>
  );
}
