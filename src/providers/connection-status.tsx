"use client"

import { useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { useNetworkStatus } from "@/hooks/useNetworkStatus"

export default function ConnectionStatusHandler() {
  const isOnline = useNetworkStatus()
  const { toast, dismiss } = useToast()

  const connectionLostToastId = useRef<string | null>(null)

  useEffect(() => {
      console.log(isOnline);
    if (!isOnline) {
        
      if (!connectionLostToastId.current) {
        const lost = toast({
          
          title: "Connection Lost",
          description: "You are offline. Please check your internet connection.",
          duration: 5000, // effectively infinite
          className: "bg-destructive text-white",
        })

        connectionLostToastId.current = lost.id
      }
    } else {
    //   if (connectionLostToastId.current) {
    //     // Show "Connection Restored"
    //     toast({
    //       title: "Connection Restored",
    //       description: "You are back online!",
    //       duration: 3000,
    //       className: "bg-green-500 text-white",
    //     })

    //     // Dismiss "Connection Lost" after short delay
    //     setTimeout(() => {
    //       dismiss(connectionLostToastId.current!)
    //       connectionLostToastId.current = null
    //     }, 500)
    //   }
    }
  }, [isOnline, toast, dismiss])

  return null
}
