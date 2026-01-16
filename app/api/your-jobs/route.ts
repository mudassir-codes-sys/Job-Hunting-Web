import connectDB from "@/app/config/db";
import jobPostModel from "@/app/models/postJobModel";
import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-userId");
  try {
    await connectDB();
    const jobs = await jobPostModel.find({ userId });
    // console.log(jobs);
    if (!jobs) return sendResponse(false, "No jobs found", 400);
    else return NextResponse.json({ success: true, jobs }, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    return sendResponse(false, "Internal Server Error", 500);
  }
}
