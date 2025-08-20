"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-electricBlue mb-2">WACE</h1>
          <p className="text-gray-400">Reset your password</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="input-field w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              <p className="text-sm text-gray-400 mt-2">We'll send you a link to reset your password.</p>
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-electricBlue rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">📧</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Check your email</h2>
            <p className="text-gray-400">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/signin" className="inline-flex items-center text-electricBlue hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
