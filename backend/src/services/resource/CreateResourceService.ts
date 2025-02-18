import { hash } from "bcrypt";
import prisma from "../../prisma/prisma";

interface ResourceRequest {
  name: string;
  description?: string;
}

export class CreateResourceService {
  async execute({ name, description }: ResourceRequest) {
    if (!name) {
      throw new Error("Insira um nome para o recurso");
    }

    const resource = await prisma.resource.create({
      data: {
        name: name,
        description: description,
      },
    });

    return resource;
  }
}
