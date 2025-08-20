import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local",MONGODB_URI);
  throw new Error("Please define MONGODB_URI in your .env.local");
}

// Global cache (for hot reload in dev)
let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "wace-db", // Optional: explicitly name your DB
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

