"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { MessageCircle, X, Send, Maximize2 } from "lucide-react"
import { useRouter } from "next/navigation"

// AI Consultants page - chat with AI consultants with popup and maximize functionality
export default function Consultants() {
  const [selectedConsultant, setSelectedConsultant] = useState(null)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState({})
  const [isPopupMode, setIsPopupMode] = useState(false)
  const router = useRouter()

  const consultants = [
    {
      id: 1,
      name: "Alex Chen",
      specialty: "Tech Startups",
      avatar: "👨‍💻",
      description: "Former Silicon Valley CTO with 10+ years experience",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "Marketing & Growth",
      avatar: "👩‍💼",
      description: "Growth hacker who scaled 5 startups to $10M+ revenue",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      specialty: "Fundraising",
      avatar: "👨‍💼",
      description: "Investment banker turned startup advisor",
    },
    {
      id: 4,
      name: "Emma Thompson",
      specialty: "Product Strategy",
      avatar: "👩‍🎨",
      description: "Product manager at top unicorn startups",
    },
  ]

  const openChat = (consultant, popup = false) => {
    setSelectedConsultant(consultant)
    setIsPopupMode(popup)
    // Initialize chat if it doesn't exist
    if (!chatMessages[consultant.id]) {
      setChatMessages((prev) => ({
        ...prev,
        [consultant.id]: [
          {
            id: 1,
            sender: "consultant",
            content: `Hi! I'm ${consultant.name}. I specialize in ${consultant.specialty.toLowerCase()}. How can I help you today?`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }))
    }
  }

  const closeChat = () => {
    setSelectedConsultant(null)
    setIsPopupMode(false)
    setChatMessage("")
  }

  const handleMaximize = () => {
    setIsPopupMode(false)
    // Store the selected consultant in localStorage for the dedicated page
    localStorage.setItem("selected-consultant", JSON.stringify(selectedConsultant))
    router.push(`/consultants/${selectedConsultant.id}`)
  }

  const sendMessage = () => {
    if (!chatMessage.trim() || !selectedConsultant) return

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Add user message
    setChatMessages((prev) => ({
      ...prev,
      [selectedConsultant.id]: [...(prev[selectedConsultant.id] || []), newMessage],
    }))

    setChatMessage("")

    // Simulate consultant response
    setTimeout(() => {
      const consultantResponse = {
        id: Date.now() + 1,
        sender: "consultant",
        content: `That's a great question! Based on my experience in ${selectedConsultant.specialty.toLowerCase()}, I'd recommend...`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => ({
        ...prev,
        [selectedConsultant.id]: [...(prev[selectedConsultant.id] || []), consultantResponse],
      }))
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const ChatWindow = ({ isPopup = false }) => (
    <div
      className={`${
        isPopup
          ? "fixed bottom-4 right-4 w-80 h-96 shadow-2xl z-50"
          : "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      }`}
    >
      <div
        className={`bg-black border border-electricBlue/20 rounded-xl flex flex-col ${
          isPopup ? "h-full" : "w-full max-w-2xl h-96"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-electricBlue/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
              {selectedConsultant.avatar}
            </div>
            <div>
              <h3 className="text-white font-semibold">{selectedConsultant.name}</h3>
              <p className="text-electricBlue text-sm">{selectedConsultant.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {isPopup && (
              <button
                onClick={handleMaximize}
                className="text-white/60 hover:text-electricBlue p-1 rounded"
                title="Maximize"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
            <button onClick={closeChat} className="text-white/60 hover:text-white p-1 rounded" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {(chatMessages[selectedConsultant.id] || []).map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-electricBlue text-black"
                      : "bg-electricBlue/10 border border-electricBlue/20 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-black/60" : "text-white/60"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-electricBlue/20">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-black border border-electricBlue/20 text-white px-3 py-2 rounded-lg focus:border-electricBlue focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-electricBlue text-black px-4 py-2 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Consultants</h1>
          <p className="text-white/60">Get personalized advice from expert AI consultants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultants.map((consultant, index) => (
            <div
              key={index}
              className="bg-black border border-electricBlue/20 rounded-lg p-6 hover:border-electricBlue/50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center text-2xl">
                  {consultant.avatar}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{consultant.name}</h3>
                  <p className="text-electricBlue text-sm font-medium mb-2">{consultant.specialty}</p>
                  <p className="text-white/60 text-sm mb-4">{consultant.description}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openChat(consultant, true)}
                      className="bg-electricBlue text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-electricBlue/90 transition-colors flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        {selectedConsultant && <ChatWindow isPopup={isPopupMode} />}
      </div>
    </Layout>
  )
}
