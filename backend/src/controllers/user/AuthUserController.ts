import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authUserService = new AuthUserService();

      const auth = await authUserService.execute({
        email,
        password,
      });

      res.status(201).json(auth);
    } catch (error) {
      res.status(500).json({ error: "Erro ao autenticar usuário" });
    }
  }
}
