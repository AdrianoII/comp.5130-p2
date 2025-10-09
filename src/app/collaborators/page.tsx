// app/documentation/page.tsx
import { CollaboratorCard } from "@/components/shared/collaboratorcard";

const people = [
  { name: "Shriya Thakur", initials: "ST", location: "London, United Kingdom", country: "UK" },
  // { name: "Adriano II", initials: "AI", location: "London, United Kingdom", country: "UK" },
  { name: "Paul D", initials: "PD", location: "London, United Kingdom", country: "UK" },
  { name: "Cody Fisher", initials: "CF", location: "London, United Kingdom", country: "UK" },
];

export default function Collaborator() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs uppercase tracking-wider text-gray-500">Collaborators</p>
      <h1 className="mt-2 text-2xl font-semibold leading-tight">
        Pint is an extension to the educational language Piforall, which adds support for intersection data types.
      </h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((p, i) => (
          <CollaboratorCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
}
