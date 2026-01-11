import mongoose from "mongoose";
export interface User extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  verifyCode: number;
  expiryDate?: Date;
  isVerified: boolean;
  profilePicture?: string;
  isPaid: boolean;
  premiumExpiryDate: Date | null;
}

export const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    verifyCode: { type: Number, required: true },
    expiryDate: { type: Date },
    profilePicture: { type: String, default: null },
    isVerified: { type: Boolean, required: true, default: false },
    isPaid: { type: Boolean, default: false },
    premiumExpiryDate: { type: Date, required: true, default: null },
  },
  { timestamps: true }
);

export const userModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);
