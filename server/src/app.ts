import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { init } from "./boundaries/email";

export const createApp = (): express.Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  // API Routes
  routes(app);

  // init SMTP
  init();

  return app;
};
