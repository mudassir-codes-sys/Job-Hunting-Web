"use client";
import { job } from "@/app/slices/jobSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import YourJobCard from "./YourJobCard";

const YourJobs = () => {
  const [yourJobs, setYourJobs] = useState<job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/your-jobs", { method: "GET" });
      const data = await res.json();
      console.log(data);

      if (data.jobs) return setYourJobs(data.jobs);
      if (!data.jobs) return;
    };
    fetchJobs();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col items-center text-white pt-10">
        <h1 className="text-center  w-full text-2xl font-semibold ">
          Your Jobs
        </h1>
        {yourJobs.length === 0 && (
          <p className="text-gray-400">You have posted no jobs yet.</p>
        )}
      </div>
      <div className="pt-3 w-full flex  justify-end px-10">
        <Link href="/post-job">
          <Button className="cursor-pointer px-6" variant="secondary">
            Post Job
          </Button>
        </Link>
      </div>
      {yourJobs.length > 0 && (
        <>
          <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4 mt-10 gap-6 p-4 ">
            {yourJobs.map((job) => (
              <YourJobCard
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
      )}
    </>
  );
};

export default YourJobs;
