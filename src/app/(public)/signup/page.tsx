"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "@/validations/validations.schema";
import { useFetch } from "@/hooks/useFetch";
import { IClient_Xpod_Club } from "@/models/Xpod-club";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { useToast } from "@/hooks/use-toast";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { toast } = useToast();
  const userSignup = useFetch("/api/auth/signup", { method: "POST" });
  const clubs = useFetch<IClient_Xpod_Club[]>("/api/xpod/clubs");

  const g_msg = ERROR_MESSAGES.GLOBAL;
  const msg = ERROR_MESSAGES.AUTH;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // validate on change
  });

  useEffect(() => {
    clubs.fetchData("/api/xpod/clubs");
  }, []);

  useEffect(() => {
    if (userSignup.success && userSignup.error === null) {
      router.push("/dashboard");
    } else {
      switch (userSignup.error) {
        case msg.USER_NAME_REQUIRED:
          setError("name", {
            type: "required",
            message: userSignup.error,
          });
          break;
        case msg.USER_EMAIL_INVALID:
          setError("email", {
            type: "validate",
            message: userSignup.error,
          });
          break;
        case msg.USER_EMAIL_ALREADY_REGISTERED:
          setError("email", {
            type: "validate",
            message: userSignup.error,
          });
          break;
        case msg.USER_PASSWORD_TOO_SHORT:
          setError("password", {
            type: "minLength",
            message: userSignup.error,
          });
          break;
        case msg.USER_PASSWORD_MISMATCH:
          setError("confirmPassword", {
            type: "validate",
            message: userSignup.error,
          });

          break;
        case msg.USER_CLUB_SELECTED:
          setError("club", {
            type: "required",
            message: userSignup.error,
          });
          break;
        case msg.USER_CREATION_FAILED:
          toast({
            title: "Unable to create account",
            description: userSignup.error,
            variant: "destructive",
            duration: 5000,
          });
          break;
        case g_msg.SERVER_INTERNAL_ERROR:
          toast({
            title: "Unable to create account",
            description: userSignup.error,
            variant: "destructive",
            duration: 5000,
          });
          break;
      }
    }
  }, [userSignup.success, userSignup.error]);

  const router = useRouter();

  const onSubmit = async (data: SignupSchema) => {
    try {
      await userSignup.fetchData(data);
    } catch (err) {
      toast({
        title: "Unable to create account",
        description: userSignup.error,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-electricBlue mb-2">WACE</h1>
          <p className="text-white/60">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="bg-black border border-electricBlue/30 text-white px-4 py-3 rounded-lg focus:border-electricBlue focus:outline-none transition-colors w-full"
              {...register("name")}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email
            </label>
            <input
              type="email"
              className="bg-black border border-electricBlue/30 text-white px-4 py-3 rounded-lg focus:border-electricBlue focus:outline-none transition-colors w-full"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-black border border-electricBlue/30 text-white px-4 py-3 rounded-lg focus:border-electricBlue focus:outline-none transition-colors w-full pr-12"
                {...register("password")}
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="bg-black border border-electricBlue/30 text-white px-4 py-3 rounded-lg focus:border-electricBlue focus:outline-none transition-colors w-full pr-12"
                {...register("confirmPassword")}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Choose Your Club
            </label>
            <select
              className="bg-black border border-electricBlue/30 text-white px-4 py-3 rounded-lg focus:border-electricBlue focus:outline-none transition-colors w-full"
              {...register("club")}
              defaultValue=""
            >
              <option value="" disabled>
                Select a club
              </option>
              {clubs.success === true &&
                clubs.data &&
                clubs.data.map((club) => (
                  <option
                    className="capitalize"
                    key={String(club._id)}
                    value={`${String(club._id)}.${club.name}`}
                  >
                    {club.name}
                  </option>
                ))}
            </select>
            {errors.club && (
              <p className="text-red-500 text-xs mt-1">{errors.club.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-electricBlue text-black px-6 py-3 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-white/60 mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-electricBlue hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
