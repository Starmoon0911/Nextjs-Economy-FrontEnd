"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <Link href="/" className="text-black dark:text-white">Logo</Link>
      </div>

      {/* Hamburger Menu for small screens */}
      <div className="flex items-center md:hidden">
        <Button onClick={toggleMenu} variant="outline" size="icon">
          <Menu className="h-5 w-5 text-black dark:text-white" />
        </Button>
      </div>

      {/* Links and Actions Section */}
      <div className={`flex items-center space-x-4 ${isMenuOpen ? "flex-col absolute bg-white dark:bg-gray-900 shadow-md mt-2 rounded-lg p-4 md:hidden" : "hidden md:flex"}`}>
        {/* Links */}
        <Link href="/about" className="text-black dark:text-white hover:underline">About</Link>
        <Link href="/services" className="text-black dark:text-white hover:underline">Services</Link>
        <Link href="/contact" className="text-black dark:text-white hover:underline">Contact</Link>

        {/* Dark Mode Toggle */}
        <ModeToggle />

        {/* User Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full p-2">
              <User className="h-5 w-5 text-black dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
