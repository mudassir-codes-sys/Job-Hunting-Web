import connectDB from "@/app/config/db";
import jobPostModel, { jobPost } from "@/app/models/postJobModel";
import { userModel } from "@/app/models/userModel";
import { jobFormValidation } from "@/lib/validations/postJobFormSchema";
import createBuffer from "@/utils/buffer";
import sendResponse from "@/utils/response";
import uploadToCloudinary from "@/utils/uploadToCloudinary";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-userId");
  if (!userId) return sendResponse(false, "No user found", 400);
  const formData = await req.formData();
  const requiredSkills = formData.getAll("requiredSkills");
  const companyLogo = (formData.get("companyLogo") as File) || null;
  const stringData = formData.get("data")?.toString();
  const data = stringData ? JSON.parse(stringData) : {};
  if (data.deadline) data.deadline = new Date(data.deadline);

  //   Data Parse
  try {
    jobFormValidation.parse({
      ...data,
      requiredSkills,
      companyLogo,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return sendResponse(false, error.issues[0].message, 400);
    } else return sendResponse(false, "An unexpected error occured", 500);
  }

  //   Find user
  await connectDB();
  const user = await userModel.findById(userId, { _id: 1, isPaid: 1 });
  if (!user) return sendResponse(false, "User not found", 400);

  // Upload picture to cloudinary

  const buffer = await createBuffer(companyLogo);

  const pictureUrl = await uploadToCloudinary(
    buffer,
    "Companies Logo",
    `${userId}_company_logo`,
    "image"
  );

  //   Save
  try {
    const postJob: jobPost = new jobPostModel({
      userId,
      companyName: data.companyName,
      companyLogo: pictureUrl,
      jobTitle: data.jobTitle,
      description: data.jobTitle,
      type: data.type,
      location: data.location,
      requiredSkills: requiredSkills,
      educationRequired: data.educationRequired,
      experienceRequired: data.experienceRequired,
      minExperienceRequired: data.minExperienceRequired,
      deadline: data.deadline,
      isPremium:
        data.isPremium === "Yes" && user.isPaid ? data.isPremium : "No",
    });
    await postJob.save();
    return sendResponse(true, "Job Posted", 200);
  } catch (error) {
    console.error((error as Error).message);
    return sendResponse(false, "Internal Server Error", 500);
  }
}
