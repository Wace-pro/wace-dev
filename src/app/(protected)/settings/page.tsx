"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { User, Bell, Shield, Camera } from "lucide-react"

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe123",
    email: "john@example.com",
    profilePicture: "/placeholder.svg?height=100&width=100&text=User",
  })

  const [notifications, setNotifications] = useState({
    enabled: true,
  })

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl space-y-8">
          {/* Profile Settings */}
          <div className="bg-black border border-electricBlue/20 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-electricBlue mr-3" />
              <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={profile.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-electricBlue/20"
                  />
                  <button className="absolute bottom-0 right-0 bg-electricBlue text-black p-1.5 rounded-full hover:bg-electricBlue/90 transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-white font-medium">Profile Picture</h3>
                  <p className="text-white/60 text-sm">Click the camera icon to change</p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  className="input-field w-full opacity-50 cursor-not-allowed"
                  value={profile.name}
                  disabled
                  title="Cannot be changed"
                />
                <p className="text-xs text-white/40 mt-1">This field cannot be modified</p>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  className="input-field w-full opacity-50 cursor-not-allowed"
                  value={profile.username}
                  disabled
                  title="Cannot be changed"
                />
                <p className="text-xs text-white/40 mt-1">This field cannot be modified</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="input-field w-full opacity-50 cursor-not-allowed"
                  value={profile.email}
                  disabled
                  title="Cannot be changed"
                />
                <p className="text-xs text-white/40 mt-1">This field cannot be modified</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-black border border-electricBlue/20 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-electricBlue mr-3" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Enable Notifications</span>
                  <p className="text-white/60 text-sm">Receive notifications about your startup progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.enabled}
                    onChange={(e) => setNotifications({ enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electricBlue"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-black border border-electricBlue/20 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-electricBlue mr-3" />
              <h2 className="text-xl font-semibold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <button className="btn-primary w-full">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
