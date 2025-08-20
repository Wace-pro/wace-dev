export const ERROR_MESSAGES = {
    GLOBAL: {
        SERVER_INTERNAL_ERROR: "Internal server error.",
        SERVER_TOO_MANY_REQUESTS: "Too many requests, please try again later.",
        USER_UNAUTHORIZED: "Unauthorized access.",
    },
    AUTH: {
        USER_NAME_REQUIRED: "Name is required.",
        USER_EMAIL_ALREADY_REGISTERED: "Email already registered.",
        USER_EMAIL_INVALID: "Invalid email format.",
        USER_PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",
        USER_PASSWORD_MISMATCH: "Passwords do not match.",
        USER_CREATION_FAILED: "User creation failed or password not secured.",
        USER_CLUB_SELECTED: "Please select a club.",
        USER_INVALID_INPUT: "Invalid input data.",

        USER_EMAIL_NOT_REGISTERED: "Email not registered.",
        USER_PASSWORD_INCORRECT: "Incorrect password.",
        USER_LOGIN_FAILED: "Login failed, please try again.",
        
        USER_TOKEN_MISSING: "Verification token is missing.",
        USER_TOKEN_EXPIRED: "Verification token expired.",
        USER_TOKEN_INVALID: "Verification token invalid",
        USER_VERIFICATION_REVOKED: "Email verification revoked.",

    },
    
} as const;
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type ErrorMessageValue = (typeof ERROR_MESSAGES)[ErrorMessageKey];