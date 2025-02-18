import { Request, Response } from "express";
import { ListUserAccessService } from "../../services/access/ListUserAccessService";

export class ListUserAccessController {
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.user_id;

      const listUserAccessService = new ListUserAccessService();

      const accessList = await listUserAccessService.execute({ user_id });

      res.status(200).json(accessList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar acessos do usuário" });
    }
  }
}
