"use client";
import { Bell, Mail, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const { user, profile, signOut } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="flex justify-between items-center w-full px-4 md:px-6 py-3 md:py-4 border-b bg-white sticky top-0 z-50 ">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-lg md:text-xl font-bold">
            Hello {profile?.full_name} 👋
          </h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            {getGreeting()}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search (desktop only) */}
        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Icons */}
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-primary transition" />
        <Mail className="w-5 h-5 text-gray-600 cursor-pointer hover:text-primary transition" />

        {/* Profile Dropdown */}
        <div
          className="relative flex items-center gap-2 border rounded-lg px-2 md:px-3 py-1 cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setOpen(!open)}
        >
          <Image
            src={user?.user_metadata?.avatar_url ?? "/user.png"}
            alt="User"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium">{profile?.full_name}</p>
            <p className="text-xs text-gray-500">HR Manager</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />

          {open && (
            <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow-md animate-fade-in">
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
