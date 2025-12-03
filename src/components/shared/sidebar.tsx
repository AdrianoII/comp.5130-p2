"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Overview" },
  { href: "/documentation", label: "Documentation" },
  { href: "/playground", label: "Playground" },
  { href: "/publications", label: "Publications" },
  { href: "/collaborators", label: "Collaborators" },
  { href: "/contact", label: "Contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // Hidden on small screens, visible from md upwards
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 shrink-0 flex-col border-r bg-white shadow-sm z-20">
      <div className="px-6 py-8 flex justify-center items-center">
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="Project Logo"
            width={64}
            height={64}
            className="rounded-md hover:scale-105 transition-transform duration-200"
            priority
          />
        </Link>
      </div>

      <Separator />

      <nav
        className="mt-4 space-y-2 px-3"
        aria-label="Main site navigation"
      >
        {items.map((it) => {
          const active =
            pathname === it.href ||
            (it.href !== "/" && pathname.startsWith(it.href));

          return (
            <Button
              key={it.href}
              variant="ghost"
              asChild
              className={cn(
                "group w-full justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                active
                  ? "bg-amber-400 text-amber-900 font-medium"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-900 hover:shadow-sm"
              )}
            >
              <Link
                href={it.href}
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
                {it.label}
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
