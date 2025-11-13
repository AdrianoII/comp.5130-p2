"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";


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

export default function PublicationsPage() {
  const [query, setQuery] = useState("intersection types, depedent types");
  const [papers, setPapers] = useState<any[]>([]);
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

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, [query]);

  return (
    <section className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Related Publications</h1>      {/* --- static list --- */}
      <div>
        <h2 className="text-lg font-medium mb-2">Classic Works</h2>
        {/* <ol className="list-decimal list-inside space-y-1">
          <li>
            Giuseppe Castagna, <i>Programming with Union, Intersection, and Negation Types</i>
          </li>
          <li>
            Ghilezan, Silvia (1996). <i>Strong normalization and typability with intersection types</i>. Notre Dame Journal of Formal
          </li>
          <li>
            Castagna, Giuseppe; Lanvin, Victor. <i>Gradual Typing with Union and Intersection Types</i>. ICFP 2017.
          </li>
        </ol> */}
        {publications.map((pub, index) => (
          <Link
            key={index}
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="hover:shadow-lg hover:shadow-amber-300/40 hover:border-amber-900 transition-all duration-200 cursor-pointer border border-gray-200 rounded-xl bg-white/90 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8">
                <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed hover:text-amber-900 transition-colors duration-200">
                  {index + 1}. {pub.title}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>      {/* --- dynamic list --- */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Recent Research (via Semantic Scholar)</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topic..."
          className="border p-2 rounded w-full mb-4"
        />
        {loading && <Spinner className="size-8 text-green-500" />}
        {error && <p className="text-red-600">{error}</p>}        {!loading && !error && (
          <ol className="list-decimal list-inside space-y-2">
            {papers.length === 0 && <p>No results found.</p>}
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
                  - {paper.authors.map((a: any) => a.name).join(", ")} ({paper.year})
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>);
}