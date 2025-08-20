"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import JinxChatPopup from "@/components/JinxChatPopup"
import { Gamepad2, Lightbulb, TrendingUp, DollarSign, Users, Palette, Megaphone, ArrowRight } from "lucide-react"

// Startup Simulator page - test startup ideas and transfer to JINX
export default function Simulator() {
  const [idea, setIdea] = useState("")
  const [isSimulating, setIsSimulating] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [isJinxChatOpen, setIsJinxChatOpen] = useState(false)

  const handleStartSimulation = () => {
    if (!idea.trim()) return
    setIsSimulating(true)
    // Simulate processing
    setTimeout(() => {
      setIsSimulating(false)
      setShowPlan(true)
    }, 3000)
  }

  const transferToJinx = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      setIsJinxChatOpen(true)
    }, 2000)
  }

  const businessPlan = [
    {
      title: "Branding Strategy",
      description: "Develop a strong brand identity and positioning",
      icon: Palette,
      tasks: ["Logo design", "Brand guidelines", "Voice & tone"],
    },
    {
      title: "Marketing Plan",
      description: "Create awareness and attract customers",
      icon: Megaphone,
      tasks: ["Social media strategy", "Content marketing", "SEO optimization"],
    },
    {
      title: "Product Development",
      description: "Build and iterate your core product",
      icon: Lightbulb,
      tasks: ["MVP development", "User testing", "Feature roadmap"],
    },
    {
      title: "Financial Planning",
      description: "Manage finances and plan for growth",
      icon: DollarSign,
      tasks: ["Revenue projections", "Cost analysis", "Funding strategy"],
    },
    {
      title: "Team Building",
      description: "Recruit and manage your team",
      icon: Users,
      tasks: ["Hiring plan", "Team structure", "Culture development"],
    },
    {
      title: "Growth Strategy",
      description: "Scale your business effectively",
      icon: TrendingUp,
      tasks: ["Market expansion", "Partnership opportunities", "Scaling operations"],
    },
  ]

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Startup Simulator</h1>
          <p className="text-white/60">Test your startup ideas in a risk-free environment</p>
        </div>

        {!isSimulating && !showPlan && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-black border border-electricBlue/20 rounded-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-10 h-10 text-electricBlue" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Enter Your Startup Idea</h2>
                <p className="text-white/60">Describe your business concept and we'll simulate its potential</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">What's your startup idea?</label>
                  <textarea
                    className="bg-black border border-electricBlue/20 text-white px-4 py-3 rounded-lg focus:border-electricBlue focus:outline-none w-full h-32 resize-none"
                    placeholder="Describe your startup idea in detail..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleStartSimulation}
                  disabled={!idea.trim()}
                  className="bg-electricBlue text-black px-6 py-3 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Simulation
                </button>
              </div>
            </div>
          </div>
        )}

        {isSimulating && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <Gamepad2 className="w-8 h-8 text-electricBlue" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Simulating Your Startup...</h2>
              <p className="text-white/60">Analyzing market potential, competition, and growth projections</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black border border-electricBlue/20 rounded-lg p-6 text-center">
                <Lightbulb className="w-8 h-8 text-electricBlue mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Market Analysis</h3>
                <div className="w-full bg-black border border-electricBlue/20 rounded-full h-2">
                  <div className="bg-electricBlue h-2 rounded-full animate-pulse" style={{ width: "60%" }} />
                </div>
              </div>

              <div className="bg-black border border-electricBlue/20 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-electricBlue mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Growth Potential</h3>
                <div className="w-full bg-black border border-electricBlue/20 rounded-full h-2">
                  <div className="bg-electricBlue h-2 rounded-full animate-pulse" style={{ width: "80%" }} />
                </div>
              </div>

              <div className="bg-black border border-electricBlue/20 rounded-lg p-6 text-center">
                <DollarSign className="w-8 h-8 text-electricBlue mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Revenue Forecast</h3>
                <div className="w-full bg-black border border-electricBlue/20 rounded-full h-2">
                  <div className="bg-electricBlue h-2 rounded-full animate-pulse" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {showPlan && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Your Startup Plan</h2>
              <p className="text-white/60">Here's a comprehensive plan based on your idea</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {businessPlan.map((section, index) => {
                const Icon = section.icon
                return (
                  <div key={index} className="bg-black border border-electricBlue/20 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-electricBlue/10 border border-electricBlue/20 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-electricBlue" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm mb-4">{section.description}</p>
                    <ul className="space-y-2">
                      {section.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-white/70 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-electricBlue rounded-full mr-2"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <button
                onClick={transferToJinx}
                className="bg-electricBlue text-black px-8 py-3 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors flex items-center mx-auto"
              >
                Transfer to JINX
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-black border border-electricBlue/20 rounded-lg p-4 flex items-center space-x-3 z-50">
            <span className="text-2xl">🦊</span>
            <div>
              <p className="text-white font-medium">Transferred to JINX</p>
              <p className="text-white/60 text-sm">Your plan has been sent to JINX for further assistance</p>
            </div>
          </div>
        )}

        {/* JINX Chat Popup */}
        <JinxChatPopup
          isOpen={isJinxChatOpen}
          onClose={() => setIsJinxChatOpen(false)}
          initialMessage="Cool project! I've reviewed your startup plan and I'm excited to help you get started. Are you ready to dive deeper into building your startup, founder? 🚀"
        />
      </div>
    </Layout>
  )
}
