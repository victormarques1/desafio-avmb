import { Status } from "@prisma/client";
import prisma from "../../prisma/prisma";

interface ApproveUserRequest {
  id: string;
  status: Status;
}

export class ApproveUserService {
  async execute({ id, status }: ApproveUserRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("Usuário inexistente.");
    }

    const approvedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        status,
      },
    });

    return approvedUser;
  }
}
