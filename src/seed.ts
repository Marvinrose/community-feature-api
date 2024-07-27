// src/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Define initial categories
  const categories = [
    "Kidney",
    "Headache",
    "Stomachache",
    "Leg Pain",
    "Malaria",
  ];

  // Check if categories already exist to avoid duplicates
  for (const categoryName of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: { name: categoryName },
      });
      console.log(`Category "${categoryName}" added.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
