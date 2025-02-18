import prisma from "../../prisma/prisma";

export class ListAllAccessService {
  async execute() {
    const accessList = await prisma.access.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        resource: {
          select: {
            name: true,
          },
        },
      },
    });

    const validAccess = accessList.map((access) => ({
      id: access.id,
      userName: access.user.name,
      resourceName: access.resource.name,
      expirationDate: access.expirationDate,
      status:
        access.status === "REVOKED"
          ? "REVOKED"
          : access.expirationDate < new Date()
          ? "EXPIRED"
          : "ACTIVE",
    }));

    return validAccess;
  }
}
