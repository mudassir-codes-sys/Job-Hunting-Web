"use client";
import { job as JobType } from "@/app/slices/jobSlice";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { toast } from "sonner";

const YourJobCard = ({
  _id,
  companyName,
  companyLogo,
  jobTitle,
  description,
  type,
  location,
  requiredSkills,
  educationRequired,
  minExperienceRequired,
  deadline,
  isPremium,
  applied,
  createdAt,
}: JobType) => {
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleDelete = async () => {
    const id = toast.loading("Loading.....");
    try {
      const res = await fetch("/api/delete-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: _id }),
      });
      const data = await res.json();
      if (!res.ok)
        return toast.error(
          data.message ? data.message : "An unexpected error occurred",
          { id }
        );
      toast.success(data.message, { id });
      setModalOpen(false);
    } catch (error) {
      toast.error("Internal Server Error", { id });
      console.error(error);
    }
  };
  return (
    <motion.div
      initial={{ y: 100, opacity: 0.5 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.1,
        duration: 0.8,
        ease: "easeOut",
      }}
      key={_id}
      className="bg-[#172931] max-w-xs h-full p-3  rounded-md"
    >
      <div className="relative bg-[#22363D] rounded-xl h-full shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 max-w-xs ">
        {/* Premium Badge */}
        {isPremium === "Yes" && (
          <span className="absolute top-2 left-0 w-20 h-6 flex items-center justify-center pointer-events-none">
            <span className="absolute w-90 h-6 bg-[#4FC3F7] transform -rotate-25 flex items-center justify-center text-xs font-semibold text-black shadow-md">
              PREMIUM
            </span>
          </span>
        )}

        {/* Card Content */}
        <div className="flex flex-col h-full p-4 ">
          {/* Company logo + name aligned right */}
          <div className="flex justify-end items-center gap-2">
            <Image
              src={companyLogo}
              alt={companyName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-white underline underline-offset-3 decoration-[#4FC3F7] text-sm">
              {companyName}
            </p>
          </div>

          {/* Job Title */}
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg ">{jobTitle}</h3>
            <p className="text-xs text-gray-300">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
          <p
            onClick={() => setShow((prev) => !prev)}
            className="text-gray-300 text-[14px] cursor-pointer pb-2"
          >
            {!show ? (
              <>
                {description.slice(0, 60)}...
                <span className="text-[#4FC3F7] ml-1">Read more</span>
              </>
            ) : (
              <>
                {description}
                <span className="text-[#4FC3F7] ml-1">Read less</span>
              </>
            )}
          </p>

          <div className="flex items-center pb-3 gap-1">
            <FaLocationDot size="10" color="#D1D5DB" />
            <p className=" text-white text-xs">{location}</p>
          </div>

          {/* Job Type + Location */}
          <div className="flex gap-2 justify-between items-center text-xs font-medium pb-2 text-gray-300">
            <span className="px-2 py-1 bg-gray-800 rounded">{type}</span>
            <p>Applied: {applied}</p>
            {/* <span className="px-2 py-1 bg-gray-800 rounded">
                  
                </span> */}
          </div>

          {/* Required Skills */}
          <div className="flex flex-wrap gap-2 mt-2 mb-2 pb-2">
            {requiredSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#4FC3F7] px-2 py-1 rounded text-xs font-medium text-black"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Demands */}

          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <p className="text-gray-300">Education Required</p>
              <p className="text-white text-[14px]">{educationRequired}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-300">Minimum Experience</p>
              <p className="text-white text-[14px]">
                {minExperienceRequired === 0
                  ? "No Experience Required"
                  : `${minExperienceRequired} Years`}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-300">Deadline</p>
              <p className="text-white text-[14px]">
                {new Date(deadline).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-auto">
            <Link href={`/job/${_id}/applicants`}>
              <Button className="mt-3  w-full py-2 bg-[#4FC3F7] hover:bg-[#82dffd] cursor-pointer text-black/85 rounded transition-colors text-md font-semibold">
                View Applicants
              </Button>
            </Link>

            <Button
              onClick={() => setModalOpen(true)}
              className="mt-3  w-full py-2 cursor-pointer rounded transition-colors text-md font-semibold"
              variant="destructive"
            >
              Delete
            </Button>

            <ConfirmModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleDelete}
              message="Are you sure you want to delete this job?"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YourJobCard;
