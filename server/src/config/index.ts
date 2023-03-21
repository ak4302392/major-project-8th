import config from "../types/common/config";
import pkg from "../../package.json";

require("dotenv").config();

const CONFIG: config = {
  APP: {
    NAME: pkg.name,
    VERSION: pkg.version,
    DESCRIPTION: pkg.description,
    AUTHORS: pkg.authors,
    HOST: process.env.APP_HOST,
    BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.PORT || 4001,
    ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
  },
  SMTP: {
    HOST: process.env.SMTP_HOST || "",
    PORT: parseInt(process.env.SMTP_PORT || ""),
    AUTH_USER: process.env.SMTP_AUTH_USER || "",
    AUTH_PASS: process.env.SMTP_AUTH_PASS || "",
    FROM: process.env.SMTP_FROM || "",
  },
  DB: {
    URL: process.env.MONGODB_URL,
  },
  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET || "major-project",
  },
};

export default CONFIG;
