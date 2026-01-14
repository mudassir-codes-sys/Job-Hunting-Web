import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobType, post } from "@/lib/validations/postJobFormSchema";

export interface job {
  _id: string;
  userId: string;
  companyName: string;
  companyLogo: string;
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
  applied: number;
  createdAt: Date;
}
interface jobState {
  allJobs: job[];
}

const initialState: jobState = {
  allJobs: [],
};
export const jobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<job[]>) => {
      state.allJobs = action.payload;
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
