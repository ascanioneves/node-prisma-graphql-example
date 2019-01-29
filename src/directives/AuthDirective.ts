import { AuthenticationError } from "apollo-server";
import { Context } from "../utils";
import { NextResolverFn } from "graphql-tools";

export async function AuthDirective(
  next: NextResolverFn,
  src,
  args,
  context: Context
) {
  if (!context || !context.userId) {
    throw new AuthenticationError("Invalid authentication token provided.");
  }

  return next();
}
