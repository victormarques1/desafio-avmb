import { Request, Response } from "express";
import { CreateAccessService } from "../../services/access/CreateAccessService";

export class CreateAccessController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id, resource_id, expirationDate } = req.body;

      const createAccesService = new CreateAccessService();

      const access = await createAccesService.execute({
        user_id,
        resource_id,
        expirationDate,
      });

      res.status(201).json(access);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar acesso" });
    }
  }
}
