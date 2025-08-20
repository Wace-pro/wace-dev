"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetch } from "@/hooks/useFetch";
import { loginSchema,LoginSchema } from "@/validations/validations.schema"; // Create this schema similar to signupSchema
import { useToast } from "@/hooks/use-toast";
import { ERROR_MESSAGES } from "@/constants/error-messages";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const userSignIn = useFetch("/api/auth/login", { method: "POST" });

  const g_msg = ERROR_MESSAGES.GLOBAL;
  const msg = ERROR_MESSAGES.AUTH;

useEffect(() => {
    if (userSignIn.success && userSignIn.error === null) {
      router.push("/dashboard");
    } else {
      switch (userSignIn.error) {
        
        case msg.USER_EMAIL_INVALID:
          setError("email", {
            type: "validate",
            message: userSignIn.error,
          });
          break;
        case msg.USER_EMAIL_NOT_REGISTERED:
          setError("email", {
            type: "validate",
            message: userSignIn.error,
          });
          break;
       
        case msg.USER_PASSWORD_TOO_SHORT:
          setError("password", {
            type: "minLength",
            message: userSignIn.error,
          });
          break;
        case msg.USER_PASSWORD_INCORRECT:
          setError("password", {
            type: "validate",
            message: userSignIn.error,
          });
          break;
        
       
        case g_msg.SERVER_INTERNAL_ERROR:
          toast({
            title: "Unable to login, Please try again later",
            description: userSignIn.error,
            variant: "destructive",
            duration: 5000,
          });
          break;
      }
    }
  }, [userSignIn.success, userSignIn.error]);

  const onSubmit = async (data: any) => {
    try {
      await userSignIn.fetchData(data);
    } catch (err) {
      toast({
        title: "Unable to create account",
        description: userSignIn.error,
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
          <p className="text-white/60">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-white/60">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-electricBlue hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-electricBlue text-black px-6 py-3 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {message && (
          <div className="text-green-500 text-center mt-4">{message}</div>
        )} */}

        <p className="text-center text-white/60 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-electricBlue hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
