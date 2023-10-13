import { JWT_SECRET } from "./env";

export const MAX_AGE = 86400;
export const JWT_CONFIG = {
  name: "jwt",
  secret: JWT_SECRET,
};
