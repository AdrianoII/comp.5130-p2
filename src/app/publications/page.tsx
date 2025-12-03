"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const publications = [
  {
    title:
      "Giuseppe Castagna, Programming with Union, Intersection, and Negation Types",
    link: "https://www.researchgate.net/publication/Programming_with_Union_Intersection_and_Negation_Types",
  },
  {
    title:
      'Ghilezan, Silvia (1996). "Strong normalization and typability with intersection types". Notre Dame Journal of Formal Logic',
    link: "https://projecteuclid.org/journals/notre-dame-journal-of-formal-logic/volume-37/issue-1",
  },
  {
    title:
      'Castagna, Giuseppe; Lanvin, Victor. "Gradual Typing with Union and Intersection Types". ICFP 2017.',
    link: "https://dl.acm.org/doi/10.1145/3110265",
  },
];

export interface ScholarAuthor {
  authorId: string;
  name: string;
}

export interface ScholarPaper {
  paperId: string;
  url: string;
  title: string;
  year: number;
  citationCount: number;
  authors: ScholarAuthor[];
}

export type ScholarSearchResults = ScholarPaper[];

export default function PublicationsPage() {
  const [query, setQuery] = useState("intersection types, dependent types");
  const [papers, setPapers] = useState<ScholarSearchResults>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/scholar?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (res.ok) {
          setPapers(data);
        } else {
          throw new Error(data.error || "Failed to load papers");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [query]);

  return (
    <section className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Related Publications</h1>

      {/* --- static list --- */}
      <div>
        <h2 className="text-lg font-medium mb-2">Classic Works</h2>
        <ol className="space-y-4">
          {publications.map((pub, index) => (
            <li key={pub.link}>
              <Link
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="hover:shadow-lg hover:shadow-amber-300/40 hover:border-amber-900 transition-all duration-200 cursor-pointer border border-gray-200 rounded-xl bg-white/90 backdrop-blur-sm hover:-translate-y-1">
                  <CardContent className="p-5">
                    <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed hover:text-amber-900 transition-colors duration-200">
                      {index + 1}. {pub.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* --- dynamic list --- */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">
          Recent Research (via Semantic Scholar)
        </h2>

        {/* Accessible label for search input */}
        <div className="mb-4">
          <label
            htmlFor="publication-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search topic
          </label>
          <input
            id="publication-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. intersection types, dependent types"
            className="border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md w-full px-3 py-2 text-sm md:text-base outline-none"
          />
        </div>

        <div aria-live="polite" aria-atomic="true" className="space-y-3">
          {loading && (
            <div className="flex items-center gap-2" role="status" aria-label="Loading search results">
              <Spinner className="size-6 text-amber-500" />
              <span className="text-sm text-gray-600">Loading results…</span>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm md:text-base">
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              {papers.length === 0 ? (
                <p className="text-sm text-gray-600">No results found.</p>
              ) : (
                <ol className="list-decimal list-inside space-y-2">
                  {papers.map((paper) => (
                    <li key={paper.paperId}>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {paper.title}
                      </a>{" "}
                      <span className="text-sm text-gray-600">
                        - {paper.authors.map((a) => a.name).join(", ")} ({paper.year})
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
