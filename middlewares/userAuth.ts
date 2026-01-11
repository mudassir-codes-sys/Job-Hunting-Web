import sendResponse from "@/utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const userAuth = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return sendResponse(false, "Not authorized login to your account", 400);
  try {
    const decode = jwt.verify(token, process.env.JWT!) as JwtPayload;

    if (!decode) return sendResponse(false, "Not authorized", 400);
    const res = NextResponse.next();
    res.headers.set("x-userId", decode.id);

    return res;
  } catch (error) {
    console.error((error as Error).message);
  }
};
