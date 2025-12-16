import { NextResponse } from "next/server";

// const BASE_URL = "https://api.semanticscholar.org/graph/v1/paper/search";
const BASE_URL = "https://api.semanticscholar.org/graph/v1/author/2065311/papers/?fields=title,authors,url,year,citationCount&limit=10&offset=0";

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url);
    // const query = searchParams.get("q") || "machine learning";
    console.log("adasds")
    try {
        const res = await fetch(
            // `${BASE_URL}?query=${encodeURIComponent(query)}&limit=5&fields=title,authors,url,year,citationCount`
            `${BASE_URL}`
        );

        if (!res.ok) {
            throw new Error(`Semantic Scholar API error: ${res.statusText}`);
        }

        const data = await res.json();
        console.log(data);
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
        console.log(error);
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
    }
}
