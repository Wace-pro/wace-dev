"use client"

import Layout from "@/components/Layout"
import { Package, Rocket } from "lucide-react"

// Xpods page - Coming Soon screen (simplified)
export default function Xpods() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
        {/* Main Icon */}
        <div className="w-32 h-32 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
          <Package className="w-16 h-16 text-electricBlue" />
        </div>

        {/* Coming Soon Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Xpods</h1>
          <div className="flex items-center justify-center space-x-2 text-electricBlue">
            <Rocket className="w-5 h-5" />
            <span className="text-xl font-semibold">Coming Soon</span>
            <Rocket className="w-5 h-5" />
          </div>
          <p className="text-white/60 text-lg max-w-md">
            We're working hard to bring you an amazing new feature that will revolutionize your startup journey.
          </p>
        </div>
      </div>
    </Layout>
  )
}
