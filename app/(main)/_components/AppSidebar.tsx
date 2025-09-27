"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/Constants";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function AppSidebar() {
  const path = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <Sidebar className="bg-white shadow-lg border-r w-64">
      {/* Logo + Owner Section */}
      <SidebarHeader className="flex flex-col justify-center items-center mt-4">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[150px] mb-4"
        />

        {/* Owner Profile Box */}
        <div className="flex items-center space-x-4 mb-6 p-4 border rounded-xl bg-gray-50 w-full">
          <Image
            src={"/user.png"}
            alt="Owner"
            width={50}
            height={50}
            className="rounded-full border-2 border-blue-400 shadow-md"
          />
          <div>
            <h2 className="font-semibold text-base">John Doe</h2>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => {
                const isActive =
                  path === option.path ||
                  option.subMenu?.some((sub) => path === sub.path);

                return (
                  <div key={index} className="mb-1">
                    <SidebarMenuItem>
                      {/* If submenu exists */}
                      {option.subMenu ? (
                        <button
                          onClick={() => toggleMenu(option.name)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition ${
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center">
                            <option.icon
                              className={`mr-2 h-4 w-4 ${
                                isActive ? "text-blue-600" : "text-gray-500"
                              }`}
                            />
                            <span className="text-[15px] font-medium">
                              {option.name}
                            </span>
                          </div>
                          {openMenu === option.name ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={option.path!}
                          className={`flex items-center px-4 py-3 rounded-lg w-full transition ${
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <option.icon
                            className={`mr-2 h-4 w-4 ${
                              isActive ? "text-blue-600" : "text-gray-500"
                            }`}
                          />
                          <span className="text-[15px] font-medium">
                            {option.name}
                          </span>
                        </Link>
                      )}
                    </SidebarMenuItem>

                    {/* Animate Submenu */}
                    <AnimatePresence>
                      {openMenu === option.name && option.subMenu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 relative"
                        >
                          {/* Vertical line for timeline */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-200 mb-4"></div>

                          {option.subMenu.map((sub, subIndex) => {
                            const subActive = path === sub.path;
                            const isLast =
                              subIndex === option.subMenu!.length - 1;

                            return (
                              <Link
                                key={subIndex}
                                href={sub.path}
                                className="flex items-center space-x-2 py-2 pl-4 relative group"
                              >
                                {/* Timeline Dot */}
                                <span
                                  className={`w-2 h-2 rounded-full absolute -left-[3px] ${
                                    subActive
                                      ? "bg-blue-500"
                                      : "bg-gray-300 group-hover:bg-gray-400"
                                  }`}
                                ></span>

                                {/* Cut line after last dot */}
                                {isLast && (
                                  <span className="absolute -left-[1px] top-3 bottom-0 w-[2px]" />
                                )}

                                {/* Submenu Label */}
                                <span
                                  className={`text-sm font-medium ${
                                    subActive
                                      ? "text-blue-600"
                                      : "text-gray-600 group-hover:text-gray-800"
                                  }`}
                                >
                                  {sub.name}
                                </span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-center text-xs text-gray-400">
        © 2025 Your Company
      </SidebarFooter>
    </Sidebar>
  );
}
