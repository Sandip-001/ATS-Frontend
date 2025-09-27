"use client";

import Dashboard from "./(main)/dashboard/page";
import Login from "./auth/page";
import { useAuth } from "./provider";

export default function HomePage() {
  const { user, profile, signOut } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}
