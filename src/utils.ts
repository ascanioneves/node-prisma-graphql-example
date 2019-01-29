import { Prisma } from "./generated/prisma-client";
import { verify } from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

export interface Context {
  prisma: Prisma;
  headers: IncomingHttpHeaders;
  userId: string;
}

export interface DataStoredInToken {
  userId: string;
  iat: number;
}

export async function getUserFromToken(token) {
  const [, bearer] = token.split(" ");
  const result = (await verify(bearer, "secret")) as DataStoredInToken;

  return result.userId;
}
