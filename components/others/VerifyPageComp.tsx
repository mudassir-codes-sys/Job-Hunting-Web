"use client";
import LetterGlitch from "@/components/ui/letterglitch";
import { useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/app/context/app-context";
import { toast } from "sonner";
import maskEmail from "@/utils/maskEmail";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const { loading, setLoading } = useGlobalContext();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only single digit
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input if exists
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]!.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Backspace only when current box is empty, move focus back
    if (e.key === "Backspace") {
      if (otp[index]) {
        // If current box has value, just clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && inputRefs.current[index - 1]) {
        // If current box empty, move focus to previous box
        inputRefs.current[index - 1]!.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = ""; // optional: clear previous input
        setOtp(newOtp);
      }
      e.preventDefault(); // prevent default to avoid buggy behavior
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d+$/.test(paste)) {
      const newOtp = paste.split("");
      setOtp(newOtp.concat(Array(6 - newOtp.length).fill("")));
      const lastIndex = newOtp.length - 1;
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex]!.focus();
      }
    }
    e.preventDefault();
  };
  const handleVerify = async (email: string, code: string): Promise<void> => {
    setLoading(true);
    const id = toast.loading("Loading....");
    try {
      const res = await fetch("api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message, { id });
      } else {
        console.log(data);

        toast.success(data.message, { id });
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error((error as Error).message);

      toast.error("Internal Server Error", { id });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%$^@&@!*#%*%*^$($($"
      />
      <div className="absolute inset-0 bg-black opacity-85"></div>

      <div className="absolute left-1/2 top-1/2 bg-gray-800 rounded p-14 justify-center -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <h1 className="text-white text-2xl font-bold">Verify your account</h1>
        <p className="text-white">
          We have sent an email to {maskEmail(email)}
        </p>

        <div className="flex gap-2 mt-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => void (inputRefs.current[i] = el)}
              className="w-12 h-12 text-center text-white font-bold rounded border focus:outline-none"
            />
          ))}
        </div>
        <Button
          onClick={() => {
            if (otp.some((d) => d === ""))
              return toast.error("Please fill all OTP digits");
            handleVerify(email, otp.join(""));
          }}
          disabled={loading}
          variant={"outline"}
          className="mt-2 px-5 cursor-pointer"
        >
          {loading ? "Verifying" : "Verify"}
        </Button>
      </div>
    </div>
  );
}
