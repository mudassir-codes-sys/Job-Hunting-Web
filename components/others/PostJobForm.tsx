"use client";
import { z, ZodError } from "zod";
import post from "../../public/Postjob.json";
import { jobFormValidation } from "@/lib/validations/postJobFormSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import Lottie from "lottie-react";
import LiquidChrome from "../ui/liquidbg";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import customToast from "./CustomToast";
import { setLoading } from "@/app/slices/loadingSlice";

export const labelClass =
  "flex items-center gap-2 text-sm  leading-none font-semibold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 max-w-xs text-gray-700 z-10 ";

export const inputClass =
  "text-foreground placeholder:text-gray-600 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 font-semibold border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  focus:ring-1 focus:ring-gray-400 :ring-offset-1 focus:ring-offset-gray-100 lg:max-w-sm w-full shadow-xs shadow-[#1D353F] z-10";

function PostJobForm() {
  const [skills, setSkills] = useState("");
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const isUserPaid = useSelector((state: RootState) => state.user.isPaid);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const logoRef = useRef<HTMLInputElement | null>(null);
  const dateRef  = useRef<HTMLInputElement | null>(null);
  const handleSkillsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = skills.trim();
      if (!value) return;
      if (skillsList.includes(value)) {
        toast.error("Already included");
      } else {
        setSkillsList((prev) => [...prev, value]);
        setSkills("");
      }
    }
  };

  const removeSkill = (id: number): void => {
    setSkillsList((prev) =>
       prev.filter((_, i) => i !== id));
  };

  const initialState: z.infer<typeof jobFormValidation> = {
    companyName: "",
    companyLogo: null,
    jobTitle: "",
    description: "",
    location: "",
    type: "Full Time",
    experienceRequired: "No",
    minExperienceRequired: 0,
    educationRequired: "",
    requiredSkills: [],
    deadline: new Date(),
    isPremium: "No",
  };
  const [form, setForm] =
    useState<z.infer<typeof jobFormValidation>>(initialState);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      if (target.type === "file" && target.files) {
        setForm((prev) => ({ ...prev, [target.id]: target.files?.[0] }));
      } else if (target.type === "checkbox") {
        setForm((prev) => ({ ...prev, [target.id]: target.checked }));
      } else if (target.type === "number") {
        setForm((prev) => ({
          ...prev,
          [target.id]: target.value ? Number(target.value) : 0,
        }));
      } else if (target.type === "date") {
        setForm((prev) => ({
          ...prev,
          [target.id]: target.value ? new Date(target.value) : new Date(),
        }));
      } else {
        setForm((prev) => ({ ...prev, [target.id]: target.value }));
      }
    } else if (target instanceof HTMLSelectElement) {
      setForm((prev) => ({ ...prev, [target.id]: target.value }));
    } else if (target instanceof HTMLTextAreaElement) {
      setForm((prev) => ({ ...prev, [target.id]: target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading({ loading: true }));
    const id = toast.loading("Posting.....");
    try {
      const formData = new FormData();
      const { companyLogo, ...rest } = form;
      if (!companyLogo) return toast.error("Company logo is required", { id });
      try {
        jobFormValidation.parse({
          companyLogo,
          ...rest,
          requiredSkills: skillsList,
        });
      } catch (error) {
        if (error instanceof ZodError) {
          console.error(error.issues[0].message);

          toast.error(error.issues[0].message, { id });
        }
      }
      formData.append("data", JSON.stringify(form));
      formData.append("companyLogo", companyLogo);
      skillsList.forEach((skill) => formData.append("requiredSkills", skill));

      const res = await fetch("/api/post-job", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.message, { id });
      else {
        toast.success(data.message, { id });
        setForm(initialState);
        setSkillsList([]);
        setSkills("");
        if (logoRef.current) logoRef.current.value = "";
        if(dateRef.current) dateRef.current.value=''
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error", { id });
    } finally {
      dispatch(setLoading({ loading: false }));
    }
  };

  return (
    <div className="w-full flex md:flex-row md:gap-0 gap-4 flex-col h-auto justify-between p-5">
      <Card className="md:w-1/2 w-full bg-white/90 backdrop-blur-lg h-auto  relative  shadow-lg  rounded-xl border border-gray-200">
        {/* <div
          className="inset-0 opacity-8 z-0"
          style={{ width: "100%", height: "600px", position: "absolute" }}
        >
          <Galaxy />
        </div> */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-bold">Post New Job</CardTitle>
          <CardDescription>Post new job to get Applicants</CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-8 gap-x-14 gap-y-5  w-full"
          >
            {/* Company Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="companyName" className={labelClass}>
                Company Name
              </label>
              <input
                onChange={handleChange}
                id="companyName"
                placeholder="Company Name"
                value={form.companyName}
                type="text"
                className={inputClass}
              />
            </div>

            {/* Company Logo */}
            <div className="flex flex-col gap-2">
              <label htmlFor="companyLogo" className={labelClass}>
                Company Logo
              </label>
              <input
                ref={logoRef}
                onChange={handleChange}
                id="companyLogo"
                type="file"
                className={inputClass}
              />
            </div>

            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="jobTitle" className={labelClass}>
                Job Title
              </label>
              <input
                onChange={handleChange}
                id="jobTitle"
                placeholder="Job Title"
                value={form.jobTitle}
                type="text"
                className={inputClass}
              />
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className={labelClass}>
                Job Description
              </label>
              <textarea
                onChange={handleChange}
                id="description"
                placeholder="Job Description"
                value={form.description}
                className={`${inputClass}`}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <input
                onChange={handleChange}
                id="location"
                placeholder="Location"
                value={form.location}
                type="text"
                className={inputClass}
              />
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className={labelClass}>
                Job Type
              </label>
              <select
                onChange={handleChange}
                className={inputClass}
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

            {/* Experience Required */}
            <div className="flex gap-2 flex-col">
              <label htmlFor="experienceRequired" className={labelClass}>
                Experience Required
              </label>
              <select
                onChange={handleChange}
                className={` ${inputClass}`}
                name="experienceRequired"
                id="experienceRequired"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Min Experience */}
            <div className="flex flex-col gap-2">
              <label htmlFor="minExperienceRequired" className={labelClass}>
                Min experience required in years (optional)
              </label>
              <input
                onChange={handleChange}
                type="number"
                value={form.minExperienceRequired}
                id="minExperienceRequired"
                className={inputClass}
              />
            </div>

            {/* Education Required */}
            <div className="flex flex-col black max-h-16 gap-2">
              <label htmlFor="educationRequired" className={labelClass}>
                Education Required
              </label>
              <input
                onChange={handleChange}
                id="educationRequired"
                placeholder="Education Required e.g. BS in ..."
                value={form.educationRequired}
                type="text"
                className={inputClass}
              />
            </div>

            {/* Required Skills */}
            <div className="flex flex-col gap-2">
              <label htmlFor="requiredSkills" className={labelClass}>
                Required Skills
              </label>

              <div id="requiredSkills" className=" flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-[#898a8d] text-black z-5 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {skill}
                    <span
                      className="cursor-pointer text-white font-bold"
                      onClick={() => removeSkill(i)}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                <input
                  onKeyDown={handleSkillsKeyDown}
                  id="skills"
                  placeholder="Press enter or comma , to add"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  type="text"
                  className={inputClass}
                />
              </div>
              {/* Skills Bullets */}
            </div>

            {/* Deadline */}
            <div className="flex flex-col gap-2">
              <label htmlFor="deadline" className={labelClass}>
                Deadline
              </label>
              <input
                onChange={handleChange}
                id="deadline"
                type="date"
                ref={dateRef}
                className={`${inputClass} flex-1 min-w-30 outline-none bg-transparent `}
              />
            </div>

            {/* ------------------------Premium Post------------------------  */}
            <div className="flex gap-2 flex-col">
              <label htmlFor="isPremium" className={labelClass}>
                Premium Post (paid)
              </label>
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value;
                  if (value === "Yes" && !isUserPaid) {
                    customToast();
                    setForm((prev) => ({ ...prev, isPremium: "No" }));
                  } else {
                    setForm((prev) => ({ ...prev, isPremium: "Yes" }));
                  }
                }}
                className={` ${inputClass}`}
                name="isPremium"
                id="isPremium"
                value={form.isPremium}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="flex justify-center col-span-2 mt-6">
              <Button
                type="submit"
                disabled={loading}
                className="px-10 text-lg z-5 cursor-pointer"
              >
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="sm:w-1/2 relative flex justify-center  items-center">
        <div
          className="absolute inset-0 z-1 opacity-5 "
          style={{ width: "100%" }}
        >
          <LiquidChrome
            baseColor={[0.0, 0.1, 0.1]}
            speed={0.1}
            amplitude={0.5}
            interactive={true}
          />
        </div>
        <Lottie className="lg:max-w-sm max-w-70 " animationData={post} />
      </div>
    </div>
  );
}

export default PostJobForm;
