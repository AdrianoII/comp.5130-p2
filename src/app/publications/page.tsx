"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/shared/languageswitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const publications = [
  {
    "title": "Stephanie Weirich, Implementing Dependent Types in pi-forall (2023)",
    "link": "https://arxiv.org/abs/2207.02129"
  },
  {
    "title": "Larry Diehl, Denis Firsov, Aaron Stump, Generic Zero-Cost Reuse for Dependent Types (2018)",
    "link": "https://arxiv.org/abs/1803.08150"
  },
  {
    "title": "Denis Firsov, Richard Blair, Aaron Stump, Efficient Mendler-Style Lambda-Encodings in Cedille (2018)",
    "link": "https://arxiv.org/abs/1803.02473"
  },
  {
    "title": "Denis Firsov, Aaron Stump, Generic derivation of induction for impredicative encodings in Cedille (2018)",
    "link": "https://doi.org/10.1145/3167087"
  },
  {
    "title": "Andrew Marmaduke, Larry Diehl, Aaron Stump, Impredicative Encodings of Inductive-Inductive Data in Cedille (2023)",
    "link": "https://doi.org/10.1007/978-3-031-38938-2_1"
  },
  {
    "title": "Aaron Stump, The calculus of dependent lambda eliminations (2017)",
    "link": "https://homepage.cs.uiowa.edu/~astump/papers/cedille-draft.pdf"
  },
  {
    "title": "Nick Rioux, Xuejing Huang, Bruno C. d. S. Oliveira, Steve Zdancewic, A Bowtie for a Beast: Overloading, Eta Expansion, and Extensible Data Types in F⋈ (2023)",
    "link": "https://dl.acm.org/doi/10.1145/3571211"
  },
  {
    "title": "Jean-Yves Girard, Paul Taylor, Yves Lafont, Proofs and types (1989)",
    "link": "https://www.paultaylor.eu/stable/prot.pdf"
  },
  {
    "title": "Conor McBride, I got plenty o'nuttin' (2016)",
    "link": "https://personal.cis.strath.ac.uk/conor.mcbride/PlentyO-CR.pdf"
  },
  {
    "title": "The Coq Development Team, The Coq Proof Assistant (2024)",
    "link": "https://doi.org/10.5281/zenodo.14542673"
  },
  {
    "title": "Gilles Barthe, François Dupressoir, Benjamin Grégoire, César Kunz, Benedikt Schmidt, Pierre-Yves Strub, Easycrypt: A tutorial (2012)",
    "link": "https://link.springer.com/chapter/10.1007/978-3-319-10082-1_6"
  },
  {
    "title": "Leonardo de Moura, Soonho Kong, Jeremy Avigad, Floris van Doorn, Jakob von Raumer, The Lean Theorem Prover (System Description) (2015)",
    "link": "https://lean-lang.org/papers/system.pdf"
  },
  {
    "title": "Ulf Norell, Dependently Typed Programming in Agda (2008)",
    "link": "https://doi.org/10.1007/978-3-642-04652-0_5"
  },
  {
    "title": "Matthieu Sozeau, Yannick Forster, Simon Boulier, Nicolas Tabareau, Théo Winterhalter, Coq Coq Codet! (2019)",
    "link": "https://sozeau.gitlabpages.inria.fr/www/research/publications/Coq_Coq_Codet-CoqWS19.pdf"
  },
  {
    "title": "Benjamin Moon, Harley Eades III, Dominic Orchard, Graded Modal Dependent Type Theory (2021)",
    "link": "https://arxiv.org/abs/2010.13163"
  },
  {
    "title": "Pritam Choudhury, Harley Eades III, Richard A. Eisenberg, Stephanie C. Weirhttps://dl.acm.org/doi/10.1145/3434331ich, A graded dependent type system with a usage-aware semantics (extended version) (2020)",
    "link": "https://dl.acm.org/doi/10.1145/3434331"
  },
  {
    "title": "Jean-Yves Girard, Linear logic (1987)",
    "link": "https://www.sciencedirect.com/science/article/pii/0304397587900454"
  },
  {
    "title": "Giuseppe Castagna, Programming with Union, Intersection, and Negation Types (2024)",
    "link": "https://doi.org/10.1007/978-3-031-34518-0_12"
  },
  {
    "title": "Paul Downen, Zena M. Ariola, Silvia Ghilezan, The Duality of Classical Intersection and Union Types (2019)",
    "link": "https://doi.org/10.3233/FI-2019-1855"
  },
  {
    "title": "Philip Wadler, Propositions as sessions (2012)",
    "link": "https://doi.org/10.1145/2364527.2364568"
  },
  {
    "title": "Luís Caires, Frank Pfenning, Session Types as Intuitionistic Linear Propositions (2010)",
    "link": "https://www.cs.cmu.edu/~fp/papers/concur10.pdf"
  },
  {
    "title": "Jean-Philippe Bernardy, Patrik Jansson, Ross Paterson, Parametricity and dependent types (2010)",
    "link": "https://www.staff.city.ac.uk/~ross/papers/pts.pdf"
  },
  {
    "title": "Benjamin C. Pierce, Types and programming languages (2002)",
    "link": "https://www.cis.upenn.edu/~bcpierce/tapl/"
  },
  {
    "title": "Amal Ahmed, Semantic Type Soundness and Interoperability (2024)",
    "link": "https://www.cs.uoregon.edu/research/summerschool/summer24/lectures/Ahmed.pdf"
  },
  {
    "title": "Paul Downen, Foundations of Programming languages (2018)",
    "link": "https://www.cs.uoregon.edu/research/summerschool/summer18/lectures/foundations_notes.pdf"
  },
  {
    "title": "Ulf Norell, Dependently typed programming in Agda (2009)",
    "link": "https://doi.org/10.1145/1481861.1481862"
  },
  {
    "title": "Aaron Stump, Towards Higher-Order Abstract Syntax in Cedille (Work in Progress) (2019)",
    "link": "https://hal.science/hal-02152417"
  },
  {
    "title": "Alexei Kopylov, Dependent intersection: A new way of defining records in type theory (2003)",
    "link": "https://www.cs.cornell.edu/people/kopylov/papers/dinter/dinter.pdf"
  },
  {
    "title": "Amal Ahmed, Semantics of Types for Mutable State (2006)",
    "link": "https://www.cs.princeton.edu/research/techreps/TR-746-06"
  },
  {
    "title": "Dimitrios Vytiniotis, Stephanie Weirich, Parametricity, type equality, and higher-order polymorphism (2010)",
    "link": "https://doi.org/10.1017/S0956796810000079"
  },
  {
    "title": "Jean-Yves Girard, The system F of variable types, fifteen years later (1986)",
    "link": "https://www.sciencedirect.com/science/article/pii/0304397586900447"
  },
  {
    "title": "Jana Dunfield, Neelakantan R. Krishnaswami, Complete and Easy Bidirectional Typechecking for Higher-Rank Polymorphism (2013)",
    "link": "http://arxiv.org/abs/1306.6032"
  },
  {
    "title": "Christa Jenkins, Andrew Marmaduke, Aaron Stump, Simulating Large Eliminations in Cedille (2021)",
    "link": "https://doi.org/10.4230/LIPIcs.TYPES.2021.9"
  },
  {
    "title": "Pierre-Évariste Dagand, Conor McBride, A Categorical Treatment of Ornaments (2013)",
    "link": "https://doi.org/10.1109/LICS.2013.60"
  },
  {
    "title": "David MacQueen, Gordon Plotkin, Ravi Sethi, An ideal model for recursive polymorphic types (1986)",
    "link": "https://www.sciencedirect.com/science/article/pii/S0019995886800195"
  },
  {
    "title": "Joachim Breitner, Richard A. Eisenberg, Simon Peyton Jones, Stephanie Weirich, Safe zero-cost coercions for Haskell (2016)",
    "link": "https://doi.org/10.1017/S0956796816000150"
  },
  {
    "title": "Martin Abadi, Luca Cardelli, A theory of objects (2012)",
    "link": "https://dl.acm.org/doi/book/10.5555/547964"
  },
  {
    "title": "Paul Downen, Zachary Sullivan, Zena M. Ariola, Simon Peyton Jones, Codata in action (2019)",
    "link": "https://www.microsoft.com/en-us/research/wp-content/uploads/2020/01/CoDataInAction.pdf"
  },
  {
    "title": "Dominic Orchard, Vilem-Benjamin Liepelt, Harley Eades III, Quantitative program reasoning with graded modal types (2019)",
    "link": "https://doi.org/10.1145/3341714"
  },
  {
    "title": "Andreas Abel, Nils Anders Danielsson, Oskar Eriksson, A Graded Modal Dependent Type Theory with a Universe and Erasure, Formalized (2023)",
    "link": "https://doi.org/10.1145/3607862"
  },
  {
    "title": "Han Xu, Xuejing Huang, Bruno C. d. S. Oliveira, Making a Type Difference: Subtraction on Intersection Types as Generalized Record Operations (2023)",
    "link": "https://doi.org/10.1145/3571224"
  },
  {
    "title": "Wenjia Ye, Yaozhu Sun, Bruno C. d. S. Oliveira, Imperative Compositional Programming: Type Sound Distributive Intersection Subtyping with References via Bidirectional Typing (2024)",
    "link": "https://doi.org/10.1145/3689782"
  },
  {
    "title": "Cyril Cohen, Thierry Coquand, Simon Huber, Anders Mörtberg, Cubical Type Theory: A Constructive Interpretation of the Univalence Axiom (2018)",
    "link": "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.TYPES.2015.5"
  }
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
  const pathname = usePathname();
  const { t } = useTranslation("common");
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
      <h1 className="text-2xl font-semibold">{t("publications.title")}</h1>

      {/* --- static list --- */}
      <div>
        <h2 className="text-lg font-medium mb-2">{t("publications.classic")}</h2>
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
          {t("publications.research")}
        </h2>

        {/* Accessible label for search input */}
        <div className="mb-4">
          <label
            htmlFor="publication-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("publications.topic")}
          </label>
          <input
            id="publication-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("publications.message")}
            className="border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md w-full px-3 py-2 text-sm md:text-base outline-none"
          />
        </div>

        <div aria-live="polite" aria-atomic="true" className="space-y-3">
          {loading && (
            <div className="flex items-center gap-2" role="status" aria-label={t("publications.loading")}>
              <Spinner className="size-6 text-amber-500" />
              <span className="text-sm text-gray-600">{t("publications.error")}</span>
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
