"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

// Jinx Welcome component - shows onboarding popup for new users with 5 steps
const welcomeSteps = [
  {
    title: "Introduction",
    message: "Hey there, I'm Jinx, your friendly AI assistant. Welcome to WACE! 🎉",
    subtitle:
      "We're here to guide you from idea to launch and make sure your entrepreneurial journey is exciting and rewarding!",
  },
  {
    title: "What is WACE?",
    message:
      "WACE is a gamified startup-building platform designed to help young entrepreneurs like you build real businesses.",
    subtitle:
      "From your first idea to your product launch, we've got all the tools, resources, and guidance you'll need to succeed!",
  },
  {
    title: "Our Features",
    message: "Here are some of the cool features you'll get to explore:",
    subtitle:
      "1. LearnHub — Gain valuable knowledge with resources and tutorials.\n2. ToolHub — Use powerful tools for branding, marketing, and more.\n3. Startup Simulator — See how your ideas can turn into reality with our unique simulator.\n4. AI Consultants — Get advice from AI consultants on your business strategies.\n5. Journaling — Track your progress and ideas as you grow your startup.",
  },
  {
    title: "How We're Going to Help You",
    message:
      "We're here to make sure you never feel lost. Whether you're figuring out your idea or tackling challenges, we'll guide you every step of the way.",
    subtitle:
      "With Jinx by your side, you'll get personalized help, a supportive community, and tools to turn your dreams into reality!",
  },
  {
    title: "Enter Your Idea to Start the Journey",
    message: "Ready to start building your dream startup?",
    subtitle:
      "Go to the Startup Simulator, enter your idea, and let's take the first step in your entrepreneurial journey together!",
  },
]

export default function JinxWelcome() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("wace-welcome-seen")
    if (!hasSeenWelcome) {
      setIsVisible(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem("wace-welcome-seen", "true")
      setIsVisible(false)
      router.push("/simulator")
    }
  }

  const handleClose = () => {
    localStorage.setItem("wace-welcome-seen", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  const currentStepData = welcomeSteps[currentStep]
  const isLastStep = currentStep === welcomeSteps.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Welcome popup */}
      <div className="relative bg-black border border-electricBlue/20 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl">
        <button onClick={handleClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🦊</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h2>
          </div>

          <div className="mb-8">
            <p className="text-white text-lg leading-relaxed mb-4">{currentStepData.message}</p>
            <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{currentStepData.subtitle}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {welcomeSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-electricBlue" : "bg-white/30"}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-electricBlue text-black px-6 py-2 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors"
            >
              {isLastStep ? "Let's Start!" : "Next"}
            </button>
          </div>
        </div>
      </div>

      {/* Jinx character in bottom-left */}
      <div className="fixed bottom-8 left-8 w-24 h-24 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <span className="text-5xl">🦊</span>
      </div>
    </div>
  )
}
