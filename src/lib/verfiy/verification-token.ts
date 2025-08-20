import User, { IUser, IClient_User } from "@/models/User";
import { connectDB } from "../db";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { verifyExpiryDate } from "../server-middleware";


export async function verifyEmailToken(token: string) {
    const msg = ERROR_MESSAGES.AUTH;

    await connectDB();
    const user = await User.findOne({
        verificationToken: token,
    })
    console.log("Checking Token Exist", user);
    if (!user) {
        return { success: false, error: msg.USER_TOKEN_INVALID }
    }

    const userFound = user as IClient_User

    if (verifyExpiryDate(userFound.verificationTokenExpiry) === "expired") {
        return { success: false, error: msg.USER_TOKEN_EXPIRED }
    }

    const updateUser: Partial<IClient_User> = {
        isEmailVerified: true,
        verificationToken: "",
        verificationTokenExpiry: undefined,
    }
    try {

        const updateUserResult = await User.findOneAndUpdate(
            { _id: userFound._id },
            updateUser,
            { new: true }
        )
        console.log("User Updated", updateUserResult);
        return { success: true, error: null }
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: msg.USER_VERIFICATION_REVOKED }

    }
}

