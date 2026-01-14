import { z } from "zod";
export type JobType = "Full Time" | "Part Time" | "Contract" | "Internship";
export type post = "Yes" | "No";

export interface JobForm {
  companyName: string;
  companyLogo: File | null;
  jobTitle: string;
  description: string;
  type: JobType;
  location: string;
  requiredSkills: string[];
  educationRequired: string;
  experienceRequired: post;
  minExperienceRequired?: number;
  deadline: Date;
  isPremium: post;
}

export const jobFormValidation = z.object({
  companyName: z.string().min(2, "Company name is required"),

  companyLogo: z.file({ error: "Company logo is required" }).nullable(),

  jobTitle: z.string({ error: "Title is required" }),

  description: z.string().min(20, "Description must be at least 20 characters"),

  type: z.enum(["Full Time", "Part Time", "Contract", "Internship"], {
    error: "Job Type is required",
  }),

  location: z.string({ error: "Location is required" }),

  requiredSkills: z
    .array(z.string().min(2, "Skill cannot be empty"))
    .min(1, "At least 1 skill is required"),

  educationRequired: z
    .string()
    .min(2, "Required education field must be provided"),

  experienceRequired: z.enum(["Yes", "No"], {
    error: "Fill the experience required field",
  }),

  minExperienceRequired: z.number().optional(),

  deadline: z
    .date()
    .refine((date) => date > new Date(), "Deadline must be in the future"),
  isPremium: z.enum(["Yes", "No"]),
});
