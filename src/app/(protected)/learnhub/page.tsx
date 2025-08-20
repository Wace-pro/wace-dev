"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Clock } from "lucide-react"
import VideoPlayer from "@/components/VideoPlayer"

// LearnHub page with category filtering
export default function LearnHub() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)

  const categories = [
    { id: "all", name: "All" },
    { id: "branding", name: "Branding" },
    { id: "finance", name: "Finance" },
    { id: "legal", name: "Legal" },
    { id: "marketing", name: "Marketing" },
  ]

  const allCourses = [
    {
      title: "Startup Fundamentals",
      description: "Learn the basics of starting a business",
      duration: "2 hours",
      category: "branding",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Market Validation",
      description: "Validate your business idea before launch",
      duration: "3 hours",
      category: "marketing",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Product Development",
      description: "Build products that customers love",
      duration: "4 hours",
      category: "branding",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Fundraising Basics",
      description: "Raise capital for your startup",
      duration: "2.5 hours",
      category: "finance",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Legal Structure for Startups",
      description: "Choose the right legal structure for your business",
      duration: "1.5 hours",
      category: "legal",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Financial Modeling",
      description: "Create financial projections for your startup",
      duration: "3 hours",
      category: "finance",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Intellectual Property",
      description: "Protect your ideas and innovations",
      duration: "2 hours",
      category: "legal",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
    {
      title: "Digital Marketing Strategy",
      description: "Reach your target audience online",
      duration: "3.5 hours",
      category: "marketing",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Course",
    },
  ]

  // Filter courses based on active category
  const filteredCourses =
    activeCategory === "all" ? allCourses : allCourses.filter((course) => course.category === activeCategory)

  const openVideoPlayer = (course) => {
    setSelectedCourse(course)
    setIsVideoPlayerOpen(true)
  }

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false)
    setSelectedCourse(null)
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">LearnHub</h1>
          <p className="text-gray-400">Master the skills you need to build a successful startup</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-electricBlue text-black"
                  : "bg-black border border-electricBlue/20 text-white hover:bg-electricBlue/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => (
            <div key={index}>
              <div className="bg-black border border-electricBlue/20 rounded-lg overflow-hidden hover:border-electricBlue/50 transition-colors">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                    <span className="text-xs bg-electricBlue/10 text-electricBlue px-2 py-1 rounded-full capitalize">
                      {course.category}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{course.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-white/60">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <button
                      onClick={() => openVideoPlayer(course)}
                      className="bg-electricBlue text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-electricBlue/90 transition-colors"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when no courses match the filter */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No courses found in this category.</p>
          </div>
        )}

        {/* Video Player */}
        {selectedCourse && (
          <VideoPlayer isOpen={isVideoPlayerOpen} onClose={closeVideoPlayer} course={selectedCourse} />
        )}
      </div>
    </Layout>
  )
}
