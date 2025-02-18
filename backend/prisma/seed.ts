import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminName = "Admin";
  const adminEmail = "admin@admin.com";
  const adminPassword = "admin123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        status: "APPROVED",
      },
    });

    console.log("✅ Usuário administrador criado com sucesso!");
  } else {
    console.log("⚠️ Usuário administrador já existe. Nenhuma ação necessária.");
  }
}

main()
  .catch((e) => {
    console.error("Erro ao criar usuário administrador:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
