"use client";
import { FaGithub } from "react-icons/fa";
import LightRays from "../../components/ui/loginBg";
import Lottie from "lottie-react";
import lottie from "@/public/Robot assistant  Online manager.json";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import GoogleLoginComponent from "./GoogleLoginComponent";

function LoginComponent() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading("Loading.....");
    try {
      const payload: {
        name?: string;
        email: string;
        password: string;
        type: "signup" | "login";
      } = {
        email: data.email,
        password: data.password,
        type: signUp ? "signup" : "login",
      };
      if (signUp) payload.name = data.name;

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message, { id });
      } else {
        toast.success(result.message, { id });
        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      console.error((error as Error).message);
      toast.error("Internal Server Error", { id });
    }
  };

  return (
    <div className="w-full h-screen relative ">
      <div className="bg-black fixed inset-0 opacity-90"></div>
      <LightRays
        raysOrigin="top-center"
        raysColor="white"
        raysSpeed={1.2}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <div className="w-64 h-64 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Lottie animationData={lottie} loop={true} autoPlay={true} />
      </div>

      <div className=" flex justify-center items-center w-full h-screen fixed z-10 inset-0 p-4">
        <div className="  bg-black/50 rounded-xl text-white px-3 py-5  w-md h-auto ">
          <form
            onSubmit={handleSubmit}
            className="flex space-y-4 justify-center items-center  flex-col w-full max-w-96 mx-auto px-10  "
          >
            <div className="flex flex-col justify-center items-center ">
              <h1 className="text-2xl font-semibold ">
                {signUp ? "Sign Up" : "Login"}
              </h1>
              <p className="mt-1 text-sm">
                {signUp ? "Create" : "Login"} your account to get started
              </p>
            </div>
            {signUp && (
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  onChange={handleChange}
                  className=" border border-white/30 bg-white/5 backdrop-blur-xs px-2 py-1  rounded-3xl  outline-none p"
                  type="text"
                  placeholder="Name"
                />
              </div>
            )}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                onChange={handleChange}
                className=" border border-white/30 bg-white/5 backdrop-blur-xs px-2 py-1  rounded-3xl  outline-none"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                className=" border border-white/30 bg-white/5 backdrop-blur-xs px-2 py-1  rounded-3xl  outline-none "
                type="password"
                id="password"
                placeholder="Password"
              />
              <GoogleLoginComponent />
              <Button
                className="bg-black relative  text-white px-6 py-2 rounded flex items-center  gap-2 hover:bg-gray-950/50 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://github.com/login/oauth/authorize" +
                    "?client_id=" +
                    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID +
                    "&scope=user:email";
                }}
              >
                <FaGithub className="absolute left-4  " />
                Login with GitHub
              </Button>
              <p className="text-sm mt-2">
                {signUp
                  ? "Already have an account?"
                  : "Don't  have an account?"}{" "}
                <span
                  onClick={() => setSignUp(!signUp)}
                  className="text-blue-300 cursor-pointer border-b border-transparent  hover:border-blue-600 transition-colors duration-200"
                >
                  {" "}
                  {signUp ? "Login" : "Signup"}
                </span>
              </p>
            </div>
            <Button
              type="submit"
              variant={"secondary"}
              className="cursor-pointer w-25 text-md"
            >
              {signUp ? "Sign up" : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
