import { Request, Response, Router } from "express";
import {
  handleRefreshToken,
  userLogin,
  userRegister,
} from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";

const route = Router();

route.post("/signup", userRegister);
route.post("/signin", userLogin);
route.post("/refresh", handleRefreshToken);

export default route;
