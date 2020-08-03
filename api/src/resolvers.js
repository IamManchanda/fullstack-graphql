/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pet(_, { input }, { models }) {
      return models.Pet.findOne(input);
    },
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input);
    },
    user(_, __, { models }) {
      return models.User.findOne();
    },
  },
  Mutation: {
    createPet(_, { input }, { models, user }) {
      const pet = models.Pet.create({ ...input, user: user.id });
      return pet;
    },
  },
  Pet: {
    owner(pet, _, { models }) {
      return models.User.findOne({ id: pet.user });
    },
    img(pet) {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
  },
  User: {
    pets(user, __, { models }) {
      return models.Pet.findMany({ user: user.id });
    },
  },
};
