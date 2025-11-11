import { betterAuth } from "better-auth";
import { neon } from "@neondatabase/serverless";
import { type GeneratedAlways, Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
// import { Pool } from "pg";

// console.log("jere")

interface Database {
    users: {
        id: GeneratedAlways<number>;
        email: string | null;
        password: string | null;
        role: number;
        created_at: Date;
        updated_at: Date;
    };
    User: { id: string; email: string; hashedPassword: string; };
}

const db = new Kysely<Database>({
    dialect: new NeonDialect({
        neon: neon(process.env.DATABASE_URL!),
    }),
});


// const users = await db.selectFrom("users").selectAll().execute();
// console.log("Users:", users);

// export const auth = betterAuth({
//   database: new Pool({
//     connectionString: process.env.DATABASE_URL!,
//   }),
//   emailAndPassword: {
//         enabled: true,
//     },
// });

export const auth = betterAuth({
    database: { db: db, type: 'postgres', },
    emailAndPassword: {
        enabled: true,
    },
    // socialProviders: { 
    //     github: { 
    //         clientId: process.env.GITHUB_CLIENT_ID!, 
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
    //     } 
    // }, 
});