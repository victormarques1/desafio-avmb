import prisma from "../../prisma/prisma";

interface CreateAccessRequest {
  user_id: string;
  resource_id: string;
  expirationDate: Date;
}

export class CreateAccessService {
  async execute({ user_id, resource_id, expirationDate }: CreateAccessRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const resource = await prisma.resource.findFirst({
      where: {
        id: resource_id,
      },
    });

    if (!resource) {
      throw new Error("Recurso não encontrado.");
    }

    const access = await prisma.access.create({
      data: {
        expirationDate: new Date(expirationDate),
        user: {
          connect: {
            id: user_id,
          },
        },
        resource: {
          connect: {
            id: resource_id,
          },
        },
      },
    });

    return access;
  }
}
