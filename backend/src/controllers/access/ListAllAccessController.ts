import { Request, Response } from "express";
import { ListAllAccessService } from "../../services/access/ListAllAccessService";

export class ListAllAccessController {
  async handle(req: Request, res: Response) {
    try {
      const listAllAccessService = new ListAllAccessService();

      const accessList = await listAllAccessService.execute();

      res.status(200).json(accessList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar todos os acessos" });
    }
  }
}
