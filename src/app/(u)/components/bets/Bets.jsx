import { sendHttpRequest } from '@/app/api/ship_yard/sender';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { MantineProvider, Group, Tooltip } from "@mantine/core";

const Bets = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const evt = searchParams.get("evt")
  const [bets, setBets] = useState([])

  const getBets = async () => {
    try {
      if (evt === null) {
        return
      }
      const res = await sendHttpRequest(`/bets/all`, "post", { match_id: evt })
      if (res.data.bets) {
        if (res.data.bets.length > 0) {
          setBets(res.data.bets)
        }else{
          setBets([])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * 
   * @param {String} betId 
   * @returns 
   */
  const deleteBet = async (betId) => {
    try {
      if (evt === null) {
        return
      }
      const res = await sendHttpRequest(`/bets/delBets`, "post", { bets: [betId] })
      if (res.status === 200) {
        alert(res.data.message)
        getBets()
      }
      if (res.status === 403) alert(res.data.message)
      if (res.status === 400) alert(res.data.message)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getBets()
  }, [searchParams])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const styles_01 = `px-3 py-1 border-r border-gray-400 p_2_sm t_c_1 font-bold tracking-wide`
  const th_1 = `px-3 py-1`
  const tr_1 = `border-b border-gray-400`
  const laybg = `bg-[#F5ACD4]/[0.9]`
  const backbg = `bg-[#78B5EA]/[0.9]`
  return (
    <MantineProvider>
      <div className="flex flex-col">

        {bets.length > 0 && (
          <div className='flex items-center gap-x-2 my-2'>
            <p className='p_1_sm font-bold'>Match Name:</p>
            {/* <input type="text" className='p_1_sm font-bold px-2 py-0 rounded' disabled value={`${bets[0].eventName}`} id="" /> */}
            <p className='p_1_sm font-bold bg-white px-1 rounded'>{bets[0].eventName}</p>
          </div>)}
        <section className="w-full">
          <table className="bg-gray-100 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="p_2 text-gray-200 tracking-wider bg_1 dark:bg-gray-700 dark:text-gray-200">
              <tr className='py-4'>
                <th scope="col" className={`${th_1}`}>
                  Market Name
                </th>
                <th scope="col" className={`${th_1}`}>
                  Selection
                </th>
                <th scope="col" className={`${th_1}`}>
                  Type
                </th>
                <th scope="col" className={`${th_1}`}>
                  Odds
                </th>
                <th scope="col" className={`${th_1}`}>
                  Stake
                </th>
                <th scope="col" className={`${th_1}`}>
                  Potential Profit
                </th>
                <th scope="col" className={`${th_1}`}>
                  Potential Loss
                </th>
                <th scope="col" className={`${th_1}`}>
                  Username
                </th>
                <th scope="col" className={`${th_1}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='b'>
              {bets.length === 0 && (
                <p className="px-3 py-1 p_2_sm t_c_1 font-bold tracking-wide">No data at the moment</p>
              )}
              {bets && bets.length > 0 &&
                bets.map((betObj, i) => {
                  return (
                    <tr key={i} className={`${tr_1} ${betObj.type === 'back' ? ']' : 'bg-[#D8]/[0.4]'} hover:bg-gray-200/[0.1]`}>
                      <td className={styles_01}>{`${i + 1}. `}{`${betObj.market_name}`}</td>
                      <td className={styles_01}>{betObj.selection_name}</td>
                      <td className={`${styles_01} ${betObj.type == "back" ? backbg : laybg}`}>{capitalizeFirstLetter(betObj.type)}</td>
                      <td className={styles_01}>{parseFloat(betObj.price).toFixed(2)}</td>
                      <td className={styles_01}>{parseFloat(betObj.stack).toFixed(2)}</td>
                      <td className={styles_01}>{parseFloat(betObj.potential_profit).toFixed(2)}</td>
                      <td className={styles_01}>{parseFloat(betObj.potential_loss).toFixed(2)}</td>
                      <td className={styles_01}>{betObj.user_name}</td>
                      <td className={styles_01}>
                        <Tooltip.Group>
                          <Group justify="center">
                            <Tooltip openDelay={500} closeDelay={200} position="bottom-start" arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Delete Bet">
                              <p className="t_c_1 p_2_sm font-small cursor-pointer bg-yellow-500 p-1 rounded" onClick={() => {
                                deleteBet(betObj._id)
                              }}>Delete</p>
                            </Tooltip>
                            <Tooltip openDelay={500} closeDelay={200} position="bottom-start" arrowPosition="side" arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Void Bet">
                              <p className="t_c_1 p_2_sm font-small cursor-pointer bg-yellow-500 p-1 rounded" onClick={() => {
                                alert("Coming soon")
                              }}>Void</p>
                            </Tooltip>
                          </Group>
                        </Tooltip.Group>
                      </td>

                    </tr>
                  )
                })}
            </tbody>
          </table>
        </section>
      </div>
    </MantineProvider>

  );
};

export default Bets;
