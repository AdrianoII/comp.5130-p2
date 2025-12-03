import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

type Collaborator = {
  name: string;
  pfp: string;
  initials: string;
  location: string;
  country: string;
  research: string;
};

export function CollaboratorCard({
  name,
  pfp,
  initials,
  location,
  country,
  research,
  homepage
}: Collaborator) {
  return (
    <a href={homepage} target="_blank" rel="noopener noreferrer">
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      <CardContent className="pt-6">

        <div
          className="mx-auto mb-6 mt-2 flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-600"
          aria-hidden="true"
        >
          <Image
            src={`/${pfp}`}
            alt="Profile picture"
            width={128}
            height={128}
            loading="lazy"
            className="rounded-full object-cover"
          />
        </div>

        <div className="text-center space-y-2">

          <h2 className="text-base font-semibold">{name}</h2>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            <span>{location}</span>
          </div>

          {/* {research && (
            <p className="text-xs text-gray-600">
              <span className="font-medium">Research:</span> {research}
            </p>
          )} */}
        </div>
      </CardContent>
    </Card>
    </a>
  );
}
