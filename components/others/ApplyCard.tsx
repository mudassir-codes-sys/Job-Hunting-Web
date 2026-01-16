import { Meteors } from "@/components/ui/meteors";
import { FaUserAlt } from "react-icons/fa";
import { applicantsProps } from "./Applicants";
import { Button } from "../ui/button";

export function ApplyCard({
  name,
  email,
  resume,
  coverLetter,
}: applicantsProps) {
  return (
    <div className=" w-full relative min-w-55 h-full max-w-xs p-2">
      <div className="absolute inset-0 h-full w-full bg-linear-to-r from-blue-500 to-teal-500 transform scale-[0.80] opacity-30 bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-[#172931] border border-gray-800  px-4 py-5 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <div className="h-5 w-5 rounded-full  flex items-center justify-center mb-2 ">
          <FaUserAlt color="white" />
        </div>

        <h1 className="font-semibold text-xl text-white mb-1     relative z-50">
          {name}
        </h1>

        <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          {email}
        </p>

        <div className="flex sm:flex-row flex-col mt-auto h-full items-center w-full gap-2">
          <a href={resume} target="_blank" className="w-full">
            <Button className="cursor-pointer w-full" variant="secondary">
              Resume
            </Button>
          </a>

          {coverLetter && (
            <>
              <a href={coverLetter} target="_blank" className="w-full">
                <Button className="cursor-pointer w-full">Cover Letter</Button>
              </a>
            </>
          )}
        </div>

        {/* Meaty part - Meteor effect */}
        <Meteors number={20} />
      </div>
    </div>
  );
}
