"use server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export async function getData(userId: string) {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`SELECT * FROM example where "userId" = ${userId};`;
    // console.log(data);
    return data;
}

export async function GET(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user
    if (session === null || !user) {
        return Response.json({ error: "Unauthorized: Invalid session" }, { status: 401 });
    }

    return Response.json(await getData(user.id));
}