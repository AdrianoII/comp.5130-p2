import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL:  process.env.BETTER_AUTH_URL || "http://localhost:3000",
    baseURL: "https://comp-5130-p2.vercel.app/",
})