import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { EditPassword } from 'src/app/auth/EditPassword'

const SettingsComponent = () => {
  const searchParams = useSearchParams()
  const pg = searchParams.get("tb")
  const router = useRouter()
  // useEffect(() => {
  //   if (pg === null) router.push("?pg=settings&tb=password")
  // }, [])

  return (
    <div className='flex flex-col w-full'>
      <div className="flex gap-x-2 items-center bg-black p-1 rounded">
        <Link
          href="?pg=settings&tb=password"
        >
          <h4 className={`font-bold rounded text-sm text-gray-200 ${pg === "password" && "bg-gray-500"} p-1 cursor-pointer`}>Password</h4>
        </Link>

      </div>
      <div className="flex w-full">
        <EditPassword />
      </div>
    </div>
  )
}

export default SettingsComponent