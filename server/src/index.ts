import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { Query, Resolver, buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import express from "express";
import { UserResolver } from "./resolvers/UserResolver";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async helloWorld() {
    return "hello world";
  }
}

createConnection()
  .then(async () => {
    const schema = await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    });

    const apolloServer = new ApolloServer({
      schema,
    });

    const app = express();

    app.get("/", (_, res) => {
      res.send("server is working");
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("server started");
    });
  })
  .catch((error) => console.log(error));
