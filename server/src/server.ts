import * as express from "express";

import { Server, createServer } from "http";

import CONFIG from "./config";

export const startServer = (app: express.Application): Server => {
  const httpServer = createServer(app);

  return httpServer.listen({ port: CONFIG.APP.PORT }, (): void => {
    console.log(`Application Environment: ${CONFIG.APP.ENV}\n`);
    console.log(`Server ready at http://localhost:${CONFIG.APP.PORT}\n`);
  });
};
