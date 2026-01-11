import { JobForm } from "@/lib/validations/postJobFormSchema";
import mongoose from "mongoose";

export interface jobPost extends mongoose.Document, JobForm {
  userId: mongoose.Types.ObjectId;
  isPremium: boolean;
}

const jobPostSchema = new mongoose.Schema<jobPost>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true },
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["Full Time", "Part Time", "Contract", "Internship"],
    required: true,
  },
  location: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  educationRequired: { type: String, required: true },
  experienceRequired: { type: Boolean, required: true },
  minExperienceRequired: { type: Number },
  deadline: { type: Date, required: true },
  isPremium: { type: Boolean, required: true, default: false },
});

const jobPostModel =
  mongoose.models.Jobs || mongoose.model<jobPost>("Job", jobPostSchema);
export default jobPostModel;
