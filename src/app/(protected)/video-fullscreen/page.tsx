"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"

export default function VideoFullscreen() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get course data from URL params
  const courseTitle = searchParams.get("title") || "Video Course"
  const courseDuration = searchParams.get("duration") || "2 hours"
  const courseCategory = searchParams.get("category") || "General"

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    console.log(isPlaying ? "Pausing video" : "Playing video")
  }

  const skipBackward = () => {
    console.log("Skipping backward 10 seconds")
  }

  const skipForward = () => {
    console.log("Skipping forward 10 seconds")
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    console.log("Volume changed to:", newVolume)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    console.log(isMuted ? "Unmuting" : "Muting")
  }

  const exitFullscreen = () => {
    router.back()
  }

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimeout = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const handleMouseMove = () => resetTimeout()
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        exitFullscreen()
      } else if (e.key === " ") {
        e.preventDefault()
        togglePlay()
      }
      resetTimeout()
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("keydown", handleKeyPress)
    resetTimeout()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("keydown", handleKeyPress)
      clearTimeout(timeout)
    }
  }, [isPlaying])

  return (
    <div className="fixed inset-0 bg-black w-screen h-screen overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Video Content Area */}
      <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/20 to-black flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 text-xl mb-4">Video content would play here</p>
          <p className="text-white/40 text-lg">Fullscreen Mode</p>
        </div>
        {isPlaying && (
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
            <p className="text-electricBlue text-lg bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">▶ Playing...</p>
          </div>
        )}
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
        >
          <div className="w-24 h-24 bg-electricBlue/20 border border-electricBlue/30 rounded-full flex items-center justify-center group-hover:bg-electricBlue/30 transition-colors">
            <Play className="w-10 h-10 text-electricBlue ml-1" />
          </div>
        </button>
      )}

      {/* Header - Only show when controls are visible */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{courseTitle}</h1>
            <div className="flex items-center space-x-6 text-white/60 mt-1">
              <span>{courseDuration}</span>
              <span className="capitalize">{courseCategory}</span>
            </div>
          </div>
          <button
            onClick={exitFullscreen}
            className="text-white/60 hover:text-white p-3 rounded-lg hover:bg-white/10 transition-colors"
            title="Exit fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls - Only show when controls are visible */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={skipBackward}
              className="text-white/60 hover:text-electricBlue p-3 rounded-lg hover:bg-white/10 transition-colors"
              title="Skip back 10s"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-electricBlue text-black p-4 rounded-full hover:bg-electricBlue/90 transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              onClick={skipForward}
              className="text-white/60 hover:text-electricBlue p-3 rounded-lg hover:bg-white/10 transition-colors"
              title="Skip forward 10s"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center space-x-6">
            {/* Volume */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-electricBlue transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                title={`Volume: ${isMuted ? 0 : volume}%`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Instructions overlay - positioned at bottom center when controls are visible */}
      <div
        className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"} pointer-events-none`}
      >
        <p className="text-white/40 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
          Press SPACE to play/pause • ESC to exit • Move mouse to show controls
        </p>
      </div>
    </div>
  )
}
