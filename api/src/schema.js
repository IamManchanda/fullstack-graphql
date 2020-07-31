const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    img: String
  }

  input PetsInput {
    name: String
    type: String
  }

  input PetInput {
    id: ID!
  }

  input CreatePetInput {
    name: String!
    type: String!
  }

  type Query {
    pet(input: PetInput): Pet
    pets(input: PetsInput): [Pet]!
  }

  type Mutation {
    createPet(input: CreatePetInput!): Pet!
  }
`;

module.exports = typeDefs;
