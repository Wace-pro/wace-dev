import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { setTokenCookie } from '@/lib/cookies';
import { loginSchema } from '@/validations/validations.schema';
import { ERROR_MESSAGES } from '@/constants/error-messages';
import { encrypt, generateJWT } from '@/lib/server-middleware';


export async function POST(req: NextRequest) {
  const msg = ERROR_MESSAGES.AUTH;
  const g_msg = ERROR_MESSAGES.GLOBAL;

  console.log('Login API called');

  try {
    const body = await req.json();

    const parseResult = loginSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.errors[0]?.message || msg.USER_INVALID_INPUT,
          message: null,
          data: null,
        },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    await connectDB();

    const existingUser = await User.findOne({ email });

    console.log('Checking user in DB →', existingUser);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: msg.USER_EMAIL_NOT_REGISTERED,
          message: null,
          data: null,
        },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: msg.USER_PASSWORD_INCORRECT,
          message: null,
          data: null,
        },
        { status: 401 }
      );
    }

    const encryptedEmail = encrypt(email)
    const token = generateJWT({encryptedUser:encryptedEmail});

    const res = NextResponse.json({
      success: true,
      error: null,
      message: 'User Login successful.',
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        plan: existingUser.plan,
        image: existingUser.image,
        xpodName: existingUser.xpodSelectionName,
      },
    });

   
    setTokenCookie(res, token);

    return res;
  } catch (error) {
    
    console.log({ error });

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
