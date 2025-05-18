import React from 'react'
import { Loader } from "@mantine/core";

const Loading = ({ stylings }) => {
  return (
    <div className={`flex justify-center items-center ${stylings || ""}`}>
      <Loader color="orange" type="dots" size={20}/>
      <p className="text-2xl md:text-xl font-bold">
        <span className="text-white">Aura-</span>
        <span className="text-orange-800 rounded p-1 bg-white">
          Bet
        </span>
      </p>
    </div>
  )
}

export default Loading