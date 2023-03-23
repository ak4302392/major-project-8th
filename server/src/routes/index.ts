// import { isAdmin, isAuthenticated } from "@/middlewares/auth";
import { Router } from "express";
// import admin from "./admin.route";
import auth from "./auth.routes";
import club from "./clubs.routes";
import event from "./events.routes";
// import user from "./user.routes";

const router = Router();

export default function (app: any) {
  app.use("/api/v1", router);
  router.use(auth);
  router.use(club);
  router.use(event);
  // router.use(isAuthenticated);
  // router.use(user);
  // router.use(isAdmin);
  // router.use(admin);
}
