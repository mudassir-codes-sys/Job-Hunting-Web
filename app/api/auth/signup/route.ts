import { User, userModel } from "@/app/models/userModel";
import bcrypt from "bcrypt";
import {
  loginValidation,
  signUpValidation,
} from "@/lib/validations/userValidation";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { sendEmail } from "@/utils/sendMail";
import { ZodError } from "zod";
import sendResponse from "@/utils/response";
import generateToken from "@/utils/generateToken";

type data = {
  name?: string;
  email: string;
  password: string;
  type: "signup" | "login";
};

export async function POST(req: NextRequest) {
  const body: Partial<data> = await req.json();
  const { name, email, password, type } = body;

  if (!email || !password || (type === "signup" && !name))
    return sendResponse(false, "All field are required", 400);

  try {
    // Parsing
    if (type === "signup") signUpValidation.parse({ name, email, password });
    else loginValidation.parse({ email, password });

    // Db connect
    await connectDB();

    const code = Math.floor(100000 + Math.random() * 900000);
    const expiryDate = new Date(
      new Date().setMinutes(new Date().getMinutes() + 5)
    );

    // ----------------------------Signup----------------------

    if (type === "signup") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: User = new userModel({
        name,
        email,
        password: hashedPassword,
        verifyCode: code,
        expiryDate,
      });
      await user.save();
      await sendEmail({ name: name!, email, code });
      return NextResponse.json(
        {
          success: true,
          message: "Sign up successful verify your email",
          redirectUrl: `${process.env.FRONTEND_URL}/verify?email=${encodeURIComponent(email!)}`,
        },
        { status: 201 }
      );
    }

    // ---------------------------Login---------------------------

    if (type === "login") {
      const userExist: User | null = await userModel.findOne({ email });
      if (!userExist) return sendResponse(false, "Invalid credentials", 400);
      // Password compare

      const isMatched = await bcrypt.compare(password, userExist.password!);

      if (!isMatched) return sendResponse(false, "Invalid credentials", 400);

      if (!userExist.isVerified) {
        userExist.verifyCode = code;
        userExist.expiryDate = expiryDate;
        await userExist.save();
        await sendEmail({ name: userExist.name, email, code });

        return NextResponse.json(
          {
            success: true,
            message: "Login successful verify your email",
            redirectUrl: `${process.env.FRONTEND_URL}/verify?email=${encodeURIComponent(userExist.email)}`,
          },
          { status: 201 }
        );
      }

      const token = generateToken(userExist._id.toString(), userExist.role);

      const res = NextResponse.json(
        {
          success: true,
          message: "Login successful",
          redirectUrl: userExist.role === "admin" ? "/admin/dashboard" : "/",
        },
        { status: 201 }
      );

      res.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 24 * 15,
        sameSite: "strict",
        path: "/",
      });
      return res;
    }

    return sendResponse(false, "Invalid request type", 400);
  } catch (error: unknown) {
    console.error((error as Error).message);

    if (error instanceof ZodError)
      return sendResponse(false, error.issues[0].message, 400);
    else return sendResponse(false, (error as Error).message, 500);
  }
}
