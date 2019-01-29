import { config } from "dotenv";

config();

import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { AuthDirective } from "./directives/AuthDirective";
import { getUserFromToken } from "./utils";

import resolvers from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: async ({ request }) => {
    let userId = null;

    try {
      const token = request.headers.authorization;

      if (token) {
        userId = await getUserFromToken(token);
      }
    } catch (e) {}

    return {
      headers: request.headers,
      prisma,
      userId
    };
  },
  directiveResolvers: {
    auth: AuthDirective
  }
});

server.start();
