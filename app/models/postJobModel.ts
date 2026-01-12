import { JobForm } from "@/lib/validations/postJobFormSchema";
import mongoose from "mongoose";
type isPremium = "Yes" | "No";

export interface jobPost extends mongoose.Document, JobForm {
  userId: mongoose.Types.ObjectId;
  isPremium: isPremium;
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
  experienceRequired: { type: String, enum: ["Yes", "No"], required: true },
  minExperienceRequired: { type: Number },
  deadline: { type: Date, required: true },
  isPremium: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
    default: "No",
  },
});

const jobPostModel =
  mongoose.models.Job|| mongoose.model<jobPost>("Job", jobPostSchema);
export default jobPostModel;
