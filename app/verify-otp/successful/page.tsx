"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

motion.div = motion("div")

export default function OtpSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-xl shadow-2xl bg-white text-center max-w-md w-full"
      >
        {/* ✅ Lottie Animation */}
        <div className="flex justify-center">
          <DotLottieReact
            src="https://lottie.host/1ea408c4-536c-483b-bbba-8c8cc5273f60/VpRc2CChKq.lottie"
            loop
            autoplay
          />
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          You successfully changed your password!
        </h1>

        <p className="text-gray-600 mb-6">
          Always remember the password for your account and keep it safe.
        </p>

        <Button className="w-full" onClick={() => router.push("/auth")}>
          Back To Login
        </Button>
      </motion.div>
    </div>
  );
}
