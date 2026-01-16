"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { setAllJobs } from "@/app/slices/jobSlice";
import JobCard from "./JobCard";
import { Button } from "../ui/button";
import { job as JobType } from "@/app/slices/jobSlice";
import Link from "next/link";

export default function PremiumJobs() {
  const dispatch = useDispatch();
  const allJobs: JobType[] = useSelector(
    (state: RootState) => state.allJobs.allJobs
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/getjobs", { method: "GET" });
        const data = await res.json();
        if (res.ok) dispatch(setAllJobs(data.jobs));
        else console.log(data.message || "Something went wrong");
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
    fetchJobs();
  }, [dispatch]);
  const premiumJobs = allJobs
    .filter((job) => job.isPremium === "Yes")
    .reverse()
    .slice(0, 4);
  return (
    <>
      <div className="w-full flex justify-center items-center pb-10 pt-24 flex-col">
        <h1 className="text-2xl font-bold text-white pb-1">Premium Posts</h1>
        <h2 className=" text-gray-400 px-2 text-sm">
          Explore Featured Premium Jobs – Handpicked for You
        </h2>
      </div>
      <div className="flex w-full justify-end px-16  pb-4">
        <Link href="/jobs">
          {" "}
          <Button className="cursor-pointer" variant="outline">
            View All
          </Button>{" "}
        </Link>
      </div>

      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 ">
        {premiumJobs.map((job) => (
          <JobCard
            _id={job._id}
            companyName={job.companyName}
            companyLogo={job.companyLogo}
            applied={job.applied}
            createdAt={job.createdAt}
            deadline={job.deadline}
            description={job.description}
            educationRequired={job.educationRequired}
            experienceRequired={job.experienceRequired}
            isPremium={job.isPremium}
            jobTitle={job.jobTitle}
            location={job.location}
            requiredSkills={job.requiredSkills}
            type={job.type}
            userId={job.userId}
            key={job._id}
            minExperienceRequired={job.minExperienceRequired}
          />
        ))}
      </div>
    </>
  );
}
