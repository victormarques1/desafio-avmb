import prisma from "../../prisma/prisma";

export class GetUsersService {
  async execute() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    });

    return users;
  }
}
