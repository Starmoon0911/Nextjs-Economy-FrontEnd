'use client';
import { useState } from "react";
import Link from "next/link";
import { Home, User, X, Menu,ShoppingBag,Tag } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => { setIsOpen(!isOpen)}
  return (
    <div>
      {/* 開啟按鈕 */}
      {!isOpen && (
        <button onClick={handleIsOpen} className="fixed top-4 left-4 p-2 bg-gray-200 rounded dark:bg-gray-600">
          <Menu className="h-5 w-5" />
        </button>
      )}

      <div
        className={`fixed  z-10 top-0 left-0 h-full transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white shadow-md dark:bg-gray-700`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">{isOpen ? "Dashboard" : "D"}</h1>
          <button onClick={handleIsOpen} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        {isOpen && (
          <nav className="mt-10">
            <ul>
              <li>
                <Link href="/dashboard" className="flex items-center p-4 hover:bg-gray-200">
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard/user" className="flex items-center p-4 hover:bg-gray-200">
                  <User className="mr-3 h-5 w-5" />
                  User
                </Link>
              </li>
              <li>
                <Link href="/dashboard/order" className="flex items-center p-4 hover:bg-gray-200">
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  Order
                </Link>
              </li>
              <li>
                <Link href="/dashboard/product" className="flex items-center p-4 hover:bg-gray-200">
                  <Tag className="mr-3 h-5 w-5" />
                  Products
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
