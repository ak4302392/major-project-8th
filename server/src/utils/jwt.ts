import CONFIG from "@/config";
import jwtPayload from "@/types/common/jwtPayload";
import jwt from "jwt-simple";

export const createJWT = function (data: jwtPayload, secret = CONFIG.AUTH.JWT_SECRET): string {
  return jwt.encode(data, secret);
};

export const decodeJWT = function (token: string, secret = CONFIG.AUTH.JWT_SECRET): jwtPayload {
  return jwt.decode(token, secret);
};
