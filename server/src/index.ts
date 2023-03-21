// ! Don't convert require into import
require("module-alias/register");
const moduleAlias = require("module-alias");

moduleAlias.addAlias("@", __dirname);

import { createApp } from "./app";
import { startServer } from "./server";
import { connectDB } from "./db";

(async () => {
  await connectDB();
  const app = createApp();

  startServer(app);
})().catch((err) => {
  console.error(err);
});
