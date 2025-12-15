"use client";

import { useTranslation } from "react-i18next";
import { Globe2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
  ];
  const current = i18n.language.split("-")[0];

  const active = languages.find((l) => l.code === current);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 rounded-md border border-amber-600 px-3 py-1 text-sm bg-amber-50 text-amber-700 hover:bg-amber-100"
      >
        <Globe2 size={16} className="text-amber-700" />
        <span>{active?.label ?? "Select"}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={current === lang.code ? "font-semibold" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
