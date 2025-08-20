"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

// WCP Context for global state management
export const WCPContext = createContext({
  wcp: 247,
  setWCP: (amount: number) => {},
  spendWCP: (amount: number) => false as boolean,
  addWCP: (amount: number) => {},
})

export default function WCPProvider({ children }: { children: React.ReactNode }) {
  const [wcp, setWCPState] = useState(247)

  // Load WCP from localStorage on mount
  useEffect(() => {
    const savedWCP = localStorage.getItem("wace-wcp")
    if (savedWCP) {
      setWCPState(Number.parseInt(savedWCP))
    }
  }, [])

  // Save WCP to localStorage whenever it changes
  const setWCP = (amount: number) => {
    setWCPState(amount)
    localStorage.setItem("wace-wcp", amount.toString())
  }

  const spendWCP = (amount: number): boolean => {
    if (wcp >= amount) {
      setWCP(wcp - amount)
      return true
    }
    return false
  }

  const addWCP = (amount: number) => {
    setWCP(wcp + amount)
  }

  return <WCPContext.Provider value={{ wcp, setWCP, spendWCP, addWCP }}>{children}</WCPContext.Provider>
}
