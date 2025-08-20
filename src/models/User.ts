import mongoose, { Document, Schema, Types } from "mongoose";
import { IAiAgent } from "./Ai-agent";
import { IXpodClub } from "./Xpod-club";

interface JournalEntry {
  entry: string;
  date: Date;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'owner';
  isEmailVerified: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  xp: number;
  wcp: number;
  level: number;
  recentTools: string[];
  recentCourses: string[];
  launchPlan: string[];
  image?: string;
  currentStepIndex: number;
  journal: JournalEntry[];
  aiConsultantsUnlocked: (Types.ObjectId | IAiAgent)[];
  xpodSelection: (Types.ObjectId | IXpodClub);
  xpodSelectionName: string;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface I_User extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type IClient_User = Omit<I_User, "_id" | "createdAt" | "updatedAt"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const JournalEntrySchema = new Schema<JournalEntry>(
  {
    entry: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<I_User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin', 'owner'],
      default: 'user',
    },
    isEmailVerified: { type: Boolean, default: false },
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },
    image: { type: String, default: "" },
    xp: { type: Number, default: 0 },
    wcp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    recentTools: [{ type: String }],
    recentCourses: [{ type: String }],
    launchPlan: [{ type: String }],
    currentStepIndex: { type: Number, default: 0 },
    journal: [JournalEntrySchema],
    aiConsultantsUnlocked: [
      { type: Schema.Types.ObjectId, ref: "AiAgent", default: [] },
    ],
    xpodSelection: {
      type: Schema.Types.ObjectId,
      ref: "XpodClub",
      required: true,
    },
    xpodSelectionName: {
      type: String,
      required: true,
    },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<I_User>("User", UserSchema);
