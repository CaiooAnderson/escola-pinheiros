import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  imageUrl?: string;
  fallback?: string;
}

interface StaffSectionProps {
  directors: TeamMember[];
  coordinators: TeamMember[];
}

const StaffMemberCard = ({
  member,
  delay,
  avatarSize = "w-48 h-48",
}: {
  member: TeamMember;
  delay: number;
  avatarSize?: string;
}) => (
  <AnimatedSection direction="up" delay={delay}>
    <Card className="border-0 shadow-none bg-transparent relative">
      <CardContent className="p-0 flex flex-col items-center text-center">
        <Avatar className={`${avatarSize} mb-0`}>
          <AvatarImage
            src={member.imageUrl}
            alt={member.name}
            className="object-contain"
          />
          <AvatarFallback className="bg-transparent border-1 border-primary rounded-b-none">
            {member.fallback || <Users className="w-12 h-12 text-primary" />}
          </AvatarFallback>
        </Avatar>
        <Card className="w-3xs bg-primary text-text p-4 rounded-lg border-0 -mt-6 z-10 relative">
          <CardContent className="p-0">
            <div className="flex flex-col space-y-1 items-start">
              <span className="text-lg font-medium font-primary">
                {member.name}
              </span>
              <span className="text-sm font-secondary opacity-90">
                {member.role}
              </span>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </AnimatedSection>
);

export default function Staff({ directors, coordinators }: StaffSectionProps) {
  return (
    <div className="mb-16">
      <div className="mb-12">
        <h3 className="text-3xl font-bold font-primary text-primary-dark mb-8 text-center">
          Nossos Diretores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {directors.map((director, index) => (
            <StaffMemberCard
              key={director.name}
              member={director}
              delay={0.1 + index * 0.1}
              avatarSize="w-48 h-48"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold font-primary text-primary-dark mb-8 text-center">
          Nossos Coordenadores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coordinators.map((coordinator, index) => (
            <StaffMemberCard
              key={coordinator.name}
              member={coordinator}
              delay={0.3 + index * 0.1}
              avatarSize="w-40 h-40"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
