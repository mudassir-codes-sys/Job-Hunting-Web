import Image from "next/image";

import HeroMain from "./HeroMain";

function Hero() {
  return (
    <div className="w-full h-screen relative ">
      <Image src="/bg.jpg" alt="bg" fill className="object-cover opacity-30 " />
      <div className=" inset-0 absolute  -z-10  bg-linear-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"></div>
      <HeroMain />
    </div>
  );
}

export default Hero;
