"use client";
import Link from "next/link";
import { Text } from "@mantine/core";
import React from "react";
import { eighteenPlus } from "../assets";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from "next/image";


export default function Footer() {
  const styles = {
    footer_p: `cursor-pointer my-1 text-gray-400 uppercase tracking-wide text-[0.8rem] font-bold hover:text-gray-300`
  }
  return (
    <div className="relative flex items-center bg-[#031123] min-h-[30vh]  rounded grid grid-cols-12 items-center">
      <div className="footer-gradient z-0 absolute"></div>
      <div className="col-span-4 z-10 flex flex-col justify-center items-center ">
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

      <div className="col-span-8 flex flex-col  justify-center h-full">
        <div className="flex items-center w-full md:gap-x-10">

          <p className={`${styles.footer_p}`}>Contact Us</p>
          <p className={`${styles.footer_p}`}>Help Center</p>
          <p className={`${styles.footer_p}`}>Responsible Gambling</p>
          <p className={`${styles.footer_p}`}><Link href="#">Cookie Policiy</Link></p>
          <p className={`${styles.footer_p}`}>Terms & Conditions</p>
        </div>



        <div className="flex text-white items-center gap-x-20 text-[0.7rem] py-20 font-semibold ">

          <div className="flex items-center">
            <Text
              color="dimmed"
              size="sm"
              className="text-[0.8rem] text-orange-500 text-center rounded uppercase font-bold"
            >
              Responsible Gaming
            </Text>
          </div>

          {/* 18+ */}
          <div className="flex items-center">
            <Image
              src={eighteenPlus}
              width="50"
              height="50"
              // className="h-[50px] w-[50px]"
              alt="alt"
            />
          </div>

          <div className="flex items-center">
            <Text
              color="dimmed"
              size="sm"
              className="text-[0.7rem] text-gray-400 uppercase font-bold"
            >
              AuraBet is a product which operates in accordance with the License granted by SVG Gambling Commission under the license <span className="underline lowercase cursor-pointer" onClick={() => alert("Please contact support for more details")}> Click</span>
            </Text>
          </div>


        </div>


        <div className="flex justify-between text-white items-center gap-2 text-[0.7rem] font-semibold ">
          <div className="flex justify-between items-center">
            <Text color="dimmed" size="sm" className="uppercase text-[0.7rem] font-bold tracking-wide">
              © 2024 AuraBet. All rights reserved.
            </Text>
          </div>
          <div className="border border-gray-500 rounded p-2 absolute bottom-0 right-0 mr-2 animate-bounce transition duration-4000 min-h-[5vh] cursor-pointer flex flex-col justify-between items-center">
            <WhatsAppIcon color="success" size="medium" className="" />
            {/* <ArrowCircleUpTwoToneIcon color="warning" size="medium" className="" /> */}
            <p className="font-bold text-gray-400">Chat</p>
          </div>

        </div>
      </div>
    </div>
  );
}
