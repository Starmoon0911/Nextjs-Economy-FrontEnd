import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export function NavMenu() {
    return (
        <div className="flex items-center" >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5 text-black dark:text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Links</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href="/">Home</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>    
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}