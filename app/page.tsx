"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./provider";
import dynamic from "next/dynamic";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard"); // redirect to dashboard
    }
  }, [user, router]);

  if (user) return <p>Redirecting to dashboard...</p>;

  const Login = dynamic(() => import("./auth/page"), { ssr: false });
  return <Login />;
}

