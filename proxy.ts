import { NextRequest, NextResponse } from "next/server";
import tokenAuth from "./middlewares/tokenAuth";
import { userAuth } from "./middlewares/userAuth";

export const proxy = (req: NextRequest) => {
  // Token auth
  if (
    req.nextUrl.pathname.startsWith("/post-job") ||
    req.nextUrl.pathname.startsWith("/apply") ||
    req.nextUrl.pathname.startsWith("/your-jobs") ||
    req.nextUrl.pathname.startsWith("/pricing")
  )
    return tokenAuth(req);

  //  get user id

  if (
    req.nextUrl.pathname.startsWith("/api/post-job") ||
    req.nextUrl.pathname.startsWith("/api/subscription") ||
    req.nextUrl.pathname.startsWith("/api/apply-job") ||
    req.nextUrl.pathname.startsWith("/api/your-jobs") ||
    req.nextUrl.pathname.startsWith("/api/applicants")
  )
    return userAuth(req);

  return NextResponse.next();
};
