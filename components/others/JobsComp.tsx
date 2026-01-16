"use client";
import { RootState } from "@/app/store/store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/app/slices/jobSlice";
import JobCard from "./JobCard";

const JobsComp = () => {
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState("All");
  const allJobs = useSelector((state: RootState) => state.allJobs.allJobs);
  let showJobs;
  if (filterJobs === "Remote")
    showJobs = allJobs.filter((job) => job.location === "Remote");
  else showJobs = allJobs;
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
  return (
    <div className="mt-20 bg-[#22363D] min-h-screen w-full max-h-auto">
      <div className="flex flex-col justify-center py-10 gap-2 items-center w-full">
        <div className="flex justify-center items-center gap-1">
          <h1 className=" text-3xl  text-white font-semibold">JOBS</h1>
          <span className="w-12 h-0.5 bg-white"></span>
        </div>
        {showJobs.length === 0 && (
          <p className="text-gray-300 text-sm">No jobs found</p>
        )}
      </div>
      <div className="flex justify-end  px-10 mb-10">
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterJobs(e.target.value)
          }
          className="outline-none flex items-center  bg-white text-black text-sm px-3 py-1 rounded-md shadow-md hover:bg-gray-100 focus:ring-1 focus:ring-[#4FC3F7] transition-all duration-200"
          name="category"
          id="category"
        >
          <option value="All">All</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 ">
        {showJobs.length > 0 &&
          showJobs.map((job) => (
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
    </div>
  );
};

export default JobsComp;
