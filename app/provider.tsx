"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: Profile | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER = {
  id: "1",
  full_name: "John Doe",
  email: "john@gmail.com",
  password: "123456", // dummy password
  avatar_url: "https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email: string, password: string) => {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      const { password, ...userData } = DUMMY_USER;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast.success("Login Sucessfull ✅");
      router.push("/dashboard");
    } else {
      toast.error("❌ Wrong email or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};