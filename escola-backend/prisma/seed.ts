import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const passeios = await prisma.eventCategory.upsert({
    where: { name: "Passeios" },
    update: {},
    create: { name: "Passeios" },
  });

  const reunioes = await prisma.eventCategory.upsert({
    where: { name: "Reunião de Pais" },
    update: {},
    create: { name: "Reunião de Pais" },
  });

  const palestras = await prisma.eventCategory.upsert({
    where: { name: "Palestras" },
    update: {},
    create: { name: "Palestras" },
  });

  const feiraCiencias = await prisma.eventCategory.upsert({
    where: { name: "Feira de Ciências" },
    update: {},
    create: { name: "Feira de Ciências" },
  });

  const eventosEsportivos = await prisma.eventCategory.upsert({
    where: { name: "Eventos Esportivos" },
    update: {},
    create: { name: "Eventos Esportivos" },
  });

  console.log(
    "Categorias de Eventos criadas:",
    passeios.name,
    reunioes.name,
    palestras.name,
    feiraCiencias.name,
    eventosEsportivos.name
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
