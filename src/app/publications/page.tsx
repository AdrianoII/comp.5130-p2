// src/app/publications/page.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function PublicationsPage() {
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

  return (
    <section className="mx-auto max-w-5xl p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">
        Related Publications
      </h1>

      <div className="flex flex-col gap-8">
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
      </div>
    </section>
  );
}
