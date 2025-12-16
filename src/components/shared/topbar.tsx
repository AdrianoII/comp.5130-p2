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
import { LanguageSwitcher } from "./languageswitcher";
import { useTranslation } from "react-i18next";

const { useSession } = createAuthClient();

const items = [
    { href: "/", key: "nav.overview" },
    { href: "/documentation", key: "Documentation" },
    { href: "/playground", key: "Playground" },
    { href: "/publications", key: "Publications" },
    { href: "/collaborators", key: "Collaborators" },
    { href: "/contact", key: "Contact" },
  ];

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile nav toggle + logo */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                aria-label="Open main navigation"
              >
                <Menu className="h-5 w-5" aria-hidden="true" focusable="false" />
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
                  <SheetTitle className="sr-only">
                    Pint main navigation
                  </SheetTitle>
                </Link>
              </SheetHeader>

              <nav
                className="mt-4 space-y-2 px-3 pb-4"
                aria-label="Main site navigation"
              >
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
                        aria-current={active ? "page" : undefined}
                      >
                        <span
                          className={cn(
                            "inline-block h-2.5 w-2.5 rounded-full transition-colors duration-200",
                            active
                              ? "bg-amber-800"
                              : "bg-gray-300 group-hover:bg-amber-600"
                          )}
                        />
                        {t(item.key)}
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
            <LogIn className="h-5 w-5" aria-hidden="true" focusable="false" />
            <span className="hidden sm:inline">{t("auth.signIn")}</span>
          </Button>
        )}

        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-900"
                aria-label={
                  session.user.name
                    ? `User menu for ${session.user.name}`
                    : "User menu"
                }
              >
                <Avatar className="h-8 w-8">
                  {session.user.image && (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name ?? "User profile picture"}
                    />
                  )}
                  <AvatarFallback>
                    {session.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden xs:inline">
                  {session.user.name ?? "User"}
                </span>
                <ChevronDown
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link href={`/${session.user.name}/examples`}>
                My Examples
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-800 focus:bg-red-100 cursor-pointer"
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
        <LanguageSwitcher />
      </div>
    </header>
  );
}
