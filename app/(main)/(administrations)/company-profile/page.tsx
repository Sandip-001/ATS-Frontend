"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Pencil, Plus } from "lucide-react";
import { companyData } from "@/services/Constants";
import { useRouter } from "next/navigation";

export default function CompanyProfilePage() {
  const data = companyData;
  const router = useRouter();

  return (
    <TooltipProvider>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-md border border-violet-100 hover:shadow-lg transition-shadow rounded-2xl">
            <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={data.avatar}
                  alt={data.name}
                  width={80}
                  height={80}
                  className="rounded-full border border-gray-200"
                />
                <div>
                  <h1 className="text-2xl font-bold text-violet-700">{data.name}</h1>
                  <p className="text-gray-500">{data.industry}</p>
                   
                  <p className="text-gray-500">{data.location}</p>
                </div>
              </div>

              <Button className="mt-4 md:mt-0 bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-full" onClick={()=>router.push("/company-profile/edit")}>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ABOUT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">About Us</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-violet-600 hover:bg-violet-100">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit About Section</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{data.about}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* COMPANY OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Company Overview</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-violet-600 hover:bg-violet-100">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Overview</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-3">
              <p>
                <span className="font-medium text-gray-900">Website: </span>
                <a href={`https://${data.website}`} className="text-violet-600 hover:underline">
                  {data.website}
                </a>
              </p>
              <p>
                <span className="font-medium text-gray-900">Company Size:</span> {data.companySize}
              </p>
              <p>
                <span className="font-medium text-gray-900">Founded:</span> {data.founded}
              </p>
              <p>
                <span className="font-medium text-gray-900">Social Links:</span>{" "}
                <a href={data.socials.linkedin} className="text-violet-600 hover:underline mr-2">
                  LinkedIn
                </a>
                <a href={data.socials.twitter} className="text-violet-600 hover:underline mr-2">
                  X
                </a>
                <a href={data.socials.facebook} className="text-violet-600 hover:underline">
                  Facebook
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* TESTIMONIALS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Testimonials</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-violet-600 hover:bg-violet-100">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Testimonial</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              {data.testimonials.length > 0 ? (
                <div className="space-y-4">
                  {data.testimonials.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                      <p className="text-gray-700 italic">“{t.comment}”</p>
                      <p className="text-sm text-gray-500 text-right mt-1">– {t.name}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Endorsements from past talents will appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
