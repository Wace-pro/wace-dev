"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/Layout"
import { Send, Paperclip, Smile } from "lucide-react"

// Individual consultant chat page - full screen chat experience
export default function ConsultantChat({ params }: { params: { id: string } }) {
  const [consultant, setConsultant] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

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

  useEffect(() => {
    // Find consultant by ID or get from localStorage
    const consultantId = Number.parseInt(params.id)
    const foundConsultant = consultants.find((c) => c.id === consultantId)

    if (foundConsultant) {
      setConsultant(foundConsultant)
      setMessages([
        {
          id: 1,
          sender: "consultant",
          content: `Hi! I'm ${foundConsultant.name}. I specialize in ${foundConsultant.specialty.toLowerCase()}. How can I help you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }
  }, [params.id])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate consultant response
    setTimeout(() => {
      const consultantResponse = {
        id: messages.length + 2,
        sender: "consultant",
        content: `That's a great question! Based on my experience in ${consultant.specialty.toLowerCase()}, I'd recommend...`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, consultantResponse])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!consultant) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-white">Loading consultant...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Chat Header */}
        <div className="bg-black border border-electricBlue/20 rounded-t-xl p-4 flex items-center space-x-3">
          <div className="w-12 h-12 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">{consultant.avatar}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{consultant.name}</h1>
            <p className="text-electricBlue text-sm">{consultant.specialty} • Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-black border-l border-r border-electricBlue/20 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                {msg.sender === "consultant" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">{consultant.avatar}</span>
                    </div>
                    <span className="text-xs text-white/60">{consultant.name}</span>
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-electricBlue text-black"
                      : "bg-black border border-electricBlue/20 text-white"
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

        {/* Chat Input */}
        <div className="bg-black border border-electricBlue/20 rounded-b-xl p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type your message to ${consultant.name}...`}
                className="w-full bg-black border border-electricBlue/20 text-white px-4 py-3 pr-20 rounded-lg focus:border-electricBlue focus:outline-none resize-none"
                rows={1}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button className="text-white/60 hover:text-electricBlue p-1">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="text-white/60 hover:text-electricBlue p-1">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="bg-electricBlue text-black p-3 rounded-lg hover:bg-electricBlue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
