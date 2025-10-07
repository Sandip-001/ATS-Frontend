"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { companyData as initialData } from "@/services/Constants";
import { Switch } from "@/components/ui/switch";

export default function EditCompanyProfilePage() {
  const [companyData, setCompanyData] = useState(initialData);
  const [avatarPreview, setAvatarPreview] = useState(companyData.avatar);

  // Generic input handler
  const handleChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  // Image upload handler
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatarPreview(imageURL);
      setCompanyData((prev) => ({ ...prev, avatar: imageURL }));
    }
  };

  const handleSave = () => {
    toast.success("Your company profile has been successfully updated ✅");
    console.log("Updated company data:", companyData);
  };

  const handleDelete = () => {
    toast.error("Your company account has been permanently deleted ❌");
  };

  return (
    <motion.div
      className="container mx-auto p-6 space-y-8 max-w-5xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">

            <div className="relative w-[90px] h-[90px] rounded-full">
              <Image
                src={avatarPreview}
                alt={companyData.name}
                fill
                style={{ objectFit: "cover" }} // this ensures the image fills the container
                className="rounded-full border-2 border-purple-300 shadow-sm"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700 transition"
              >
                ✏️
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            
            <div>
              <CardTitle className="text-xl font-semibold">
                {companyData.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {companyData.industry}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <Label className="mb-2">Company Name</Label>
              <Input
                value={companyData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* Contact Email */}
            <div>
              <Label className="mb-2">Admin Contact Email</Label>
              <Input
                placeholder="admin@technest.com"
                value={(companyData as any).contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="mb-2">Phone Number</Label>
              <Input
                placeholder="+1 9876543210"
                value={(companyData as any).phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            {/* Timezone */}
            <div>
              <Label className="mb-2">Time Zone</Label>
              <Select
                onValueChange={(value) => handleChange("timeZone", value)}
                defaultValue={(companyData as any).timeZone || "UTC"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Time Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST (Eastern Time)</SelectItem>
                  <SelectItem value="PST">PST (Pacific Time)</SelectItem>
                  <SelectItem value="IST">IST (India Standard Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Default Currency */}
            <div>
              <Label className="mb-2">Default Currency</Label>
              <Select
                onValueChange={(value) => handleChange("currency", value)}
                defaultValue={(companyData as any).currency || "USD"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language Preference */}
            <div>
              <Label className="mb-2">Language Preference</Label>
              <Select
                onValueChange={(value) => handleChange("language", value)}
                defaultValue={(companyData as any).language || "English"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry Tag */}
            <div className="md:col-span-2">
              <Label className="mb-2">Industry Tag</Label>
              <Select
                onValueChange={(value) => handleChange("industry", value)}
                defaultValue={companyData.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Information Technology & Services">
                    Information Technology & Services
                  </SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <Label className="mb-2">About</Label>
              <Textarea
                value={companyData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>

          {/* Save Button */}
          <div className="px-6 flex justify-start">
            <Button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 transition-all duration-300"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <Label>Change Password</Label>
              <Input placeholder="Old Password" type="password" />
              <Input placeholder="New Password" type="password" />
              <Input placeholder="Confirm New Password" type="password" />
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 w-40 mt-2">
                Update Password
              </Button>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="flex justify-between items-center">
                <Label>Two-Factor Authentication (2FA)</Label>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <Label>Billing Updates</Label>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <Label>SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts via SMS
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Account */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-md border border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">
              Billing & Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Delete Company Account — This action cannot be undone. All your
              data will be permanently deleted.
            </p>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
