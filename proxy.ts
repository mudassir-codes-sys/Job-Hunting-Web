import { NextRequest, NextResponse } from "next/server";
import tokenAuth from "./middlewares/tokenAuth";
import { userAuth } from "./middlewares/userAuth";

export const proxy = (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/post-job")) return tokenAuth(req);
  if (req.nextUrl.pathname.startsWith("/api/subscription")) return userAuth(req);
  return NextResponse.next();
};
