"use client"
import { useTheme } from "next-themes"
import * as React from "react"
import Link from "next/link"
import { NavMenu } from "../dropmeuns/Navmenu"
import { UserDropMeun } from "../dropmeuns/User"

export function Navbar() {
  const { setTheme } = useTheme()

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <Link href="/" className="text-black dark:text-white">Aliendo Server</Link>
      </div>

      {/* Links and Actions Section */}
      <div className={`items-center space-x-4 hidden md:flex`}>
        <Link href="/support" className="text-black dark:text-white hover:underline">贊助資訊</Link>
        <Link href="/rule" className="text-black dark:text-white hover:underline">遊玩規章</Link>

        <UserDropMeun />
      </div>

      {/* Mobile Section: 按鈕放在同一行並對齊右邊 */}
      <div className="flex items-center space-x-2 ml-auto md:hidden">
        <UserDropMeun />
        <NavMenu />
      </div>
    </nav>
  )
}
