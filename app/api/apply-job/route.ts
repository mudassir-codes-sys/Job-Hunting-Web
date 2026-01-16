import connectDB from "@/app/config/db";
import applyJobModel from "@/app/models/applyJobModel";
import jobPostModel from "@/app/models/postJobModel";
import { applyJobValidation } from "@/lib/validations/applyJob";
import createBuffer from "@/utils/buffer";
import sendResponse from "@/utils/response";
import uploadToCloudinary from "@/utils/uploadToCloudinary";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-userId");
  if (!userId) return sendResponse(false, "User not found", 400);
  const formData = await req.formData();
  if (!formData) return sendResponse(false, "No data received", 400);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const jobId = formData.get("jobId") as string;
  const resume = formData.get("resume") as File | null;
  const coverLetter = formData.get("coverLetter") as File | null;

  try {
    applyJobValidation.parse({ name, email, resume, coverLetter });
  } catch (error) {
    if (error instanceof ZodError)
      return sendResponse(false, error.issues[0].message, 400);
    else return sendResponse(false, "An unexpected error occurred", 500);
  }

  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (resume && !allowedImageTypes.includes(resume.type)) {
    return sendResponse(
      false,
      "Resume must be an image (jpg, jpeg, png, webp)",
      400
    );
  }

  if (coverLetter && !allowedImageTypes.includes(coverLetter.type)) {
    return sendResponse(
      false,
      "Cover Letter must be an image (jpg, jpeg, png, webp)",
      400
    );
  }
  try {
    await connectDB();

    const job = await jobPostModel.findById(jobId);
    if (!job)
      return sendResponse(false, "No job with this criteria found", 400);

    const resumeBuffer = await createBuffer(resume!);

    const resumeUrl = await uploadToCloudinary(
      resumeBuffer,
      "Resume",
      `${name}_resume_${Date.now()}`,
      "auto"
    );

    let coverLetterUrl;

    if (coverLetter) {
      const coverLetterBuffer = await createBuffer(coverLetter);
      coverLetterUrl = await uploadToCloudinary(
        coverLetterBuffer,
        "cover_letter",
        `${name}_cover_letter_${Date.now()}`,
        "auto"
      );
    }

    const apply = new applyJobModel({
      userId,
      jobId,
      name,
      email,
      resume: resumeUrl,
      coverLetter: coverLetterUrl,
    });

    await apply.save();

    job.applied += 1;
    await job.save();

    return sendResponse(true, "Applied Successfully", 200);
  } catch (error) {
    console.error((error as Error).message);
    return sendResponse(true, "Internal Server Error", 500);
  }
}
