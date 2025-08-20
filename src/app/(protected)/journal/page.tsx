"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { BookMarked, Save, Calendar, X, MessageCircle } from "lucide-react"

// Journal page with mood selection, entry popup, and JINX mood responses
export default function Journal() {
  const [entry, setEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [jinxMessage, setJinxMessage] = useState(null)
  const [entries, setEntries] = useState([
    {
      date: "2024-01-15",
      title: "First Day at WACE",
      content:
        "Started my journey on WACE today. Excited to learn and build my startup idea! The platform looks amazing and I can't wait to explore all the features.",
      mood: "😊",
    },
    {
      date: "2024-01-14",
      title: "Market Research Insights",
      content:
        "Discovered some interesting trends in the AI market. Need to validate my assumptions and do more research on competitor analysis.",
      mood: "🤔",
    },
    {
      date: "2024-01-13",
      title: "Brainstorming Session",
      content:
        "Had a great brainstorming session today. Came up with several new ideas for my startup. Feeling very motivated and ready to take action!",
      mood: "🚀",
    },
  ])

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😤", label: "Frustrated" },
    { emoji: "🤔", label: "Thoughtful" },
    { emoji: "🚀", label: "Motivated" },
    { emoji: "😴", label: "Tired" },
    { emoji: "🎉", label: "Excited" },
    { emoji: "😰", label: "Stressed" },
  ]

  // JINX responses based on mood
  const getJinxResponse = (moodEmoji) => {
    const responses = {
      "😊": {
        message:
          "Hi there! I see you're feeling happy today! 😊 That's wonderful! Good vibes lead to great ideas. Keep that positive energy flowing!",
        action: "Want to channel this happiness into your startup? Let's chat!",
      },
      "😔": {
        message:
          "Hi, I see that you're feeling sad today. 😔 That's totally okay - every entrepreneur has tough days. Wanna have a quick chat about what's bothering you?",
        action: "I'm here to listen and help you feel better!",
      },
      "😤": {
        message:
          "I can see you're feeling frustrated right now. 😤 Frustration often means you care deeply about your goals. Let's talk through what's challenging you!",
        action: "Sometimes a fresh perspective can turn frustration into breakthrough!",
      },
      "🤔": {
        message:
          "I see you're in a thoughtful mood today! 🤔 Deep thinking is the foundation of great startups. What's on your mind, founder?",
        action: "Let's explore those thoughts together and turn them into action!",
      },
      "🚀": {
        message:
          "Wow! I love seeing that motivated energy! 🚀 You're fired up and ready to conquer the startup world. This is exactly the mindset that builds successful companies!",
        action: "Let's harness this motivation and make some real progress!",
      },
      "😴": {
        message:
          "I see you're feeling tired today. 😴 Rest is just as important as hustle in the startup journey. Even the best entrepreneurs need to recharge!",
        action: "Want some tips on managing energy while building your startup?",
      },
      "🎉": {
        message:
          "Amazing! You're feeling excited! 🎉 I love this energy! Excitement is contagious and it's exactly what you need to inspire others to join your vision!",
        action: "Let's celebrate and use this excitement to fuel your next big move!",
      },
      "😰": {
        message:
          "I can see you're feeling stressed. 😰 Stress is common in the startup world, but you don't have to handle it alone. Let's talk about what's weighing on you.",
        action: "I can help you break down challenges into manageable steps!",
      },
    }
    return (
      responses[moodEmoji] || {
        message: "Thanks for sharing your mood with me! Every feeling is valid on this entrepreneurial journey.",
        action: "Want to chat about how you're feeling today?",
      }
    )
  }

  const handleSave = () => {
    if (!entry.trim() || !selectedMood) return

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      title: `Entry ${entries.length + 1}`,
      content: entry,
      mood: selectedMood,
    }

    setEntries([newEntry, ...entries])

    // Show JINX response based on mood
    const jinxResponse = getJinxResponse(selectedMood)
    setJinxMessage(jinxResponse)

    // Reset form
    setEntry("")
    setSelectedMood("")
  }

  const openEntry = (entryData) => {
    setSelectedEntry(entryData)
  }

  const closeEntry = () => {
    setSelectedEntry(null)
  }

  const closeJinxMessage = () => {
    setJinxMessage(null)
  }

  const startChatWithJinx = () => {
    setJinxMessage(null)
    // Redirect to JINX chat page
    window.location.href = "/jinx"
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Startup Journal</h1>
          <p className="text-gray-400">Document your entrepreneurial journey and insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Entry */}
          <div className="bg-black border border-electricBlue/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BookMarked className="w-6 h-6 text-electricBlue mr-3" />
              <h2 className="text-xl font-semibold text-white">New Entry</h2>
            </div>

            <div className="space-y-4">
              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">How are you feeling?</label>
                <div className="grid grid-cols-4 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.emoji}
                      onClick={() => setSelectedMood(mood.emoji)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedMood === mood.emoji
                          ? "border-electricBlue bg-electricBlue/10"
                          : "border-gray-600 hover:border-electricBlue/50"
                      }`}
                      title={mood.label}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className="input-field w-full h-48 resize-none"
                placeholder="What did you learn today? What challenges did you face? What are your next steps?"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />

              <button
                onClick={handleSave}
                disabled={!entry.trim() || !selectedMood}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </button>
            </div>
          </div>

          {/* Previous Entries */}
          <div className="bg-black border border-electricBlue/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Previous Entries</h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.map((entry, index) => (
                <button
                  key={index}
                  onClick={() => openEntry(entry)}
                  className="w-full bg-black border border-gray-600 rounded-lg p-4 hover:border-electricBlue/50 transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{entry.mood}</span>
                      <h3 className="font-medium text-white">{entry.title}</h3>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {entry.date}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm truncate">{entry.content}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Entry Popup */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-electricBlue/20 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-electricBlue/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedEntry.mood}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedEntry.title}</h2>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedEntry.date}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeEntry}
                  className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-electricBlue/5 border border-electricBlue/20 rounded-lg p-4">
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedEntry.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* JINX Mood Response Popup */}
        {jinxMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-electricBlue/20 rounded-xl max-w-md w-full">
              <div className="flex items-center justify-between p-4 border-b border-electricBlue/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-electricBlue/10 border border-electricBlue/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🦊</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">JINX</h3>
                    <p className="text-electricBlue text-sm">Your AI Companion</p>
                  </div>
                </div>
                <button
                  onClick={closeJinxMessage}
                  className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-electricBlue/5 border border-electricBlue/20 rounded-lg p-4">
                  <p className="text-white text-sm leading-relaxed">{jinxMessage.message}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={startChatWithJinx}
                    className="bg-electricBlue text-black px-4 py-3 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {jinxMessage.action}
                  </button>
                  <button
                    onClick={closeJinxMessage}
                    className="bg-transparent border border-electricBlue/20 text-electricBlue px-4 py-2 rounded-lg font-medium hover:bg-electricBlue/10 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
