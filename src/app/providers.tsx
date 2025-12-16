"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import React, { PropsWithChildren } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n/config"

import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter()

    return (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    )
}