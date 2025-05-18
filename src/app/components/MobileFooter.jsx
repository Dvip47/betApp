"use client";
import Link from "next/link";
import { Text } from "@mantine/core";
import React from "react";
import { eighteenPlus } from "../assets";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from "next/image";


export default function MobileFooter() {
  const styles = {
    footer_p: `cursor-pointer my-1 text-gray-400 shadow-lg shadow-gray-100/[0.1] h-full justify-center items-center flex tracking-wide text-[0.7rem] font-bold hover:text-gray-300`
  }
  return (
    <div className="relative flex items-center bg-[#031123] mt-5 rounded grid grid-cols-12 items-center px-3 pt-3 min-mk:pb-3 max-mk:pb-20 w-full">
      <div className="col-span-12  flex flex-col justify-center w-full items-center ">
        {/* logo */}
        <div className="">
          <Link href="/">
            <p className="text-1xl md:text-3xl font-bold">
              <span className="text-white">Aura-</span>
              <span className="text-orange-800 rounded p-1 bg-white">Bet</span>
            </p>
          </Link>
        </div>
      </div>

      <div className=" relative col-span-12 grid grid-cols-4 text-white items-center gap-x-20 text-[0.7rem] py-10 ">
        <Text
          color="dimmed"
          size="sm"
          className="col-span-2 text-[0.8rem] text-orange-500 text-center rounded uppercase font-bold"
        >
          Responsible Gaming
        </Text>

        <div className="flex items-center justify-center col-span-2">
          <div className="relative flex w-full items-center justify-center">
            <Image
              src={eighteenPlus}
              alt="alt"
              width={35}
              height={35}
              // className="h-[30px] w-[30px]"
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 flex flex-col gap-y-10">
        <div className="flex justify-around items-center ">
          <p className={`${styles.footer_p}`}>Contact Us</p>
          <p className={`${styles.footer_p}`}>Help Center</p>
          <p className={`${styles.footer_p}`}><Link href="#">Cookie Policiy</Link></p>
          <p className={`${styles.footer_p}`}>Terms & Conditions</p>
        </div>

        <div className="flex items-center ">
          <Text
            color="dimmed"
            size="sm"
            className="text-[0.7rem] text-center text-gray-400 font-bold"
          >
            AuraBet is a product which operates in accordance with the License granted by SVG Gambling Commission under the license <span className="underline lowercase cursor-pointer" onClick={() => alert("Please contact support for more details")}> Click</span>
          </Text>
        </div>


        <div className=" flex justify-center text-white items-center gap-2 text-[0.7rem] font-semibold ">
          <div className="flex just items-center">
            <Text color="dimmed" size="sm" className="text-[0.7rem] font-bold tracking-wide">
              © 2024 AuraBet. All rights reserved.
            </Text>
          </div>
          <div className=" shadow-lg shadow-green-500/[0.2] absolute bottom-2 right-0 mr-2 animate-bounce transition duration-4000 min-h-[5vh] cursor-pointer flex flex-col justify-between items-center">
            <WhatsAppIcon color="success" size="medium" className="text-green-500" />
            {/* <ArrowCircleUpTwoToneIcon color="warning" size="medium" className="" /> */}
            <p className="font-bold text-gray-400">Chat</p>
          </div>

        </div>
      </div>
    </div>
  );
}
