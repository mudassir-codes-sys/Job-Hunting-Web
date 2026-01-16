"use client";
import { job } from "@/app/slices/jobSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ApplyCard } from "./ApplyCard";

export interface applicantsProps {
  _id?: string;
  name: string;
  email: string;
  resume: string;
  coverLetter?: string;
}

const Applicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState<applicantsProps[]>([]);
  const [job, setJob] = useState<job | null>(null);
  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: id }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);
      if (!data.applicants) return;
      else {
        setApplicants(data.applicants);

        setJob(data.job);
      }
    };
    fetchApplicants();
  }, [id]);
  return (
    <>
      <div className="flex flex-col py-6 gap-2 items-start sm:items-center">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-white text-lg sm:text-xl font-semibold">
            Applicants on {job?.jobTitle ? `${job.jobTitle}!` : "this job!"}
          </h1>
          <span className="w-10 h-0.5 bg-white sm:block hidden"></span>
        </div>
        {applicants.length === 0 && (
          <p className="text-gray-300 text-sm">
            No applicants found on this post
          </p>
        )}
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 h-full lg:grid-cols-4 place-items-center w-full gap-4 items-stretch">
        {applicants.map((a) => (
          <div className="" key={a._id}>
            <ApplyCard
              name={a.name}
              email={a.email}
              resume={a.resume}
              coverLetter={a.coverLetter}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Applicants;
