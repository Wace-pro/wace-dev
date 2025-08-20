// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAuthTokenServer } from "@/lib/server-middleware"; // your function
import { error } from "console";
import { clearTokenCookie, getTokenCookie } from "@/lib/cookies";

export async function GET(req: NextRequest) {
    // const token = cookieStore.get("token") 
    const token = await getTokenCookie(req) || ""

    console.log({ token }, "Token from cookies in verify route");

    const result = verifyAuthTokenServer(token);

    console.log("Token verification result:", result);

    if (!result.valid) {


        let res = NextResponse.json(
            {
                success: false,
                error: result.error,
                message: result.message,
                data: null
            },
            { status: 401 }
        );
        return res;
    }

    return NextResponse.json({
        success: true,
        message: "Token is valid",
        error: null,
        data: null
    });


}
