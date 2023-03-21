import { RequestWithUser } from "@/types/request/requestWithUser";
import { decodeJWT } from "@/utils/jwt";
import { Response, NextFunction } from "express";

export const isAuthenticated = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { authorization: bearerToken } = req.headers;

    if (!bearerToken) {
      return res.status(401).send({
        message: "Please make sure your request has an Authorization header.",
      });
    }

    const [, authToken] = bearerToken.split(" ");
    const payload = await decodeJWT(authToken);

    req.user = {
      email: payload.email,
      name: payload.name,
      id: payload.id,
    };
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Please make sure your request has an correct Authorization header.",
    });
  }
};

export const isAdmin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        message: "Not authorized to access.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Please make sure your request has an correct Authorization header.",
    });
  }
};
