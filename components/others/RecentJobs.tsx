"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import JobCard from "./JobCard";
import { Button } from "../ui/button";
import { job as JobType } from "@/app/slices/jobSlice";
import Link from "next/link";
import { useMemo } from "react";

export default function RecentPostedJobs() {
  const allJobsFromStore: JobType[] = useSelector(
    (state: RootState) => state.allJobs.allJobs
  );
  const allJobs = useMemo(() => {
    return allJobsFromStore.slice(0, 4).reverse();
  }, [allJobsFromStore]);

  return (
    <>
      <div className="w-full flex justify-center items-center pb-10 pt-24 flex-col">
        <h1 className="text-2xl font-bold text-white pb-1">
          Recent Posted Jobs
        </h1>
        <h2 className=" text-gray-400 text-sm px-2">
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
        {allJobs.map((job) => (
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
