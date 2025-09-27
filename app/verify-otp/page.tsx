"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../provider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

motion.div = motion("div"); // add shortcut
motion.input = motion("input");

const VerifyOtp = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // 6 digit array
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // If already logged in → redirect
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (user) return <p>Redirecting...</p>;

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // move to next input if not last
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

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
          OTP Verification
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          We have sent a verification code to your email address{" "}
          <strong>abcd@gmail.com</strong>.{" "}
          <span className="text-green-500 cursor-pointer hover:underline">
            Wrong Email?
          </span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-between gap-2 sm:gap-3 mb-6">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            />
          ))}
        </div>

        {/* Continue Button */}
        <Button className="mt-2 w-full" disabled={!isOtpComplete} onClick={() => router.push("/verify-otp/successful")}>
          Submit
        </Button>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
