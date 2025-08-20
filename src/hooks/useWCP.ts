"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import {WCPContext} from "../providers/wcp-provider"
// WCP Context for global state management


export const useWCP = () => {
  const context = useContext(WCPContext)
  if (!context) {
    throw new Error("useWCP must be used within WCPProvider")
  }
  return context
}
