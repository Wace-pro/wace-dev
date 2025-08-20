"use client"
import { useState } from "react"
import Layout from "@/components/Layout"
import JinxWelcome from "@/components/JinxWelcome"
import JinxChatPopup from "@/components/JinxChatPopup"
import { ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import VideoPlayer from "@/components/VideoPlayer"
import { useWCP } from "@/hooks/useWCP"

// Dashboard page - main user dashboard with JINX chat popup functionality
export default function Dashboard() {
  const [isJinxChatOpen, setIsJinxChatOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)
  // const { wcp } = useWCP()
  const router = useRouter()

  const recentCourses = [
    {
      title: "Business Strategy Fundamentals",
      duration: "2h 30m",
      category: "branding",
      thumbnail: "/placeholder.svg?height=60&width=80",
      progress: 65,
    },
    {
      title: "Legal Structure for Startups",
      duration: "1h 45m",
      category: "legal",
      thumbnail: "/placeholder.svg?height=60&width=80",
      progress: 30,
    },
    {
      title: "Financial Planning Basics",
      duration: "3h 15m",
      category: "finance",
      thumbnail: "/placeholder.svg?height=60&width=80",
      progress: 80,
    },
  ]

  const recentTools = [
    { name: "Business Name Generator", timeAgo: "1 hour ago" },
    { name: "Logo Generator", timeAgo: "2 days ago" },
    { name: "Mission Statement Generator", timeAgo: "1 week ago" },
  ]

  const handleContinueCourse = (course:any) => {
    setSelectedCourse(course)
    setIsVideoPlayerOpen(true)
  }

  const handleUseTool = (toolName:any) => {
    // Navigate to ToolHub and open specific tool
    localStorage.setItem("open-tool", toolName.toLowerCase().replace(/\s+/g, "-"))
    router.push("/toolhub")
  }

  const handleResumeAISession = (consultantName:any) => {
    // Navigate to consultants and open specific consultant
    const consultantId = consultantName === "MarketMind" ? "2" : "1" // Map to consultant IDs
    router.push(`/consultants/${consultantId}`)
  }

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false)
    setSelectedCourse(null)
  }

  return (
    <>
      <JinxWelcome />
      <Layout>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
          {/* Main Content - Left Side */}
          <div className="xl:col-span-3 space-y-6">
            {/* Welcome Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-electricBlue rounded-full flex items-center justify-center text-black font-semibold">
                  U
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                  <p className="text-white/60">Ready to level up your skills today?</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-electricBlue">⭐</span>
                  <span className="text-white font-semibold">Level 3</span>
                  <span className="text-white/60 text-sm">750 / 1000 XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-electricBlue">🪙</span>
                  {/* <span className="text-electricBlue font-semibold">{wcp} WCP</span> */}
                  <span className="text-electricBlue font-semibold">5 WCP</span>
                </div>
              </div>
            </div>

            {/* Recent Courses */}
            <div className="bg-black border border-electricBlue/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-electricBlue text-xl">📚</span>
                  <h2 className="text-xl font-semibold text-white">Recent Courses</h2>
                </div>
                <Link
                  href="/learnhub"
                  className="flex items-center text-electricBlue hover:text-electricBlue/80 transition-colors"
                >
                  <span className="mr-2">View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-black border border-electricBlue/10 rounded-lg p-4 flex items-center justify-between hover:border-electricBlue/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src="/placeholder.svg?height=60&width=80&text=Course"
                        alt={course.title}
                        className="w-16 h-12 rounded-lg object-cover bg-electricBlue/10 border border-electricBlue/20"
                      />
                      <div>
                        <h3 className="text-white font-medium">{course.title}</h3>
                        <p className="text-white/60 text-sm">
                          {course.duration} • {course.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleContinueCourse(course)}
                      className="bg-electricBlue text-black px-6 py-2 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent AI Sessions */}
            <div className="bg-black border border-electricBlue/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-electricBlue text-xl">💬</span>
                <h2 className="text-xl font-semibold text-white">Recent AI Sessions</h2>
              </div>

              <div className="bg-black border border-electricBlue/10 rounded-lg p-4 flex items-center justify-between hover:border-electricBlue/30 transition-colors">
                <div>
                  <h3 className="text-white font-medium">MarketMind</h3>
                  <p className="text-white/60 text-sm">Marketing Strategy • 2 hours ago</p>
                </div>
                <button
                  onClick={() => handleResumeAISession("MarketMind")}
                  className="bg-electricBlue text-black px-6 py-2 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* JINX AI Guide */}
            <div className="bg-black border border-electricBlue/20 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-electricBlue/10 border border-electricBlue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🦊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">JINX AI Guide</h3>
              <p className="text-white/60 text-sm mb-4">Your startup companion</p>
              <button
                onClick={() => setIsJinxChatOpen(true)}
                className="w-full bg-electricBlue text-black py-3 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </button>
            </div>

            {/* Recent Tools */}
            <div className="bg-black border border-electricBlue/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-electricBlue text-xl">🔧</span>
                <h2 className="text-lg font-semibold text-white">Recent Tools</h2>
              </div>

              <div className="space-y-4">
                {recentTools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{tool.name}</p>
                      <p className="text-white/60 text-xs">{tool.timeAgo}</p>
                    </div>
                    <button
                      onClick={() => handleUseTool(tool.name)}
                      className="bg-electricBlue/10 border border-electricBlue/20 text-electricBlue px-3 py-1 rounded text-xs hover:bg-electricBlue/20 transition-colors"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* JINX Chat Popup */}
      <JinxChatPopup isOpen={isJinxChatOpen} onClose={() => setIsJinxChatOpen(false)} />

      {/* Video Player */}
      {selectedCourse && <VideoPlayer isOpen={isVideoPlayerOpen} onClose={closeVideoPlayer} course={selectedCourse} />}
    </>
  )
}
