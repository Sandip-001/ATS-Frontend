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

const UpdatePassword = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  // Password strength checks
  const passwordChecks: { label: string; valid: boolean }[] = [
    { label: "At least 8 characters", valid: newPassword.length >= 8 },
    { label: "Contains number (0-9)", valid: /\d/.test(newPassword) },
    { label: "Uppercase letter (A-Z)", valid: /[A-Z]/.test(newPassword) },
    { label: "Lowercase letter (a-z)", valid: /[a-z]/.test(newPassword) },
  ];

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
          Update Your Password
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Set your new password with minimum 8 characters, including letters and
          numbers.
        </p>

        {/* Form */}
        <div className="w-full space-y-4">
          {/* New Password */}
          <div>
            <Label htmlFor="password">New Password</Label>
            <div className="relative mt-3">
              <Input
                id="password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Input your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showNewPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Password Strength Indicators */}
            {newPassword.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                {passwordChecks.map((check, i) => (
                  <p
                    key={i}
                    className={`flex items-center ${
                      check.valid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {check.valid ? "✔" : "✖"} {check.label}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative mt-3">
              <Input
                id="confirm-password"
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder="Re-type your new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmNewPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            className="mt-4 w-full"
            disabled={
              !newPassword ||
              !confirmNewPassword ||
              newPassword !== confirmNewPassword ||
              passwordChecks.some((check) => !check.valid)
            }
            onClick={() => router.push("/verify-otp")}
          >
            Submit
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
