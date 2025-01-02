"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BlogTab from "./(tabs)/BlogTab";
import ImageTab from "./(tabs)/ImageTab";
import AdminTab from "./(tabs)/AdminTab";

export default function Dashboard({ userRole }: { userRole: string }) {
  const [activeTab, setActiveTab] = useState<
    "blog" | "image" | "product" | "admin"
  >("blog");
  console.log(userRole);

  const tabs = [
    { key: "blog", label: "Add Blog" },
    { key: "image", label: "Image Add (Redis)" },
    { key: "product", label: "Add Product" },
  ];

  if (userRole === "superadmin") {
    tabs.push({ key: "admin", label: "Admin Management" });
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "blog":
        return <BlogTab />;
      case "image":
        return <ImageTab />;
      case "admin":
        return userRole === "superadmin" ? <AdminTab /> : null;
      default:
        return <p>Feature not yet implemented.</p>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
      <div className="tabs space-x-4">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="mt-6">{renderActiveTab()}</div>
    </div>
  );
}
