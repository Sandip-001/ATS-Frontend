"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaApple } from "react-icons/fa";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../provider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

motion.div = motion("div"); // add shortcut

const Login = () => {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // if already logged in → go to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) return <p className="text-center">Redirecting...</p>;

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Only for Desktop */}
      <div className="hidden md:flex md:w-1/2 flex-col">
        {/* Top Image (fills all remaining space) */}
        <div className="flex-1 relative">
          <Image
            src="/Groups.png" // replace with your group image
            alt="Group of people"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Bottom Blue Box */}
        <div className="bg-[#0a2540] text-white text-center py-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold">
              Let's empower your employees today.
            </h2>
            <p className="mt-2 text-gray-300">
              We help to complete all your conveyancing needs easily
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side */}
      <motion.div
        className="flex flex-col justify-center md:w-1/2 w-full px-6 sm:px-12 lg:px-24"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png" // replace with your logo
            alt="Winixco Logo"
            width={180}
            height={60}
            priority
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-center mb-6">
          Login first to your account
        </h3>

        {/* Form */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Input your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-3">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Input your password account"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Login Button */}
          <Button
            className="w-full disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFormValid}
            onClick={() => login(email, password)}
          >
            Login
          </Button>
        </div>

        {/* Or login with */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">Or login with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google & Apple */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center space-x-2"
          >
            <FaGoogle className="text-red-500" />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center space-x-2"
          >
            <FaApple className="text-black" />
            <span>Apple</span>
          </Button>
        </div>

        {/* Create Account */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          You're new in here?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Create Account
          </a>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2025 HRDashboard. All rights reserved.{" "}
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>{" "}
          ·{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
