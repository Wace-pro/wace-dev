import { z } from "zod";
import  {ERROR_MESSAGES} from "@/constants/error-messages";

const msg = ERROR_MESSAGES.AUTH;
export const signupSchema = z.object({
  name: z.string().min(2,msg.USER_NAME_REQUIRED ),
  email: z.string().email(msg.USER_EMAIL_INVALID),
  password: z.string().min(8, msg.USER_PASSWORD_TOO_SHORT),
  confirmPassword: z.string().min(8, "Confirm your password"),
   club: z.string().nonempty(msg.USER_CLUB_SELECTED),
}).refine((data) => data.password === data.confirmPassword, {
  message: msg.USER_PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});

export type SignupSchema = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
  email: z.string().email(msg.USER_EMAIL_INVALID),
  password: z.string().min(8, msg.USER_PASSWORD_TOO_SHORT),
});

export type LoginSchema = z.infer<typeof loginSchema>;