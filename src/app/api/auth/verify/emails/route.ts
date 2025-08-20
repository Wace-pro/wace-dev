// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthTokenServer } from "@/lib/server-middleware"; // your function
import { error } from "console";
import { clearTokenCookie, getTokenCookie } from "@/lib/cookies";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { verifyEmailToken } from "@/lib/verfiy/verification-token";

export async function PATCH(req: NextRequest) {

    const msg = ERROR_MESSAGES.AUTH;

    const queryParameter = req.nextUrl.searchParams;
    const token = queryParameter.get("token");
    if (!token) {
        return NextResponse.json(
            { success: false, error: msg.USER_TOKEN_MISSING, message: null, data: null },
            { status: 400 }
        );
    }

    const decodedToken = decodeURIComponent(token); 
    if (!decodedToken) {
        return NextResponse.json(
            { success: false, error: msg.USER_TOKEN_INVALID, message: null, data: null },
            { status: 400 }
        );
    }   

    const { success, error } = await verifyEmailToken(decodedToken)

    if (!success) {
        return NextResponse.json(
            { success: false, error, message: null, data: null },
            { status: 400 }
        );
    }

    return NextResponse.json(
        { success: true, error: null, message: "Email verified successfully", data: null },
        { status: 200 });
}
