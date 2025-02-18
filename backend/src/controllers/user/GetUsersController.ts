import { Request, Response } from "express";
import { GetUsersService } from "../../services/user/GetUsersService";

export class GetUserscontroller {
  async handle(req: Request, res: Response) {
    try {
      const getUsersService = new GetUsersService();

      const users = await getUsersService.execute();

      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
}
