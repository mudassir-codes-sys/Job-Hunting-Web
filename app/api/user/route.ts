import { userModel } from "@/app/models/userModel";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendResponse from "@/utils/response";
import connectDB from "@/app/config/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return sendResponse(false, "Could not fetch data", 400);

  let decode: JwtPayload;
  try {
    decode = jwt.verify(token, process.env.JWT!) as JwtPayload;
  } catch (err) {
    return sendResponse(false, "Invalid or expired token", 401);
  }

  try {
    await connectDB();
    const user = await userModel.findOne(
      { _id: decode.id },
      { _id: 0, email: 1, isPaid: 1 }
    );

    if (!user) return sendResponse(false, "User not found", 404);

    return sendResponse(true, user, 200);
  } catch (error) {
    console.error((error as Error).message);
    return sendResponse(false, "Internal Server Error", 500);
  }
}
