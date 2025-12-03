"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/shared/sidebar";
import Topbar from "@/components/shared/topbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/signin";

  if (hideLayout) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col md:pl-64">
        <Topbar />
        <main className="flex-1 p-6 flex-1 px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
