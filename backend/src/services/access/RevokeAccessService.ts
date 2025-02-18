import prisma from "../../prisma/prisma";

interface RevokeAccessRequest {
  access_id: string;
}

export class RevokeAccessService {
  async execute({ access_id }: RevokeAccessRequest) {
    const access = await prisma.access.findUnique({
      where: {
        id: access_id,
      },
    });

    if (!access) {
      throw new Error("Acesso não encontrado.");
    }

    if (access.status === "REVOKED" || access.expirationDate < new Date()) {
      return access;
    }

    const revokedAccess = await prisma.access.update({
      where: {
        id: access_id,
      },
      data: {
        status: "REVOKED",
      },
    });

    return revokedAccess;
  }
}
