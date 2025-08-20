import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ERROR_MESSAGES } from '@/constants/error-messages';
import { clearTokenCookie, getTokenCookie } from '@/lib/cookies';
import { verifyAuthTokenServer } from '@/lib/server-middleware';

export async function GET(req: NextRequest) {
    const msg = ERROR_MESSAGES.AUTH;
    const g_msg = ERROR_MESSAGES.GLOBAL;


    const token = await getTokenCookie(req) || ""

    console.log({ token }, "Token from cookies in verify route");

    const result = verifyAuthTokenServer(token);

    if (!result.valid) {
        return NextResponse.json(
            {
                success: false,
                error: result.error,
                message: result.message,
                data: null
            },
            { status: 401 }
        );
    }


    try {
        // Optional: You can validate the request has a valid token before logout
        // const token = req.cookies.get('token')?.value;

        const res = NextResponse.json({
            success: true,
            error: null,
            message: 'User logout successful.',
            data: null,
        });
        clearTokenCookie(res)

        console.log('User logged out successfully');

        return res;
    } catch (error) {
        console.log('Logout error details:', {
            error,
        });

        return NextResponse.json(
            {
                success: false,
                error: g_msg.SERVER_INTERNAL_ERROR,
                message: null,
                data: null,
            },
            { status: 500 }
        );
    }
}
