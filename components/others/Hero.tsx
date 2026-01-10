import Image from "next/image";
import LogoGrid from "./LogoGrid";
import Navbar from "./Navbar";
import Example from "./MobileMenu";

function Hero() {
  return (
    <div className="w-full h-screen relative">
      <Image
        src="/bg.jpg"
        alt="bg"
        fill
        className="object-cover opacity-20 z-1"
      />
      <div className=" inset-0 fixed bg-linear-to-br  from-[#0f2027] via-[#203a43] to-[#2c5364]"></div>
      <header className="absolute inset-0 px-5 flex  items-center  justify-between bg-[#142b33b3]/70 w-full h-20  z-10  ">
        <LogoGrid />
        <Navbar />
        <div className="flex  sm:hidden  gap-5 items-center">
          <Example />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 64 64"
          >
            <circle cx="32" cy="32" r="32" fill="#4FC3F7" />

            <circle cx="32" cy="22" r="10" fill="white" />

            <path
              d="M16 52c0-8.837 7.163-16 16-16s16 7.163 16 16H16z"
              fill="white"
            />
          </svg>
        </div>
      </header>
    </div>
  );
}

export default Hero;
