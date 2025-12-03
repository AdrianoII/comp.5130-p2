"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { createAuthClient } from "better-auth/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const { useSession } = createAuthClient();

const items = [
  { href: "/", label: "Overview" },
  { href: "/documentation", label: "Documentation" },
  { href: "/playground", label: "Playground" },
  { href: "/publications", label: "Publications" },
  { href: "/collaborators", label: "Collaborators" },
];

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0">
              <SheetHeader className="border-b px-4 py-4 flex flex-row items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/logo2.png"
                    alt="Pint Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                </Link>
              </SheetHeader>

              <nav className="mt-4 space-y-2 px-3 pb-4">
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      asChild
                      className={cn(
                        "group w-full justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                        active
                          ? "bg-amber-400 text-amber-900 font-medium"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-900 hover:shadow-sm"
                      )}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)} 
                      >
                        <span
                          className={cn(
                            "inline-block h-2.5 w-2.5 rounded-full transition-colors duration-200",
                            active
                              ? "bg-amber-800"
                              : "bg-gray-300 group-hover:bg-amber-600"
                          )}
                        />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center gap-2 md:hidden">
          <Image
            src="/logo2.png"
            alt="Project Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {!session && (
          <Button
            onClick={() => router.push("/signin")}
            className="gap-2 bg-amber-400 hover:bg-amber-400 text-amber-900"
          >
            <LogIn className="h-5 w-5" />
            <span className="hidden sm:inline">Sign in</span>
          </Button>
        )}

        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-900"
              >
                <Avatar className="h-8 w-8">
                  {session.user.image && (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name ?? "user's profile picture"}
                    />
                  )}
                  <AvatarFallback>
                    {session.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden xs:inline">
                  {session.user.name ?? "User"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Examples</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-800 focus:bg-red-100"
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.reload();
                      },
                    },
                  });
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}