import { Request, Response } from "express";
import { CreateResourceService } from "../../services/resource/CreateResourceService";

export class CreateResourceController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;

      const createResourceService = new CreateResourceService();

      const resource = await createResourceService.execute({
        name,
        description,
      });

      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar recurso" });
    }
  }
}
