import { Request, Response } from "express";
import { ApproveUserService } from "../../services/user/ApproveUserService";

export class ApproveUserController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { status } = req.body;

      const approveUserService = new ApproveUserService();

      const approvedUser = await approveUserService.execute({
        id: user_id,
        status,
      });

      res.status(201).json(approvedUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar status do usuário" });
    }
  }
}
