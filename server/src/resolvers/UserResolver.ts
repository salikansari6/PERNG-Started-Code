import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ILike } from "typeorm";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUserByName(@Arg("name") name: string) {
    return User.find({
      where: {
        firstName: ILike(`${name}%`),
      },
    });
  }

  @Query(() => User)
  async getUser(@Arg("id") id: number) {
    return User.findOne(id);
  }

  @Query(() => [User])
  async getUsers() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("age") age: number
  ) {
    return User.create({ firstName, lastName, age }).save();
  }
}
