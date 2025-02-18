import prisma from "../../prisma/prisma";

interface ListUserAccessRequest {
  user_id: string;
}

export class ListUserAccessService {
  async execute({ user_id }: ListUserAccessRequest) {
    const accessList = await prisma.access.findMany({
      where: {
        userId: user_id,
      },
      include: {
        resource: true,
      },
    });

    const validAccess = accessList.map((access) => ({
      id: access.id,
      resourceName: access.resource.name,
      expirationDate: access.expirationDate,
      status: access.expirationDate < new Date() ? "EXPIRED" : "ACTIVE",
    }));

    return validAccess;
  }
}
