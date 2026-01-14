"use client";
import { useParams } from "next/navigation";
import { labelClass, inputClass } from "./PostJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import LiquidChrome from "../ui/liquidbg";
import { applyJobValidation } from "@/lib/validations/applyJob";
import z, { ZodError } from "zod";
import { setLoading } from "@/app/slices/loadingSlice";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const ApplyJob = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const resumeRef = useRef<HTMLInputElement | null>(null);
  const coverLetterRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<z.infer<typeof applyJobValidation>>({
    name: "",
    email: "",
    resume: null,
    coverLetter: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { id, value, files } = e.target;
    if (files) setForm((prev) => ({ ...prev, [id]: files[0] }));
    else setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Applying....");
    try {
      applyJobValidation.parse({
        name: form.name,
        email: form.email,
        resume: form.resume,
        coverLetter: form.coverLetter,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message, { id: toastId });
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("jobId", id);
    if (form.resume) formData.append("resume", form.resume);
    if (form.coverLetter) formData.append("coverLetter", form.coverLetter);

    try {
      dispatch(setLoading({ loading: true }));
      const res = await fetch("/api/apply-job", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) toast.error(data.message, { id: toastId });
      else {
        toast.success(data.message, { id: toastId });
        setForm((prev) => ({ ...prev, name: "", email: "" }));
        if (resumeRef.current) resumeRef.current.value = "";
        if (coverLetterRef.current) coverLetterRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading({ loading: false }));
    }
  };

  return (
    <>
      <div className="w-full flex relative h-139 justify-center  items-center">
        <div
          className="absolute inset-0 z-1 h-full opacity-3 "
          style={{ width: "100%" }}
        >
          <LiquidChrome
            baseColor={[0.0, 0.1, 0.1]}
            speed={0.1}
            amplitude={0.5}
            interactive={true}
          />
        </div>
        <div className=" flex bg-[#243C42] rounded-lg z-5 backdrop-blur-3xl justify-center items-center p-6">
          <Card className="w-full bg-white/90 backdrop-blur-lg h-auto  relative  shadow-lg  rounded-xl border border-gray-200">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <CardHeader className="w-full">
              <CardTitle className="lg:text-2xl md:text-xl text-lg font-bold">
                Job Application Form{" "}
              </CardTitle>
              <CardDescription>
                Complete the form below to apply for this job.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full max-w-4xl mx-auto">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col cols-2 gap-3  w-full"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    id="name"
                    placeholder="Name"
                    value={form.name}
                    type="text"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    id="email"
                    placeholder="Email"
                    value={form.email}
                    type="email"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="resume" className={labelClass}>
                    Resume
                  </label>
                  <input
                    ref={resumeRef}
                    onChange={handleChange}
                    id="resume"
                    type="file"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="coverLetter" className={labelClass}>
                    Cover Letter (optional)
                  </label>
                  <input
                    ref={coverLetterRef}
                    onChange={handleChange}
                    id="coverLetter"
                    type="file"
                    className={inputClass}
                  />
                </div>

                <div className="flex justify-center col-span-2 mt-6">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="px-10 text-lg z-5 cursor-pointer"
                  >
                    {loading ? "Applying" : "Apply"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ApplyJob;
