"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/shared/languageswitcher";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FORMSPREE_URL = "https://formspree.io/f/xyzrjlqr"; 

export default function ContactPage() {
  const pathname = usePathname();
  const { t } = useTranslation("common");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
<div className="min-h-screen bg-white px-4 py-10">
  <div className="w-full bg-white  rounded-2xl shadow-md p-8">
    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
      {t("contact.contactTitle")}
    </h1>
    <p className="text-sm text-gray-600 mb-6">
      {t("contact.desc")}
    </p>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <p className="text-gray-800 text-sm">{t("contact.name")}</p>
        <Input
          id="name"
          name="name"
          required
          placeholder={t("contact.box1")}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-1">
        <p className="text-gray-800 text-sm">{t("contact.email")}</p>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("contact.box2")}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-1">
        <p className="text-gray-800 text-sm">{t("contact.message")}</p>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={t("contact.box3")}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-amber-400 text-white hover:bg-amber-400 cursor"
        disabled={status === "loading"}
      >
        {status === "loading" ? t("contact.sending") : t("contact.sendMessage")}
      </Button>

      {status === "success" && (
        <p className="text-sm text-green-600 text-center">
          {t("contact.success")}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          {t("contact.failure")}
        </p>
      )}
    </form>
  </div>
</div>


  );
}
