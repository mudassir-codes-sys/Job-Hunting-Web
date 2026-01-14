import z from "zod";

export interface applyJob {
  jobId?: string;
  name: string;
  email: string;
  resume: File | null;
  coverLetter?: File | null;
}

export const applyJobValidation = z.object({
  name: z.string({ error: "Name is required" }),
  email: z.email({ error: "Email is required" }),
  resume: z.file({ error: "Image is required" }).nullable(),
  coverLetter: z.file().nullable(),
});
