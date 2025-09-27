"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../provider";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

motion.div = motion("div"); // add shortcut

const ForgotPassword = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");

  // If already logged in → redirect
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) return <p>Redirecting...</p>;

  return (
    <div className="flex justify-center items-center h-screen px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center gap-1 border p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-md bg-white"
      >
        {/* Logo */}
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={100}
          className="w-[160px] sm:w-[180px] mb-4"
        />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Reset Your Password
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Enter your email address below, and we’ll send you instructions to
          reset your password.
        </p>

        {/* Form */}
        <div className="w-full space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Input your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Continue Button */}
          <Button className="mt-4 w-full" onClick={() => router.push("/update-password")}>Continue</Button>

          {/* Back to Login */}
          <Button
            variant="outline"
            className="w-full border-gray-400 text-gray-700 hover:bg-gray-100"
            onClick={() => router.push("/auth")}
          >
            Back to Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;