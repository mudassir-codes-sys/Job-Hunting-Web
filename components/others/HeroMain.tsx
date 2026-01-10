"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShimmerButton } from "../ui/shimmer-button";
import DisplayCards from "../ui/display-cards";
import Lottie from "lottie-react";
import jobAnimation from "../../public/Job.json";
function HeroMain() {
  return (
    <main className="absolute md:mt-20 mt-16 text-white px-4 w-full flex md:flex-row flex-col">
      <div className="md:mt-14 mt-8 md:ml-20 flex flex-col justify-center md:items-start md:justify-start items-center  md:w-1/2 w-full ">
        {/* ------------------------------------------------label---------------------------------------------------- */}
        <div className="bg-[#4fc3f7] p-1 rounded max-w-87.5 inline-block">
          <span className="bg-[#142b33b3]/70 px-2 py-1 rounded-2xl font-semibold">
            CONNECT
          </span>
          <span className="p-2 text-black ">
            where opportunity meets talent
          </span>
        </div>
        {/* ----------------------------------------Heading & ParA---------------------------------------------------- */}
        <div className="flex flex-col ">
          <h1 className="pt-8 max-w-md lg:leading-14  lg:text-5xl md:text-2xl text-xl font-bold">
            Find the Right <span className="text-[#4fc3f7]"> Job.</span> Hire
            the Right <span className="text-[#4fc3f7]"> Talent.</span>
          </h1>
          <p className="max-w-sm py-3">
            Whether you’re hiring or looking for work, our platform connects
            people with opportunities that matter.
          </p>
        </div>

        {/* ----------------------------------------Buttons---------------------------------------------------- */}
        <div className="flex gap-3 pt-2 items-center z-10 relative">
          <Link href="#">
            <ShimmerButton className="hover:bg-[#82DFFF]">
              Find Job
            </ShimmerButton>
          </Link>
          <Link href="#">
            <Button className="bg-transparent border border-[#82DFFF] hover:bg-[#142b33b3]/70 cursor-pointer px-5 ">
              Post Job
            </Button>
          </Link>
        </div>
      </div>

      {/* -----------------------------------------Right------------------------------------------------ */}

      <div className="md:w-1/2 w-full md:mt-0 mt-8  pr-6 place-items-center flex gap-10  flex-col ">
        <DisplayCards />
        {/* <div className="relative md:mt-12 lg:w-120 lg:h-80 w-70 h-70"> */}
          <Lottie animationData={jobAnimation}  className="md:w-100 md:mt-6" />
        {/* </div> */}
      </div>
    </main>
  );
}

export default HeroMain;
