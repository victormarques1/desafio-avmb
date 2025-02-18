import { Router } from "express";

import { isAdmin, isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { GetUserscontroller } from "./controllers/user/GetUsersController";
import { ApproveUserController } from "./controllers/user/ApproveUserController";
import { CreateResourceController } from "./controllers/resource/CreateUserController";
import { GetResourcesController } from "./controllers/resource/GetResourcesController";
import { CreateAccessController } from "./controllers/access/CreateAccessController";
import { ListUserAccessController } from "./controllers/access/ListUserAccessController";
import { ListAllAccessController } from "./controllers/access/ListAllAccessController";
import { RevokeAccessController } from "./controllers/access/RevokeAccessController";
import { refreshToken } from "./utils/refreshToken";

const router = Router();

// Criar usuário
router.post("/api/users/new", new CreateUserController().handle);
// Realizar login
router.post("/api/login", new AuthUserController().handle);
// Listar usuarios
router.get(
  "/api/users",
  isAuthenticated,
  isAdmin,
  new GetUserscontroller().handle
);
//Aprovar um usuário
router.put(
  "/api/users/:user_id",
  isAuthenticated,
  isAdmin,
  new ApproveUserController().handle
);
//Criar um recurso
router.post(
  "/api/resources/new",
  isAuthenticated,
  isAdmin,
  new CreateResourceController().handle
);
//Listar recursos
router.get(
  "/api/resources",
  isAuthenticated,
  isAdmin,
  new GetResourcesController().handle
);
//Criar um acesso
router.post(
  "/api/access/new",
  isAuthenticated,
  isAdmin,
  new CreateAccessController().handle
);
//Listar acessos de usuário logado
router.get(
  "/api/user/access",
  isAuthenticated,
  new ListUserAccessController().handle
);
//Listar todos os acessos
router.get(
  "/api/access/all",
  isAuthenticated,
  isAdmin,
  new ListAllAccessController().handle
);
//Revogar acesso
router.put(
  "/api/access/revoke/:access_id",
  isAuthenticated,
  isAdmin,
  new RevokeAccessController().handle
);

//Refresh token
router.post("/api/auth/refresh-token", refreshToken);

export { router };
