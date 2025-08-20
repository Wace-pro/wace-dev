"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Lightbulb, Palette, Target, Presentation, Lock, Check } from "lucide-react"
import { useWCP } from "@/hooks/useWCP"

// ToolHub page with WCP pricing and unlock system
export default function ToolHub() {
  const [selectedTool, setSelectedTool] = useState(null)
  const { wcp, spendWCP } = useWCP()
  const [unlockedTools, setUnlockedTools] = useState(["business-name", "logo-creator"])
  const [showUnlockMessage, setShowUnlockMessage] = useState(null)

  const tools = [
    {
      id: "business-name",
      name: "Business Name Generator",
      description: "Generate creative and memorable business names with AI assistance",
      icon: Lightbulb,
      cost: 0, // Free tool
    },
    {
      id: "logo-creator",
      name: "Business Logo Creator",
      description: "Design professional logos for your startup",
      icon: Palette,
      cost: 0, // Free tool
    },
    {
      id: "mission-vision",
      name: "Mission & Vision Generator",
      description: "Create compelling mission statements and vision for your company",
      icon: Target,
      cost: 50,
    },
    {
      id: "pitch-deck",
      name: "Pitch Deck Creator",
      description: "Build compelling investor presentations",
      icon: Presentation,
      cost: 100,
    },
  ]

  const handleToolClick = (tool) => {
    // If tool is free or already unlocked, open it directly
    if (tool.cost === 0 || unlockedTools.includes(tool.id)) {
      setSelectedTool(tool)
      return
    }

    // Check if user has enough WCP to unlock
    if (wcp >= tool.cost) {
      // Show unlock confirmation
      setShowUnlockMessage({
        tool,
        canUnlock: true,
        message: `Unlock ${tool.name} for ${tool.cost} WCP?`,
      })
    } else {
      // Show insufficient funds message
      setShowUnlockMessage({
        tool,
        canUnlock: false,
        message: `You need ${tool.cost - wcp} more WCP to unlock ${tool.name}`,
      })
    }
  }

  const unlockTool = (tool) => {
    if (spendWCP(tool.cost)) {
      setUnlockedTools([...unlockedTools, tool.id])
      setShowUnlockMessage(null)
      setSelectedTool(tool)

      // Show success message briefly
      setTimeout(() => {
        setShowUnlockMessage({
          tool,
          canUnlock: true,
          message: `${tool.name} unlocked successfully!`,
          isSuccess: true,
        })
        setTimeout(() => setShowUnlockMessage(null), 2000)
      }, 100)
    }
  }

  const closeTool = () => {
    setSelectedTool(null)
  }

  const closeUnlockMessage = () => {
    setShowUnlockMessage(null)
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">ToolHub</h1>
            <p className="text-gray-400">AI-powered tools to accelerate your startup journey</p>
          </div>
          <div className="flex items-center space-x-2 bg-black border border-electricBlue/20 rounded-lg px-4 py-2">
            <span className="text-electricBlue text-lg">🪙</span>
            <span className="text-electricBlue font-semibold">{wcp} WCP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            const isUnlocked = tool.cost === 0 || unlockedTools.includes(tool.id)
            const canAfford = wcp >= tool.cost

            return (
              <div
                key={index}
                className={`bg-black border border-electricBlue/20 rounded-lg p-6 hover:border-electricBlue transition-colors cursor-pointer relative ${
                  !isUnlocked ? "opacity-90" : ""
                }`}
                onClick={() => handleToolClick(tool)}
              >
                {/* Lock overlay for locked tools */}
                {!isUnlocked && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-black border border-electricBlue/30 rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-electricBlue" />
                    </div>
                  </div>
                )}

                {/* Unlocked indicator */}
                {isUnlocked && tool.cost > 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-electricBlue rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-electricBlue rounded-lg flex items-center justify-center ${!isUnlocked ? "opacity-60" : ""}`}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tool.description}</p>

                <div className="flex items-center justify-end">
                  {tool.cost === 0 ? (
                    <button className="text-sm px-4 py-2 rounded-lg font-medium transition-colors bg-electricBlue text-black hover:bg-electricBlue/90">
                      Use Tool
                    </button>
                  ) : isUnlocked ? (
                    <button className="text-sm px-4 py-2 rounded-lg font-medium transition-colors bg-electricBlue text-black hover:bg-electricBlue/90">
                      Use Tool
                    </button>
                  ) : (
                    <button
                      className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                        canAfford
                          ? "bg-electricBlue/20 border border-electricBlue text-electricBlue hover:bg-electricBlue/30"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {tool.cost} WCP
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Unlock Confirmation Modal */}
        {showUnlockMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-electricBlue/20 rounded-xl max-w-md w-full p-6">
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    showUnlockMessage.isSuccess
                      ? "bg-green-500/20 border border-green-500/30"
                      : showUnlockMessage.canUnlock
                        ? "bg-electricBlue/20 border border-electricBlue/30"
                        : "bg-red-500/20 border border-red-500/30"
                  }`}
                >
                  {showUnlockMessage.isSuccess ? (
                    <Check className="w-8 h-8 text-green-500" />
                  ) : showUnlockMessage.canUnlock ? (
                    <Lock className="w-8 h-8 text-electricBlue" />
                  ) : (
                    <Lock className="w-8 h-8 text-red-500" />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {showUnlockMessage.isSuccess
                    ? "Success!"
                    : showUnlockMessage.canUnlock
                      ? "Unlock Tool"
                      : "Insufficient WCP"}
                </h3>

                <p className="text-white/70 mb-6">{showUnlockMessage.message}</p>

                {!showUnlockMessage.isSuccess && (
                  <div className="flex space-x-3">
                    <button
                      onClick={closeUnlockMessage}
                      className="flex-1 bg-transparent border border-electricBlue/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-electricBlue/10 transition-colors"
                    >
                      Cancel
                    </button>

                    {showUnlockMessage.canUnlock && (
                      <button
                        onClick={() => unlockTool(showUnlockMessage.tool)}
                        className="flex-1 bg-electricBlue text-black px-4 py-2 rounded-lg font-medium hover:bg-electricBlue/90 transition-colors"
                      >
                        Unlock ({showUnlockMessage.tool.cost} WCP)
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tool Interfaces */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-electricBlue/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedTool.id === "business-name" && <BusinessNameGenerator onClose={closeTool} />}
              {selectedTool.id === "logo-creator" && <LogoCreator onClose={closeTool} />}
              {selectedTool.id === "mission-vision" && <MissionVisionGenerator onClose={closeTool} />}
              {selectedTool.id === "pitch-deck" && <PitchDeckCreator onClose={closeTool} />}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Business Name Generator Component
function BusinessNameGenerator({ onClose }) {
  const [industry, setIndustry] = useState("")
  const [keywords, setKeywords] = useState("")
  const [style, setStyle] = useState("")
  const [generatedNames, setGeneratedNames] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNames = () => {
    if (!industry || !keywords) return

    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      const sampleNames = [
        "TechFlow Solutions",
        "InnovateLab",
        "NextGen Dynamics",
        "SmartBridge Co",
        "FutureScope",
        "VelocityWorks",
        "PrimeTech Hub",
        "ElevateCore",
      ]
      setGeneratedNames(sampleNames)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-electricBlue rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Business Name Generator</h2>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="input-field w-full">
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="input-field w-full"
              placeholder="Enter keywords (e.g., smart, fast, innovative)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="input-field w-full">
              <option value="">Select Style</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="creative">Creative</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <button
            onClick={generateNames}
            disabled={!industry || !keywords || isGenerating}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate Names"}
          </button>
        </div>

        <div className="bg-electricBlue/5 border border-electricBlue/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Generated Names</h3>
          {generatedNames.length > 0 ? (
            <div className="space-y-2">
              {generatedNames.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-black border border-electricBlue/20 rounded-lg p-3"
                >
                  <span className="text-white">{name}</span>
                  <button className="text-electricBlue hover:text-electricBlue/80 text-sm">Save</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60">Fill in the details and click generate to see name suggestions</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Logo Creator Component
function LogoCreator({ onClose }) {
  const [companyName, setCompanyName] = useState("")
  const [logoStyle, setLogoStyle] = useState("")
  const [colorScheme, setColorScheme] = useState("")
  const [generatedLogos, setGeneratedLogos] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateLogos = () => {
    if (!companyName || !logoStyle) return

    setIsGenerating(true)
    setTimeout(() => {
      const sampleLogos = [
        { id: 1, style: "Modern", preview: "/placeholder.svg?height=100&width=100&text=Logo1" },
        { id: 2, style: "Minimalist", preview: "/placeholder.svg?height=100&width=100&text=Logo2" },
        { id: 3, style: "Creative", preview: "/placeholder.svg?height=100&width=100&text=Logo3" },
        { id: 4, style: "Professional", preview: "/placeholder.svg?height=100&width=100&text=Logo4" },
      ]
      setGeneratedLogos(sampleLogos)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-electricBlue rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Business Logo Creator</h2>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Logo Style</label>
            <select value={logoStyle} onChange={(e) => setLogoStyle(e.target.value)} className="input-field w-full">
              <option value="">Select Style</option>
              <option value="modern">Modern</option>
              <option value="minimalist">Minimalist</option>
              <option value="vintage">Vintage</option>
              <option value="creative">Creative</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Color Scheme</label>
            <select value={colorScheme} onChange={(e) => setColorScheme(e.target.value)} className="input-field w-full">
              <option value="">Select Colors</option>
              <option value="blue">Blue Tones</option>
              <option value="green">Green Tones</option>
              <option value="red">Red Tones</option>
              <option value="monochrome">Black & White</option>
              <option value="colorful">Colorful</option>
            </select>
          </div>

          <button
            onClick={generateLogos}
            disabled={!companyName || !logoStyle || isGenerating}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isGenerating ? "Creating Logos..." : "Generate Logos"}
          </button>
        </div>

        <div className="bg-electricBlue/5 border border-electricBlue/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Generated Logos</h3>
          {generatedLogos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {generatedLogos.map((logo) => (
                <div key={logo.id} className="bg-black border border-electricBlue/20 rounded-lg p-4 text-center">
                  <img
                    src={logo.preview || "/placeholder.svg"}
                    alt={`Logo ${logo.id}`}
                    className="w-20 h-20 mx-auto mb-2 bg-white rounded"
                  />
                  <p className="text-white text-sm mb-2">{logo.style}</p>
                  <button className="text-electricBlue hover:text-electricBlue/80 text-sm">Download</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60">Fill in the details and click generate to see logo designs</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Mission Vision Generator Component
function MissionVisionGenerator({ onClose }) {
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [values, setValues] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [generatedContent, setGeneratedContent] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContent = () => {
    if (!companyName || !industry) return

    setIsGenerating(true)
    setTimeout(() => {
      const content = {
        mission: `At ${companyName}, our mission is to revolutionize the ${industry} industry by providing innovative solutions that empower our customers to achieve their goals while maintaining the highest standards of quality and integrity.`,
        vision: `To be the leading ${industry} company that transforms how people interact with technology, creating a more connected and efficient world for future generations.`,
        values: [
          "Innovation - We constantly push boundaries to create breakthrough solutions",
          "Integrity - We conduct business with honesty and transparency",
          "Excellence - We strive for the highest quality in everything we do",
          "Customer Focus - We put our customers at the center of all decisions",
          "Collaboration - We believe in the power of teamwork and partnership",
        ],
      }
      setGeneratedContent(content)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-electricBlue rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Mission & Vision Generator</h2>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="input-field w-full"
              placeholder="e.g., Technology, Healthcare, Education"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Core Values</label>
            <textarea
              value={values}
              onChange={(e) => setValues(e.target.value)}
              className="input-field w-full h-24 resize-none"
              placeholder="What values are important to your company?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="input-field w-full"
              placeholder="Who are your customers?"
            />
          </div>

          <button
            onClick={generateContent}
            disabled={!companyName || !industry || isGenerating}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate Mission & Vision"}
          </button>
        </div>

        <div className="bg-electricBlue/5 border border-electricBlue/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Generated Content</h3>
          {generatedContent ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-electricBlue font-semibold mb-2">Mission Statement</h4>
                <p className="text-white text-sm leading-relaxed">{generatedContent.mission}</p>
              </div>

              <div>
                <h4 className="text-electricBlue font-semibold mb-2">Vision Statement</h4>
                <p className="text-white text-sm leading-relaxed">{generatedContent.vision}</p>
              </div>

              <div>
                <h4 className="text-electricBlue font-semibold mb-2">Core Values</h4>
                <ul className="space-y-2">
                  {generatedContent.values.map((value, index) => (
                    <li key={index} className="text-white text-sm">
                      {value}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn-secondary w-full">Save Content</button>
            </div>
          ) : (
            <p className="text-white/60">
              Fill in the details and click generate to create your mission and vision statements
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Pitch Deck Creator Component
function PitchDeckCreator({ onClose }) {
  const [companyName, setCompanyName] = useState("")
  const [problem, setProblem] = useState("")
  const [solution, setSolution] = useState("")
  const [market, setMarket] = useState("")
  const [generatedSlides, setGeneratedSlides] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePitchDeck = () => {
    if (!companyName || !problem || !solution) return

    setIsGenerating(true)
    setTimeout(() => {
      const slides = [
        { id: 1, title: "Company Overview", content: `${companyName} - Revolutionizing the industry` },
        { id: 2, title: "Problem", content: problem },
        { id: 3, title: "Solution", content: solution },
        { id: 4, title: "Market Opportunity", content: market || "Large addressable market with growth potential" },
        { id: 5, title: "Business Model", content: "Revenue streams and monetization strategy" },
        { id: 6, title: "Traction", content: "Key metrics and milestones achieved" },
        { id: 7, title: "Financial Projections", content: "5-year revenue and growth projections" },
        { id: 8, title: "Team", content: "Experienced team with relevant expertise" },
        { id: 9, title: "Funding Ask", content: "Investment amount and use of funds" },
        { id: 10, title: "Thank You", content: "Questions and contact information" },
      ]
      setGeneratedSlides(slides)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-electricBlue rounded-lg flex items-center justify-center">
            <Presentation className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Pitch Deck Creator</h2>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Problem Statement</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="input-field w-full h-24 resize-none"
              placeholder="What problem does your startup solve?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Solution</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="input-field w-full h-24 resize-none"
              placeholder="How does your product solve this problem?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Market Size</label>
            <textarea
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="input-field w-full h-24 resize-none"
              placeholder="Describe your target market and its size"
            />
          </div>

          <button
            onClick={generatePitchDeck}
            disabled={!companyName || !problem || !solution || isGenerating}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isGenerating ? "Creating Pitch Deck..." : "Generate Pitch Deck (20 WCP)"}
          </button>
        </div>

        <div className="bg-electricBlue/5 border border-electricBlue/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Pitch Deck Slides</h3>
          {generatedSlides.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {generatedSlides.map((slide) => (
                <div key={slide.id} className="bg-black border border-electricBlue/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-electricBlue font-medium text-sm">
                      Slide {slide.id}: {slide.title}
                    </h4>
                    <button className="text-white/60 hover:text-electricBlue text-xs">Edit</button>
                  </div>
                  <p className="text-white/80 text-xs">{slide.content}</p>
                </div>
              ))}
              <button className="btn-secondary w-full mt-4">Download Presentation</button>
            </div>
          ) : (
            <p className="text-white/60">Fill in the details and click generate to create your pitch deck</p>
          )}
        </div>
      </div>
    </div>
  )
}
