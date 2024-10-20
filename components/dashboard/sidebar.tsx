import Link from "next/link";
import { Home, Settings, BarChart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <Link href="/dashboard" className="flex items-center p-4 hover:bg-gray-200">
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard/stats" className="flex items-center p-4 hover:bg-gray-200">
              <BarChart className="mr-3 h-5 w-5" />
              Stats
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="flex items-center p-4 hover:bg-gray-200">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
