import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  MapPin,
  Star,
  MessageSquare,
  Share2,
  Heart,
  Bookmark,
} from "lucide-react";

type Collaborator = {
  name: string;
  initials: string;
  location: string;
  country: string;
  research: string;
};

export function CollaboratorCard({
  name,
  initials,
  location,
  country,
  research,

}: Collaborator) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      <CardContent className="pt-6">
        <div className="mx-auto mb-6 mt-2 h-28 w-28 rounded-full bg-gray-200" />
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <p className="text-base font-semibold">{name}</p>
           
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
      
            
        </div>
      </CardContent>
    </Card>
  );
}
