import { z } from "zod";

export const signUpValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginValidation = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
