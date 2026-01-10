"use client";
import Lottie from "lottie-react";
import loading from "../../public/Loading.json";
const LoaderWrapper = () => {
  return (
    <div className="flex justify-center bg-black items-center w-full h-screen">
      <Lottie animationData={loading} className="w-30" />;
    </div>
  );
};

export default LoaderWrapper;
