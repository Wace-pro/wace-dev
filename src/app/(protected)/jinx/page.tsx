"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Send, Paperclip, Smile } from "lucide-react"

export default function Jinx() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "jinx",
      content: "Hey there! I'm JINX, your AI startup companion. How can I help you build your dream startup today?",
      timestamp: "10:30 AM",
    },
  ])

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

    // Simulate JINX response
    setTimeout(() => {
      const jinxResponse = {
        id: messages.length + 2,
        sender: "jinx",
        content:
          "That's a great question! Let me help you with that. Based on what you've shared, I'd recommend focusing on...",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, jinxResponse])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Chat Header */}
        <div className="bg-black border border-electricBlue/20 rounded-t-xl p-4 flex items-center space-x-3">
          <div className="w-12 h-12 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🦊</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">JINX AI Guide</h1>
            <p className="text-electricBlue text-sm">Your startup companion • Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-black border-l border-r border-electricBlue/20 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                {msg.sender === "jinx" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">🦊</span>
                    </div>
                    <span className="text-xs text-white/60">JINX</span>
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
                placeholder="Type your message to JINX..."
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
