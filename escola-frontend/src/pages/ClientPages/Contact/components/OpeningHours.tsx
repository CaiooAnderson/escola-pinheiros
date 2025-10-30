import AnimatedSection from "@/components/animations/AnimatedSection";

const openingHours = [
  { day: "Segunda-feira", hours: "07:00–16:00" },
  { day: "Terça-feira", hours: "07:00–16:00" },
  { day: "Quarta-feira", hours: "07:00–16:00" },
  { day: "Quinta-feira", hours: "07:00–16:00" },
  { day: "Sexta-feira", hours: "07:00–16:00" },
  { day: "Sábado", hours: "Fechado" },
  { day: "Domingo", hours: "Fechado" },
];

export default function OpeningHours() {
  return (
    <AnimatedSection direction="up" delay={0.2}>
      <div className="bg-card rounded-xl shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl text-text font-semibold mb-4 text-center">
          Horário de Funcionamento
        </h2>
        <ul className="divide-y divide-gray-200">
          {openingHours.map((oh) => (
            <li
              key={oh.day}
              className="flex justify-between py-2 text-muted-dark font-medium"
            >
              <span>{oh.day}</span>
              <span>{oh.hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
