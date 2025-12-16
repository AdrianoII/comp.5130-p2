"use server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getData(userId: string) {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`SELECT * FROM example where "userId" = ${userId};`;
    // console.log(data);
    return data;
}

export async function isAdmin(userId: string) {
    try {
        const sql = neon(process.env.DATABASE_URL as string);
        const rows = await sql`
            SELECT 1 FROM role
            WHERE role.role = 'admin' AND role."userId" = ${userId}
            LIMIT 1;
        `;
        return Array.isArray(rows) && rows.length > 0;
    } catch (err) {
        console.error('isAdmin check failed:', err);
        return false;
    }
}

// List all visible examples according to the user's role
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

// Creat a new example (must be logged in)
export async function POST(request: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (session === null || !user) {
        return Response.json({ error: "Unauthorized: Invalid session" }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { title, code } = body || {};
    if (!title || !code) {
        return Response.json({ error: "Missing required fields: title and code" }, { status: 400 });
    }

    try {
        const sql = neon(process.env.DATABASE_URL as string);
        const inserted = await sql`
            INSERT INTO example ("userId", title, code)
            VALUES (${user.id}, ${title}, ${code})
            RETURNING *;
        `;
        return Response.json(inserted[0] ?? inserted, { status: 201 });
    } catch (err: unknown) {
        console.error("Create example error:", err);
        return Response.json({ error: "Failed to create example" }, { status: 500 });
    }
}

// Update an existing example (must belong to the user or be admin)
export async function PUT(request: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (session === null || !user) {
        return Response.json({ error: "Unauthorized: Invalid session" }, { status: 401 });
    }

    const admin = await isAdmin(user.id);

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { id, title, code } = body || {};
    if (!id) {
        return Response.json({ error: "Missing required field: id" }, { status: 400 });
    }

    try {
        const sql = neon(process.env.DATABASE_URL as string);
        let updated;
        if (admin) {
            updated = await sql`
                UPDATE example
                SET
                    title = COALESCE(${title}, title),
                    code = COALESCE(${code}, code),
                    updated_at = now()
                WHERE id = ${id}
                RETURNING *;
            `;
        } else {
            updated = await sql`
                UPDATE example
                SET
                    title = COALESCE(${title}, title),
                    code = COALESCE(${code}, code),
                    updated_at = now()
                WHERE id = ${id} AND "userId" = ${user.id}
                RETURNING *;
            `;
        }

        if (!updated || updated.length === 0) {
            return Response.json({ error: "Not found or not owned by user" }, { status: 404 });
        }

        return Response.json(updated[0]);
    } catch (err: unknown) {
        console.error("Update example error:", err);
        return Response.json({ error: "Failed to update example" }, { status: 500 });
    }
}

// Delete an example by id (must belong to the user)
export async function DELETE(request: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (session === null || !user) {
        return Response.json({ error: "Unauthorized: Invalid session" }, { status: 401 });
    }

    const admin = await isAdmin(user.id);

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { id } = body || {};
    if (!id) {
        return Response.json({ error: "Missing required field: id" }, { status: 400 });
    }

    try {
        const sql = neon(process.env.DATABASE_URL as string);
        let deleted;
        if (admin) {
            deleted = await sql`
                DELETE FROM example
                WHERE id = ${id}
                RETURNING *;
            `;
        } else {
            deleted = await sql`
                DELETE FROM example
                WHERE id = ${id} AND "userId" = ${user.id}
                RETURNING *;
            `;
        }

        if (!deleted || deleted.length === 0) {
            return Response.json({ error: "Not found or not owned by user" }, { status: 404 });
        }

        return Response.json({ success: true, deleted: deleted[0] });
    } catch (err: unknown) {
        console.error("Delete example error:", err);
        return Response.json({ error: "Failed to delete example" }, { status: 500 });
    }
}