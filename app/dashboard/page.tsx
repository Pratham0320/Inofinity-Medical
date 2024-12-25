"use client";

import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./dash";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt.decode(token) as { role?: string } | null;

      if (!decoded || !decoded.role) {
        throw new Error("Invalid token payload");
      }

      const role = decoded.role;
      if (role !== "admin" && role !== "superadmin") {
        router.push("/login");
        return;
      }

      setUserRole(role);
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/login");
    }
  }, [router]);

  if (!userRole) {
    return <div>Loading...</div>;
  }

  return <Dashboard userRole={userRole} />;
}
