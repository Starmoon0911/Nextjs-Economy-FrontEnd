'use client'
import React, { useEffect } from "react";
import { useAuth } from "@/context/useAuth";
export default function Dashboard() {
  const { checkPermission } = useAuth();
  useEffect(() => {
    const run = async () => {
      const result = await checkPermission();
      if (!result) {
        window.location.href = "/";
      }
    }
    run();
  }, []);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:text-white dark:bg-neutral-900">
      <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
      <p className="text-gray-600 dark:text-white">Here is some important data overview.</p>
    </div>
  );
}
