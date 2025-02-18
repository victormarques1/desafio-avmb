import { Request, Response } from "express";
import { RevokeAccessService } from "../../services/access/RevokeAccessService";

export class RevokeAccessController {
  async handle(req: Request, res: Response) {
    try {
      const { access_id } = req.params;

      const revokeAccessService = new RevokeAccessService();

      const revokedAccess = await revokeAccessService.execute({ access_id });

      res.status(200).json(revokedAccess);
    } catch (error) {
      console.error(error); // Log do erro para depuração
      res.status(500).json({ error: "Erro ao revogar acesso" });
    }
  }
}
