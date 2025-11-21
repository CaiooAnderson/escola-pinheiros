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
    <Card className="border-0 shadow-none bg-transparent relative group cursor-pointer">
      <CardContent className="p-0 flex flex-col items-center text-center">
        <Avatar
          className={`${avatarSize} mb-0 border-1 border-primary bg-primary-light transition-all duration-500 group-hover:scale-110 group-hover:border-2 group-hover:border-primary-dark group-hover:shadow-lg`}
        >
          <AvatarImage
            src={member.imageUrl}
            alt={member.name}
            className="object-contain transition-all duration-500 group-hover:scale-105"
          />
          <AvatarFallback className="bg-transparent border-1 border-primary rounded-b-none transition-all duration-500 group-hover:scale-105 group-hover:border-primary-dark">
            {member.fallback || (
              <Users className="w-12 h-12 text-primary transition-all duration-500 group-hover:scale-110" />
            )}
          </AvatarFallback>
        </Avatar>
        <Card className="w-3xs bg-primary-dark text-text p-4 rounded-lg border-0 -mt-6 z-10 relative transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:bg-primary group-hover:shadow-xl">
          <CardContent className="p-0">
            <div className="flex flex-col space-y-1 items-start">
              <span className="text-lg font-medium font-primary transition-all duration-500 group-hover:text-background">
                {member.name}
              </span>
              <span className="text-sm font-secondary opacity-90 transition-all duration-500 group-hover:text-background group-hover:opacity-100">
                {member.role}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
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
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {directors.map((director, index) => (
            <div key={director.name} className="flex justify-center">
              <StaffMemberCard
                member={director}
                delay={0.1 + index * 0.1}
                avatarSize="w-48 h-48"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold font-primary text-primary-dark mb-8 text-center">
          Nossos Coordenadores
        </h3>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {coordinators.map((coordinator, index) => (
            <div key={coordinator.name} className="flex justify-center">
              <StaffMemberCard
                member={coordinator}
                delay={0.3 + index * 0.1}
                avatarSize="w-40 h-40"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
