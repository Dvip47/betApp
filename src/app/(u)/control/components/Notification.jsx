
import React from 'react'

export const Notification = ({ message, type }) => {
    return (
        <p className={`${type === "success" ? "bg-green-600" : "bg-red-600"} text-[0.962rem] text-gray-50 font-bold rounded p-3`}>
            {message}
        </p>
    )
}
