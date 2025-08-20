import { ApiResponse } from "@/types/server";
import React, { useEffect, useState, Suspense } from "react";

const VerifyAccountPage: React.FC<{
  searchParams: Promise<{ [key: string]: string | undefined }>;
}> = async ({ searchParams }) => {
  const { token } = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify/emails?token=${encodeURIComponent(token || "")}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result: ApiResponse = await res.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          {result.success ? (
            <div className="text-green-600 text-center">
              <h1 className="text-2xl font-bold mb-4">
                Email Verified Successfully!
              </h1>
              <p className="text-lg">You are now able to use your account.</p>
            </div>
          ) : (
            <div className="text-red-600 text-center">
              <h1 className="text-2xl font-bold mb-4">Verification Failed</h1>
              <p className="text-lg">
                {result.error || "An error occurred during verification."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default VerifyAccountPage;
