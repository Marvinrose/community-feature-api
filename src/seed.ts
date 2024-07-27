// seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create multiple users
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Marvin", email: "rozzeymarvin32@gmail.com" },
      { name: "Samuel Uchenna", email: "uchenna@gmail.com" },
      { name: "Dr. Joseph Brostito", email: "joseph@test.com" },
    ],
  });

  console.log("Users added successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
