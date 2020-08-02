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
  },
  Mutation: {
    createPet(_, { input }, { models }) {
      const pet = models.Pet.create(input);
      return pet;
    },
  },
  Pet: {
    owner(_, __, { models }) {
      return models.User.findOne();
    },
    img(pet) {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
  },
  User: {
    pets(_, __, { models }) {
      return models.Pet.findMany();
    },
  },
};
