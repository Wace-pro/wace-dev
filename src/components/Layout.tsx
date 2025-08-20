"use client"

import type { ReactNode } from "react"
import Sidebar from "./Sidebar"
import { useWCP } from "../hooks/useWCP"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { wcp } = useWCP()

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 ml-64">
        <header className="bg-black border-b border-electricBlue/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electricBlue">WACE</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white/70">
                <span className="text-electricBlue font-semibold">{wcp}</span> WCP Coins
              </div>
              <div className="text-sm text-white/70">
                Level <span className="text-electricBlue font-semibold">5</span>
              </div>
              <button
                onClick={() => (window.location.href = "/settings")}
                className="w-8 h-8 bg-electricBlue rounded-full flex items-center justify-center text-black font-semibold cursor-pointer"
              >
                U
              </button>
            </div>
          </div>
        </header>
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
