// components/UserChartDropMenu.tsx

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function UserChartDropMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                    <Menu className="mr-2" /> {/* 使用 lucide 的 Menu 圖標 */}
                    選項
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent>
                    <DropdownMenuLabel>用戶操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link href="/manage">Manage</Link> {/* Manage 項目 */}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/delete">Delete</Link> {/* Delete 項目 */}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/info">Info</Link> {/* Info 項目 */}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}
