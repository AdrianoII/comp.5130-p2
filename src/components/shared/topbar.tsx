"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react"
import { useEffect } from "react";
const { useSession } = createAuthClient()
import { authClient } from "@/lib/auth-client";


export default function Topbar() {
  const router = useRouter();
  const {
    data: session,
    isPending,
    error,
    refetch
  } = useSession()

  useEffect(() => {
    console.log("at mount")
    console.log("Session changed:", session)
  }, [])


  useEffect(() => {
    console.log("Session changed:", session)
  }, [session])

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-6 border-b bg-white/70 px-6 backdrop-blur">
      {session === null &&
        <Button
          onClick={() => router.push("/signin")}
          className="gap-2 bg-amber-400 hover:bg-amber-400 text-amber-900"
        >
          <LogIn className="h-5 w-5" />
          <span className="hidden sm:inline">Sign in</span>
        </Button>
      }
      {session?.user &&
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-900"
            >
              <Avatar className="h-8 w-8">
                {session?.user?.image && <AvatarImage src={session?.user?.image} alt={session?.user?.name ?? "user's profile picture"} />}
                <AvatarFallback>{session?.user?.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <span>{session?.user?.name ?? "User"}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Examples</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-800 focus:bg-red-100" onClick={async () => {
              await authClient.signOut(
                {
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.reload();
                    },
                  },
                }
              );
            }}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </header>
  );
}
