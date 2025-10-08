// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

const items = [
  { href: "/", label: "Overview" },
  { href: "/documentation", label: "Documentation" },
  { href: "/interpreter", label: "Interpreter" },
  { href: "/publications", label: "Publications" },
  { href: "/collaborators", label: "Collaborator" },
  
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <aside className="h-screen w-64 shrink-0 border-r bg-white">
      <div className="px-6 py-6 flex justify-center items-center">
        <div className="h-14 w-14 rounded-full bg-gray-200" />
      </div>

      <Separator />

      <nav className="mt-2 space-y-1 px-2">
        {items.map((it) => {
          // Only compute "active" after mount to avoid SSR/CSR mismatch
          const active =
            mounted &&
            (pathname === it.href ||
              (it.href !== "/" && pathname.startsWith(it.href)));

          return (
            <Button
              key={it.href}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start gap-3 px-4",
                active ? "bg-gray-100 text-gray-900" : "text-gray-600"
              )}
            >
              <Link href={it.href}>
                <span
                  className={cn(
                    "inline-block h-2.5 w-2.5 rounded-full",
                    active ? "bg-gray-900" : "bg-gray-300"
                  )}
                />
                {it.label}
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
