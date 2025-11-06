// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`SELECT * FROM examples;`;
    return data.toString();
}

export async function GET(request: Request) {
  // const response = await fetch('https://api.vercel.app/products');
  // const products = await response.json();
  return Response.json(getData());
}