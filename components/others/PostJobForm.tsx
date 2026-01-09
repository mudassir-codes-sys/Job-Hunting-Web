"use client";
import { z } from "zod";
import { jobFormValidation } from "@/lib/validations/postJobFormSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

const labelClass =
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ";

const inputClass =
  "text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]   aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

function PostJobForm() {
  const [form, setForm] = useState<z.infer<typeof jobFormValidation>>({
    companyName: "",
    companyLogo: null,
    jobTitle: "",
    description: "",
    location: "",
    type: "Full Time",
    experienceRequired: "No",
    yearsOfExperienceRequired: 0,
    educationRequired: "",
    requiredSkills: [],
    link: "",
    deadline: new Date(),
    coverLetter: "Yes",
    resume: "Yes",
  });
  return (
    <Card className="w-full  max-w-lg border-2">
      <CardHeader className="w-full">
        <CardTitle className="text-xl font-bold">Post New Job</CardTitle>
        <CardDescription>Post new job ot get Applicants</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3 ">
          <div className="flex  flex-col  gap-2">
            <label htmlFor="companyName" className={labelClass}>
              Company Name
            </label>
            <input
              id="companyName"
              placeholder="Company Name"
              value={form.companyName}
              type="text"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="companyLogo" className={labelClass}>
              Company Logo
            </label>
            <input id="companyLogo" type="file" className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jobTitle" className={labelClass}>
              Job Title
            </label>
            <input
              id="jobTitle"
              placeholder="Job Title"
              value={form.jobTitle}
              type="text"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className={labelClass}>
              Job Description
            </label>
            <input
              id="description"
              placeholder="Job Description"
              value={form.description}
              type="text"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              placeholder="Location"
              value={form.location}
              type="text"
              className={inputClass}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="type" className={labelClass}>
              Job Type
            </label>
            <select
              className={` ${inputClass}`}
              value={form.type}
              name="type"
              id="type"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="experienceRequired" className={labelClass}>
              Experience Required
            </label>
            <select
              className={` ${inputClass}`}
              value={form.experienceRequired}
              name="type"
              id="experienceRequired"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="yearsOfExperienceRequired">
              Min experience required in years (optional)
            </label>
            <input
              type="number"
              value={form.yearsOfExperienceRequired}
              id="yearsOfExperienceRequired"
              className={` ${inputClass} `}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              placeholder="Location"
              value={form.location}
              type="text"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="educationRequired" className={labelClass}>
              Education Required
            </label>
            <input
              id="educationRequired"
              placeholder="Education Required e.g.BS in ..."
              value={form.educationRequired}
              type="text"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="requiredSkills" className={labelClass}>
              Required Skills
            </label>
            <input
              id="requiredSkills"
              placeholder="Press enter or comma , to add "
              value={form.requiredSkills}
              type="text"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="link" className={labelClass}>
              Link
            </label>
            <input
              id="link"
              placeholder="Link"
              value={form.link}
              type="text"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="deadline" className={labelClass}>
              DeadLine
            </label>
            <input id="deadline" type="Date" className={inputClass} />
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="experienceRequired" className={labelClass}>
              Resume required
            </label>
            <select
              className={` ${inputClass}`}
              value={form.resume}
              name="resume"
              id="resume"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="experienceRequired" className={labelClass}>
              Cover letter required
            </label>
            <select
              className={` ${inputClass}`}
              value={form.coverLetter}
              name="coverLetterF"
              id="coverLetterF"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <Button>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PostJobForm;
