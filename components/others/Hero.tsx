import Image from "next/image";
import LogoGrid from "./LogoGrid";
import Navbar from "./Navbar";

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
      </header>
    </div>
  );
}

export default Hero;
