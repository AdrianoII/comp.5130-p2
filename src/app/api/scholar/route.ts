import { NextResponse } from "next/server";

const BASE_URL = "https://api.semanticscholar.org/graph/v1/paper/search";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "machine learning";

    try {
        const res = await fetch(
            `${BASE_URL}?query=${encodeURIComponent(query)}&limit=5&fields=title,authors,url,year,citationCount`
        );

        if (!res.ok) {
            throw new Error(`Semantic Scholar API error: ${res.statusText}`);
        }

        const data = await res.json();
        return NextResponse.json(data.data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Scholar API Error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else if (typeof error === "string") {
            console.error("Scholar API Error:", error);
            return NextResponse.json({ error: error }, { status: 500 });
        }
        console.error("Scholar API Error: Unknown error");
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
    }
}
