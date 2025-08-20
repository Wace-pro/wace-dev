import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { setTokenCookie } from '@/lib/cookies';
import User, { I_User } from '@/models/User';
import { connectDB } from '@/lib/db';
import { signupSchema } from "@/validations/validations.schema"; // Adjust the import path as needed
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { encrypt, generateExpiryDate, generateJWT, generateRandomToken } from '@/lib/server-middleware';
import { sendVerificationEmail } from '@/lib/mails/send-verification';



// JWT secret (use env variable in production)/


// Helper to set cookie


export async function POST(req: NextRequest) {

    const msg = ERROR_MESSAGES.AUTH;
    const g_msg = ERROR_MESSAGES.GLOBAL

    console.log("Sign up API called");

    try {
        const body = await req.json();

        // Validate with zod
        const parseResult = signupSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: parseResult.error.errors[0]?.message || msg.USER_INVALID_INPUT,
                    message: null,
                    data: null
                },
                { status: 400 }
            );
        }
        const { email, password, name, club } = parseResult.data;

        console.log("Parsed Succesfully");

        await connectDB();
        const userExists = await User.findOne({ email });

        console.log("Checking User", userExists);
        if (userExists) {
            return NextResponse.json(
                { success: false, error: msg.USER_EMAIL_ALREADY_REGISTERED, message: null, data: null },
                { status: 409 }
            );
        }

        const [clubId, clubName] = club && club.split(".")

        console.log(clubId, clubName, "Faizan")

        if (!clubId || !clubName) {

            return NextResponse.json({
                success: false,
                error: msg.USER_CLUB_SELECTED,
                message: null,
                data: null
            }, { status: 400 })

        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = generateRandomToken();
        const verificationTokenExpiry = generateExpiryDate("1 day")

        const newUser: I_User = await User.create({
            email,
            password: hashedPassword,
            name,
            xpodSelection: clubId,
            xpodSelectionName: clubName,
            verificationToken,
            verificationTokenExpiry
        });

        if (!newUser || !newUser._id || newUser.password === password) {
            return NextResponse.json(
                { success: false, error: msg.USER_CREATION_FAILED, message: null, data: null },
                { status: 500 }
            );
        }

        const encryptedEmail = encrypt(email)
        const token = generateJWT({ encryptedUser: encryptedEmail });

        try {

            const emailVeriFicationResponse = await sendVerificationEmail({
                to: email,
                username: name,
                verifyUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify-account?token=${encodeURIComponent(verificationToken)}`,
            });

            if (emailVeriFicationResponse.success) {
                const res = NextResponse.json(
                    { success: true, error: null, message: "Signup successful." }
                );
                setTokenCookie(res, token);

                return res;
            } else {
                throw emailVeriFicationResponse.error
            }

        } catch (error) {
            return NextResponse.json(
                { success: false, error: msg.USER_CREATION_FAILED, message: error, data: null },
                { status: 500 }
            );

        }



    } catch (error) {
        console.log({ error })
        return NextResponse.json(
            { success: false, error: g_msg.SERVER_INTERNAL_ERROR, message: null, data: null },
            { status: 500 }
        );
    }
}