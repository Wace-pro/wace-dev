"use client"

import { useState, useEffect } from "react"
import { X, Maximize2, Send, Paperclip, Smile } from "lucide-react"
import { useRouter } from "next/navigation"

// JINX Chat Popup - small floating chat window that can be maximized
interface JinxChatPopupProps {
  isOpen: boolean
  onClose: () => void
  initialMessage?: string
}

export default function JinxChatPopup({ isOpen, onClose, initialMessage }: JinxChatPopupProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "jinx",
      content: "Hey there! I'm JINX, your AI startup companion. How can I help you build your dream startup today?",
      timestamp: "10:30 AM",
    },
  ])
  const router = useRouter()

  useEffect(() => {
    if (initialMessage && isOpen) {
      const transferMessage = {
        id: messages.length + 1,
        sender: "jinx",
        content: initialMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, transferMessage])
    }
  }, [initialMessage, isOpen])

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

  const handleMaximize = () => {
    onClose()
    router.push("/jinx")
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-black border border-electricBlue/20 rounded-xl shadow-2xl z-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-black border-b border-electricBlue/20 rounded-t-xl p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🦊</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">JINX AI Guide</h3>
            <p className="text-xs text-electricBlue">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleMaximize}
            className="text-white/60 hover:text-electricBlue p-1 rounded"
            title="Maximize"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs ${msg.sender === "user" ? "order-2" : "order-1"}`}>
              {msg.sender === "jinx" && (
                <div className="flex items-center space-x-1 mb-1">
                  <div className="w-4 h-4 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">🦊</span>
                  </div>
                  <span className="text-xs text-white/60">JINX</span>
                </div>
              )}
              <div
                className={`rounded-lg p-2 ${
                  msg.sender === "user"
                    ? "bg-electricBlue text-black"
                    : "bg-black border border-electricBlue/20 text-white"
                }`}
              >
                <p className="text-xs">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-black/60" : "text-white/60"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-black border-t border-electricBlue/20 rounded-b-xl p-3">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type to JINX..."
              className="w-full bg-black border border-electricBlue/20 text-white px-3 py-2 pr-16 rounded-lg focus:border-electricBlue focus:outline-none text-sm"
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button className="text-white/60 hover:text-electricBlue p-1">
                <Paperclip className="w-3 h-3" />
              </button>
              <button className="text-white/60 hover:text-electricBlue p-1">
                <Smile className="w-3 h-3" />
              </button>
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-electricBlue text-black p-2 rounded-lg hover:bg-electricBlue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
