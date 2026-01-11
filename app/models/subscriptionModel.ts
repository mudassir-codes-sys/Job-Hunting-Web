import mongoose from "mongoose";

export interface subscription extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  plan: string;
  stripeSessionId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  paymentStatus: string;
  status: string;
  currency: string;
  totalAmount: number;
  email: string;
  paymentDate: Date;
  expiryDate?: Date;
}

const subscriptionSchema = new mongoose.Schema<subscription>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: { type: String, required: true },
    stripeSessionId: { type: String, required: true },
    stripeCustomerId: { type: String, required: true },
    stripeSubscriptionId: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    status: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    email: { type: String, required: true },
    currency: { type: String, required: true },
    paymentDate: { type: Date, required: true, default: Date.now() },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

    const subscriptionModel  = mongoose.models.Subscription || mongoose.model<subscription>('Subscription' , subscriptionSchema)

export default subscriptionModel;
