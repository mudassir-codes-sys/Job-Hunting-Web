import sendResponse from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import uploadToCloudinary from "@/utils/uploadToCloudinary";
import { userModel } from "@/app/models/userModel";
import generateToken from "@/utils/generateToken";
import connectDB from "@/app/config/db";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function POST(req: NextRequest) {
  const { token } = (await req.json()) as { token?: string };

  if (!token) return sendResponse(false, "Not authorized", 400);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return sendResponse(false, "Invalid token", 400);
    }

    //  User exist???
    const email: string = payload.email;

    // connect DB
    await connectDB();

    let user = await userModel.findOne({ email });

    if (!user) {
      const name: string | undefined = payload.name;
      const picture: string | undefined = payload.picture;

      let pictureUrl: string | undefined = undefined;

      if (picture) {
        const res = await fetch(picture);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const upload = await uploadToCloudinary(
          buffer,
          `User's pictures`,
          "name_pic",
          "image"
        );
        pictureUrl = upload as string;
      }

      user = new userModel({
        name: name ?? "No name",
        email,
        profilePicture: pictureUrl ? pictureUrl : null,
        verifyCode: 12345,
        isVerified: true,
      });
      await user.save();
    }
    const cookie = generateToken(user._id.toString(), "user");
    const res = NextResponse.json(
      { success: true, message: "Login Successful", redirectUrl: "/" },
      { status: 201 }
    );
    res.cookies.set("token", cookie, {
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
