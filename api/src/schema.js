const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  enum PetType {
    CAT
    DOG
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: PetType!
    img: String
    owner: User!
  }

  input PetsInput {
    type: PetType
  }

  input PetInput {
    id: ID!
  }

  input CreatePetInput {
    name: String!
    type: PetType!
  }

  type Query {
    user: User!
    pet(input: PetInput): Pet
    pets(input: PetsInput): [Pet]!
  }

  type Mutation {
    createPet(input: CreatePetInput!): Pet!
  }
`;

module.exports = typeDefs;
