import connectDB from "@/app/config/db";
import jobPostModel from "@/app/models/postJobModel";
import sendResponse from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {id} = await req.json();
  if (!id) return sendResponse(false, "Could'nt find job", 400);
  try {
    await connectDB();
    await jobPostModel.findByIdAndDelete(id);
    return sendResponse(true, "Job deleted", 200);
  } catch (error) {
    console.error((error as Error).message);
  }
}
