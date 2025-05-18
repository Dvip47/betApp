import React, { useEffect, useState } from 'react'
import { MessaeForm } from '../../components/MessageForm'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { EditPassword } from 'src/app/auth/EditPassword'
import ImageUploadForm from './settings/imgSelection'

const Settings = () => {
  const searchParams = useSearchParams()
  const pg = searchParams.get("tb")
  const router = useRouter()
  useEffect(() => {
    if (pg === null) router.push("?pg=settings&tb=messages&cpg=settings")
  }, [])

  return (
    <div className='flex flex-col w-full'>
      <div className="flex gap-x-2 items-center bg-black p-1 rounded">
        <Link
          href="?pg=settings&tb=messages&cpg=settings"
        >
          <h4 className={`font-bold rounded text-sm text-gray-200 ${pg === "messages" && "bg-gray-500"} p-1 cursor-pointer`}>Messages</h4>
        </Link>
        <Link
          href="?pg=settings&tb=password&cpg=settings"
        >
          <h4 className={`font-bold rounded text-sm text-gray-200 ${pg === "password" && "bg-gray-500"} p-1 cursor-pointer`}>Password</h4>
        </Link>
        <Link
          href="?pg=settings&tb=image&cpg=settings"
        >
          <h4 className={`font-bold rounded text-sm text-gray-200 ${pg === "image" && "bg-gray-500"} p-1 cursor-pointer`}>ScrollImages</h4>
        </Link>

      </div>
      <div className="flex w-full">
        {pg == "messages" && <MessaeForm />}
        {pg == "password" && <EditPassword />}
        {pg == "image" && <ImageUploadForm />}
      </div>
    </div>
  )
}

export default Settings