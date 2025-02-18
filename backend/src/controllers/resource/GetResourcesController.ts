import { Request, Response } from "express";
import { GetResourcesService } from "../../services/resource/GetResourcesService";

export class GetResourcesController {
  async handle(req: Request, res: Response) {
    try {
      const getResourcesService = new GetResourcesService();

      const resources = await getResourcesService.execute();

      res.status(201).json(resources);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar recurso" });
    }
  }
}
