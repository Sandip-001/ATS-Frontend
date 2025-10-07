import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import Header from "./dashboard/_components/Header";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
