// app/documentation/page.tsx

"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/shared/languageswitcher";
import { useTranslation } from "react-i18next";
import { CollaboratorCard } from "@/components/shared/collaboratorcard";

const people = [
  { name: "Shriya Thakur", pfp: "shriya.jpg", initials: "ST", location: "Lowell, MA", country: "US", research: "Intersection Types", homepage: "https://github.com/SmoothThunk" },
  { name: "Paul Downen", pfp: "paul.webp", initials: "PD", location: "Lowell, MA", country: "US", research: "Type Systems", homepage: "https://pauldownen.com" },
];

// export default function Collaborator() {
//   return (
//     <div className="mx-auto max-w-6xl">
//       <p className="text-xs uppercase tracking-wider text-gray-500">Collaborators</p>
//       <h1 className="mt-2 text-2xl font-semibold leading-tight">
//         Pint is an extension to the educational language Piforall, which adds support for intersection data types.
//       </h1>

//       <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {people.map((p, i) => (
//           <CollaboratorCard key={i} {...p} />
//         ))}
//       </div>
//     </div>
//   );
// }


export default function Collaborator() {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6" aria-labelledby="collaborators-heading">
      <p className="text-xs uppercase tracking-wider text-gray-500">{t("collaboration.collaborationLabel")}</p>

      {/* <h1
        id="collaborators-heading"
        className="mt-2 text-2xl font-semibold leading-tight"
      >
      </h1> */}

      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((p, i) => (
          <CollaboratorCard key={i} {...p} />
        ))}
      </section>
    </main>
  );
}
