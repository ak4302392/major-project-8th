import {
  createUser,
  getUserById,
  login,
  loginWithGoogle,
} from "@/controllers/auth";
import { Router } from "express";

const auth = Router();

auth.post("/auth/login", login);

auth.post("/auth/login-google", loginWithGoogle);

auth.post("/auth/sign-up", createUser);

auth.get("/auth/getUserById", getUserById);

export default auth;
