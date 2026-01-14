import { applyJob } from "@/lib/validations/applyJob";
import mongoose from "mongoose";

export interface applyJobI extends applyJob, mongoose.Document {
  jobId: string;
  userId: string;
}

const applyJobSchema = new mongoose.Schema<applyJobI>({
  userId: { type: String, required: true },
  jobId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
});

const applyJobModel =
  mongoose.models.Apply || mongoose.model("Apply", applyJobSchema);

export default applyJobModel;
