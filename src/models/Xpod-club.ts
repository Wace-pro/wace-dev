import mongoose, { Schema, Document } from "mongoose";

export interface IXpodClub {
  name: string;
  description: string;
  clubLeaderImageUrl: string;
}

export interface IXpod_Club extends IXpodClub, Document {
  createdAt: Date
  updatedAt: Date
}
export type IClient_Xpod_Club = Omit<IXpod_Club, "_id" | "createdAt" | "updatedAt"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};



const XpodClubSchema = new Schema<IXpod_Club>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    clubLeaderImageUrl: { type: String, },
  },
  { timestamps: true }
);

export default mongoose.models.XpodClub ||
  mongoose.model<IXpod_Club>("XpodClub", XpodClubSchema);
