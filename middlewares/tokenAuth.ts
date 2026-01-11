import { NextRequest, NextResponse } from "next/server";

const tokenAuth = (req: NextRequest) => {
  const token = req.cookies.get("token");
  if (!token) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
};

export default tokenAuth;
