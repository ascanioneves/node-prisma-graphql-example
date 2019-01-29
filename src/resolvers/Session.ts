import { IResolvers } from "graphql-middleware/dist/types";
import { Context } from "../utils";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { AuthenticationError } from "apollo-server";

const resolvers: IResolvers = {
  Query: {
    me(parent, args, context: Context) {
      console.log(context.userId);
      return context.prisma.user({ id: context.userId });
    }
  },
  Mutation: {
    async createUser(parent, { name, email, password }, context: Context) {
      return context.prisma.createUser({
        name,
        email,
        password: await hash(password, 8)
      });
    },
    async authenticate(parent, { email, password }, context: Context, info) {
      const user = await context.prisma.user({ email });

      const valid = await compare(password, user.password);

      if (!valid) {
        throw new AuthenticationError("Incorrect credentials");
      }

      return {
        token: sign({ userId: user.id }, "secret"),
        user
      };
    }
  }
};

export default resolvers;
