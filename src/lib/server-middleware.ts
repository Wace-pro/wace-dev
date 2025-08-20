// lib/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { clearTokenCookie } from "./cookies";
import { ERROR_MESSAGES } from "@/constants/error-messages";


const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.CRYPTO_SECRET_KEY!, "utf-8"); // 32 bytes
const ivLength = 16;
const authMsg = ERROR_MESSAGES.AUTH;

export function encrypt(text: string): string {
  if (typeof text !== 'string') {
    throw new Error('Encrypt function requires a string input');
  }
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf-8"), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex"); // Combine iv and encrypted
}

export function decrypt(data: string): string {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf-8");
}


export const generateJWT = (valueObj: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "Pixemperfectoo";
  return jwt.sign({ ...valueObj }, JWT_SECRET, { expiresIn: "7d" });
}

export async function protectRoute(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) {
    return NextResponse.json({ error: "Unauthorized", data: null, message: null, success: false }, { status: 401 })
  }

  const user = await verifyAPIAuthToken(token)
  if (!user.valid) {
    const res = NextResponse.json({ error: "Invalid token", data: null, message: null, success: false }, { status: 403 });
    clearTokenCookie(res)

    return res;
  }

  return user
}

export function getBearerToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null
  return authHeader.split(" ")[1]
}

export async function verifyAPIAuthToken(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET || "Pixemperfectoo";

  if (!token) {
    console.error("No token provided for verification");
    return {
      valid: false,
      error: "No token found",
      message: "Token is missing"
    };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (!decoded || !decoded.encryptedUser) {
      return {
        valid: false,
        error: "No token found",         // e.g., "TokenExpiredError", "JsonWebTokenError"
        message: "Token is missing"     // e.g., "jwt expired"
      };
    } else {
      const validate = decoded.encryptedUser.split(":")[1];
      if (!validate) {
        return {
          valid: false,
          error: "Invalid token format",
          message: "Token is not properly formatted"
        };
      }

      const originalEmail = decrypt(decoded.encryptedUser);

      const regex = /.+@.+/;
      if (!regex.test(originalEmail)) {
        console.error("Invalid email format in token:", originalEmail);
        return {
          valid: false,
          error: "Invalid Email format",
          message: "Token is not properly formatted"
        };
      }

      return {
        valid: true,
        error: null,
        message: "Token is valid",
      }



    }

  } catch (err: any) {
    console.error("JWT Verification Error:", err.message);

    return {
      valid: false,
      error: err.name,         // e.g., "TokenExpiredError", "JsonWebTokenError"
      message: err.message     // e.g., "jwt expired"
    };
  }

}

export function verifyAuthTokenServer(token: string) {
  
  const JWT_SECRET = process.env.JWT_SECRET || "Pixemperfectoo";
  if (!token) {
    console.error("No token provided for verification");
    return {
      valid: false,
      error: "No token found",
      message: "Token is missing"
    };
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (!decoded || !decoded.encryptedUser) {
      return {
        valid: false,
        error: authMsg.USER_TOKEN_MISSING,         // e.g., "TokenExpiredError", "JsonWebTokenError"
        message: "Token is missing"     // e.g., "jwt expired"
      };
    } else {
      const validate = decoded.encryptedUser.split(":")[1];
      if (!validate) {
        return {
          valid: false,
          error: authMsg.USER_TOKEN_INVALID,
          message: "Token is not properly formatted"
        };
      }

      return {
        valid: true,
        error: null,
        message: "Token is valid",
      }



    }

  } catch (err: any) {
    console.error("JWT Verification Error:", err.message);

    return {
      valid: false,
      error: err.name,         // e.g., "TokenExpiredError", "JsonWebTokenError"
      message: err.message     // e.g., "jwt expired"
    };
  }
}


export function generateRandomToken() { return crypto.randomBytes(32).toString("hex"); }

export function generateExpiryDate(duration:
  "1 hour" | "2 hour" | "4 hour" | "6 hour" | "12 hour" |
  "1 day" | "2 day" | "7 days" | "15 days" | "30 days" | "6 month"
): Date {
  var map = {
    "1 hour": 1, "2 hour": 2, "4 hour": 4,
    "6 hour": 6, "12 hour": 12, "1 day": 24,
    "2 day": 48, "7 days": 168, "15 days": 360,
    "30 days": 720, "6 month": 4320
  };
  var hours = map[duration];
  if (!hours) throw new Error("Invalid duration");
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function verifyExpiryDate(expiryDate: Date | undefined): "expired"|"not-expired" {
  if (!expiryDate) {
    return "expired"; // If no expiry date is provided, consider it expired
  }
  const now = new Date();
  return now > expiryDate ? "expired" : "not-expired";
}