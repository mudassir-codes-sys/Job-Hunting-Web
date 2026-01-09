import connectDB from "@/app/config/db";
import { User, userModel } from "@/app/models/userModel";
import generateToken from "@/utils/generateToken";
import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code, email } = await req.json();

  if (!code || !email) return sendResponse(false, "Something went wrong", 400);

  // Find User

  try {
    await connectDB();
    const user: User | null = await userModel.findOne({ email });
    if (!user) return sendResponse(false, "User not found", 400);

    // Is already verified
    if (user.isVerified)
      return sendResponse(false, "User already verified", 400);

    // code check and expiry check

    if (user.expiryDate!.getTime() < Date.now()) {
      return sendResponse(false, "Otp expired", 400);
    }

    //   Code Match

    if (user.verifyCode.toString() !== code)
      return sendResponse(false, "Invalid otp", 400);

    //   generate token

    const token = generateToken(user._id.toString(), user.role);

    user.isVerified = true;
    await user.save();

    const res = NextResponse.json(
      {
        success: true,
        message: "Verified successfully",
        redirectUrl: "/",
      },

      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600 * 24 * 15,
      secure: true,
      path: "/",
    });
    return res;
  } catch (error: unknown) {
    console.error((error as Error).message);
    return sendResponse(false, "Internal Server Error", 500);
  }
}
