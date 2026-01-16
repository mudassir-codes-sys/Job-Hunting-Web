import connectDB from "@/app/config/db";
import applyJobModel from "@/app/models/applyJobModel";
import jobPostModel from "@/app/models/postJobModel";
import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-userId");
  const { jobId } = await req.json();
  if (!jobId) return sendResponse(false, "No job found", 403);
  try {
    await connectDB();
    const job = await jobPostModel.findOne({ _id: jobId, userId });
    if (!job)
      return sendResponse(false, "Not authorized or job not found", 404);
    const applicants = await applyJobModel.find({ jobId }).lean();
    if (applicants.length === 0)
      return sendResponse(true, "No applicants on this post found", 200);
    return NextResponse.json({ success: true, applicants , job }, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    return sendResponse(false, "Internal Server Error", 500);
  }
}
