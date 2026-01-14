import jobPostModel from "@/app/models/postJobModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const jobs = await jobPostModel.find({});
    return NextResponse.json({ success: true, jobs }, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
