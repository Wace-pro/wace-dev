import { NextResponse, NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export function setTokenCookie(res: NextResponse, token: string) {
    res.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}



export async function getTokenCookie(req: NextRequest) {
    

    return req.cookies.get('token')?.value || null;
}

export function clearTokenCookie(res: NextResponse) {
    res.cookies.set('token', '', {
        path: '/',
        maxAge: 0,
    });
}