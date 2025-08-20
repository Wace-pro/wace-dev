"use client"

import type React from "react"

import { useState } from "react"
import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { useRouter } from "next/navigation"

interface VideoPlayerProps {
  isOpen: boolean
  onClose: () => void
  course: {
    title: string
    duration: string
    category: string
    thumbnail: string
  }
}

export default function VideoPlayer({ isOpen, onClose, course }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const router = useRouter()

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

  const openFullscreen = () => {
    // Navigate to fullscreen page with course data
    const params = new URLSearchParams({
      title: course.title,
      duration: course.duration,
      category: course.category,
    })
    router.push(`/video-fullscreen?${params.toString()}`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-electricBlue/20 rounded-xl w-full max-w-5xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-electricBlue/20 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">{course.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <span>{course.duration}</span>
              <span className="capitalize">{course.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Video Player */}
          <div className="relative bg-black" style={{ aspectRatio: "16/9" }}>
            {/* Video Content */}
            <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/20 to-black flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/60">Video content would play here</p>
                {isPlaying && <p className="text-electricBlue text-sm mt-2">▶ Playing...</p>}
              </div>
            </div>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
              >
                <div className="w-16 h-16 bg-electricBlue/20 border border-electricBlue/30 rounded-full flex items-center justify-center group-hover:bg-electricBlue/30 transition-colors">
                  <Play className="w-6 h-6 text-electricBlue ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="p-4 flex-shrink-0">
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={skipBackward}
                  className="text-white/60 hover:text-electricBlue p-2 rounded hover:bg-white/10 transition-colors"
                  title="Skip back 10s"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-electricBlue text-black p-3 rounded-full hover:bg-electricBlue/90 transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={skipForward}
                  className="text-white/60 hover:text-electricBlue p-2 rounded hover:bg-white/10 transition-colors"
                  title="Skip forward 10s"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white/60 hover:text-electricBlue transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                    title={`Volume: ${isMuted ? 0 : volume}%`}
                  />
                </div>

                {/* Fullscreen */}
                <button
                  onClick={openFullscreen}
                  className="text-white/60 hover:text-electricBlue p-2 rounded hover:bg-white/10 transition-colors"
                  title="Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Course Info */}
            <div className="pt-4 border-t border-electricBlue/10 mt-4">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Category: {course.category}</span>
                <span>Duration: {course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
