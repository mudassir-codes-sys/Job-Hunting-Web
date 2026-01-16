import connectDB from "@/app/config/db";
import jobPostModel from "@/app/models/postJobModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const jobs = await jobPostModel.find({});
    if (!jobs)
      return NextResponse.json(
        { success: false, message: "No jobs found" },
        { status: 400 }
      );
    return NextResponse.json({ success: true, jobs }, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
