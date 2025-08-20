import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChatMessage {
  userId: Types.ObjectId;
  agentId: Types.ObjectId; // NEW: which AI answered or was queried
  role: "user" | "ai";
  message: string;
  timestamp: Date;
  sessionId?: string;
}

export interface IChat_Message extends IChatMessage, Document {
  createdAt: Date
  updatedAt: Date
}
export type IClient_Chat_Message = Omit<IChat_Message, "_id" | "createdAt" | "updatedAt"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};



const ChatMessageSchema = new Schema<IChat_Message>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    agentId: { type: Schema.Types.ObjectId, ref: "AiAgent", required: true },
    role: { type: String, enum: ["user", "ai"], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    sessionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ChatMessage ||
  mongoose.model<IChat_Message>("ChatMessage", ChatMessageSchema);
