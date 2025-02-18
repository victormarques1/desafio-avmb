import prisma from "../../prisma/prisma";

export class GetResourcesService {
  async execute() {
    const resources = await prisma.resource.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return resources;
  }
}
