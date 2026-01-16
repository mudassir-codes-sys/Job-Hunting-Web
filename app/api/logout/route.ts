import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );

    res.cookies.delete("token");
    return res;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
