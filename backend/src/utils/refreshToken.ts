import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import prisma from "../prisma/prisma";

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token não fornecido" });
  }

  try {
    const decoded = verify(refreshToken, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const newAccessToken = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: "15m",
      }
    );

    res.json({ token: newAccessToken });
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    res.status(401).json({ error: "Refresh token inválido" });
  }
};
