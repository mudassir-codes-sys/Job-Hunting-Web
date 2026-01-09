import connectDB from "@/app/config/db";
import { userModel } from "@/app/models/userModel";
import generateToken from "@/utils/generateToken";
import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) return sendResponse(false, "Code missing", 400);

  try {
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID!,
          client_secret: process.env.GITHUB_CLIENT_SECRET!,
          code,
        }),
      }
    );

    const tokenData = await tokenRes.json();

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const githubUser = await userRes.json();
    await connectDB();

    let user = await userModel.findOne({ email: githubUser.email });

    if (!user) {
      user = new userModel({
        name: githubUser.name ?? "No name",
        email: githubUser.email,
        verifyCode: 12345,
        isVerified: true,
      });
      await user.save();
    }
    const token = generateToken(user._id.toString(), "user");

    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600 * 24 * 15, // 15 days
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error((error as Error).message);
    return sendResponse(false, "Internal Server Error", 500);
  }
}
