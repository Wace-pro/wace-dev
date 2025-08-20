import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAiAgent {
    name: string;
    role: string; // e.g., 'Assistant', 'Marketer'
    description: string;
    avatarUrl: string;
    systemPrompt?: string; // unique prompt for agent behavior
}

export interface IAi_Agent extends IAiAgent, Document {
    createdAt: Date
    updatedAt: Date
}
export type IClientAiAgent = Omit<IAi_Agent, "_id" | "createdAt" | "updatedAt"> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
}



const AiAgentSchema = new Schema<IAi_Agent>(
    {
        name: { type: String, required: true },
        role: { type: String, required: true }, // e.g. "Marketer"
        description: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        systemPrompt: { type: String }, // for GPT behavior injection
    },
    { timestamps: true }
);

export default mongoose.models.AiAgent ||
    mongoose.model<IAi_Agent>("AiAgent", AiAgentSchema);
