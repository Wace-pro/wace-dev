import mongoose from "mongoose";
import XpodClub, { IXpod_Club, IXpodClub } from "@/models/Xpod-club";
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Get security key from query params
        const searchParams = req.nextUrl.searchParams;
        const key = searchParams.get("key");
        const secretKey = process.env.XPOD_CLUB_KEY;


        if (!key || key !== secretKey) {
            return NextResponse.json(
                { success: false, error: "Unauthorized", message: null, data: null },
                { status: 401 }
            );
        }


        await connectDB();
        const clubs: IXpodClub[] = [
            {

                name: "Syrone",
                description: "Creative minds changing the world.",
                clubLeaderImageUrl: "",
            },
            {
                name: "Dyno",
                description: "Makers, coders, and creators.",
                clubLeaderImageUrl: "",
            },
            {
                name: "Pex",
                description: "Curious minds pushing boundaries.",
                clubLeaderImageUrl: "",
            },
        ];

        let created = [];
        for (const club of clubs) {
            const exists = await XpodClub.findOne({ name: club.name });
            if (!exists) {
                const newClub = await XpodClub.create(club);
                created.push(newClub.name);
            }
        }

        return NextResponse.json(
            {
                success: true,
                error: null,
                message: created.length
                    ? `Some Clubs added and some already exist`
                    : "All clubs already exist.",
                data: created,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in Xpod Clubs API:", {error});
        return NextResponse.json(
            { success: false, error: "Internal server error.", message: null, data: null },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {

    console.log("Api hit");
    
    
    try {
        await connectDB();
        console.log("connected DB");
        const clubs: IXpod_Club[] = await XpodClub.find({}).sort({ createdAt: -1 });
        return NextResponse.json(
            { success: true, error: null, message: "Clubs Data fetched Succesfully", data: clubs },
            { status: 200 }
        );
    } catch (error) {
        console.log("Here is the error",{error});
        return NextResponse.json(
            { success: false, error: "Internal server error.", message: null, data: null },
            { status: 500 }
        );
    }
}