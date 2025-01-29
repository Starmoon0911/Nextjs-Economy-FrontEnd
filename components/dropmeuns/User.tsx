import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { User } from "lucide-react"
import Link from "next/link"

import { useTheme } from "next-themes"
import { useAuth } from "@/context/useAuth"
export function UserDropMeun() {
    const { setTheme } = useTheme();
    const { isLogged, logout, user } = useAuth();
    return (
        < div className="flex items-center" >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <User className="h-5 w-5 text-black dark:text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account {user ? `| ${user.username}` : undefined}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                            {/* <DropdownMenuSubTrigger>Language</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>繁體中文</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal> */}
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = '/orders'}>
                            購物車
                        </DropdownMenuItem>
                    {isLogged ? (
                        <DropdownMenuItem onClick={() => logout()} className="bg-red-500 text-white">
                            Log out
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={() => window.location.href = '/auth/login'}>
                            Log in
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}