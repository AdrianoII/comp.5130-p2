import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL:  process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    // baseURL: "https://comp-5130-p2.vercel.app/",
})