"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-6 border-b bg-white/70 px-6 backdrop-blur">
  
      <Button
        onClick={() => router.push("/signin")}
        className="gap-2 bg-amber-400 hover:bg-amber-400 text-amber-900"
      >
        <LogIn className="h-5 w-5" />
        <span className="hidden sm:inline">Sign in</span>
      </Button>


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-900"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
            <span>Sean</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
