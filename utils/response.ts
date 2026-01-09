import { NextResponse } from "next/server";

interface responseData {
  success: boolean;
  status: number;
  message: string;
}

const sendResponse = (
  success: boolean,
  message: string,
  status: number
): NextResponse => {
  const responseBody: responseData = { success, message, status };

  return NextResponse.json(responseBody, { status });
};

export default sendResponse;
