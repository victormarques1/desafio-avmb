import { compare } from "bcrypt";
import prisma from "../../prisma/prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email incorreto");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    if (user.status !== "APPROVED") {
      throw new Error(
        "Usuário não possui permissão para realizar login na aplicação."
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("Chave JWT não configurada");
    }

    // gera o access token
    const token = sign(
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

    // refresh token
    const refreshToken = sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token: token,
      refreshToken: refreshToken,
    };
  }
}
