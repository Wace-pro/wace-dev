"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Wrench,
  BookOpen,
  Users,
  Gamepad2,
  Package,
  BookMarked,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";
import { useWCP } from "../hooks/useWCP";
import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ERROR_MESSAGES } from "@/constants/error-messages";

// Sidebar component - handles navigation and user logout functionality
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "ToolHub", href: "/toolhub", icon: Wrench },
  { name: "LearnHub", href: "/learnhub", icon: BookOpen },
  { name: "AI Consultants", href: "/consultants", icon: Users },
  { name: "Startup Simulator", href: "/simulator", icon: Gamepad2 },
  {
    name: "Xpods",
    href: "/xpods",
    icon: Package,
    locked: true,
    comingSoon: true,
  },
  { name: "Journal", href: "/journal", icon: BookMarked },
  { name: "JINX", href: "/jinx", icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { wcp } = useWCP();
  const userLogout = useFetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`
  );
  const { toast } = useToast();

  const msg = ERROR_MESSAGES.GLOBAL;
  const handleLogout = () => {
    if (userLogout.loading) return;

    // Clear user data and redirect to sign in
    userLogout.fetchData();
    // localStorage.removeItem("wace-user")
    // localStorage.removeItem("wace-welcome-seen")

    // router.push("/signin")
  };

  useEffect(() => {
    if (userLogout.success && userLogout.error === null) {
      localStorage.removeItem("wace-user");
      localStorage.removeItem("wace-welcome-seen");
      toast({
        title: "Logout Successful",
        description: "You have been logged out successfully.",
      });
      router.push("/");
    } else {
      if (userLogout.error) {
        toast({
          title: "Logout Failed",
          description: userLogout.error || msg.SERVER_INTERNAL_ERROR,
          variant: "destructive",
        });
      }
    }
  }, [userLogout.success, userLogout.error]);
  // Get user data with fallback
  const getUserData = () => {
    try {
      return JSON.parse(
        localStorage.getItem("wace-user") || '{"club":"SYRONE"}'
      );
    } catch {
      return { club: "SYRONE" };
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-black border-r border-electricBlue/20">
      <div className="flex flex-col h-full">
        {/* Logo Section - displays WACE logo and branding */}
        <div className="p-6 border-b border-electricBlue/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              {/* Logo placeholder: wace-logo.png - should be the blue chevron logo */}
              <Image
                src="/wace-logo.png"
                alt="WACE Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-electricBlue">WACE</h1>
              <p className="text-xs text-white/60">Your Startup Ecosystem</p>
            </div>
          </div>
        </div>

        {/* User Profile Section - shows user info and status */}
        <div className="p-4 border-b border-electricBlue/20">
          <button
            onClick={() => router.push("/settings")}
            className="flex items-center space-x-3 w-full text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-electricBlue/20 border border-electricBlue/30 rounded-full flex items-center justify-center">
              <span className="text-xs text-electricBlue font-semibold">U</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">user@123</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-electricBlue rounded-full"></div>
                <span className="text-xs text-white/60">Online</span>
                <span className="text-xs bg-electricBlue text-black px-2 py-0.5 rounded-full font-medium">
                  {getUserData().club}
                </span>
              </div>
            </div>
          </button>
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-electricBlue text-sm">🪙</span>
            <span className="text-electricBlue text-sm font-semibold">
              {wcp} WCP
            </span>
          </div>
        </div>

        {/* Navigation Menu - main app navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-electricBlue/10 text-electricBlue border border-electricBlue/20"
                    : "text-white/70 hover:text-electricBlue hover:bg-electricBlue/5"
                } ${item.locked ? "opacity-50" : ""}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
                {item.locked && (
                  <div className="ml-auto w-4 h-4 bg-black border border-electricBlue/30 rounded flex items-center justify-center">
                    <span className="text-xs">🔒</span>
                  </div>
                )}
                {item.comingSoon && (
                  <div className="ml-auto text-xs bg-electricBlue/20 text-electricBlue px-2 py-0.5 rounded-full">
                    Soon
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions - settings and logout */}
        <div className="p-4 border-t border-electricBlue/20 space-y-1">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 text-white/70 hover:text-electricBlue hover:bg-electricBlue/5 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={userLogout.loading}
            className="flex disabled:text-[#c9c9c9]  items-center space-x-3 px-3 py-2.5 text-white/70 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
