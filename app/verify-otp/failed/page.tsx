"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

motion.div = motion("div")

export default function OtpFailedPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-xl shadow-2xl bg-white text-center max-w-md w-full"
      >
        {/* ❌ Lottie Animation */}
        <div className="flex justify-center">
          <DotLottieReact
            src="https://lottie.host/c1e62b59-fd2f-4bc5-9d1a-ad17e94dec00/AYqea9Mrqi.lottie"
            loop
            autoplay
          />
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Verification Failed
        </h1>
        <p className="text-gray-600 mb-6">
          The OTP you entered is invalid or expired. Please try again.
        </p>

        <Button className="w-full mb-3" onClick={() => router.push("/verify-otp")}>
          Retry OTP
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/auth")}
        >
          Back to Login
        </Button>
      </motion.div>
    </div>
  );
}