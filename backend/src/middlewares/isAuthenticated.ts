import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
  role: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub, role } = verify(token, process.env.JWT_SECRET) as Payload;

    req.user_id = sub;
    req.user_role = role;

    return next();
  } catch (error) {
    res.status(401).end();
    return;
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user_role !== "ADMIN") {
    return res.status(403).json({ mensagem: "Usuário não autorizado" });
  }
  next();
}
