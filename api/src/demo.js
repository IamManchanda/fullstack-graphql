const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  enum ShoeBrand {
    JORDAN
    NIKE
    ADIDAS
  }

  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Shoe {
    brand: ShoeBrand!
    size: Int!
  }

  input ShoesInput {
    brand: ShoeBrand
    size: Int
  }

  input CreateShoeInput {
    brand: ShoeBrand!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    createShoe(input: CreateShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: "yoda@masters.com",
        avatar: "http://yoda.png",
        friends: [],
      };
    },
    shoes(_, { input }) {
      return [
        { brand: "NIKE", size: 12 },
        { brand: "NIKE", size: 14 },
        { brand: "ADIDAS", size: 12 },
        { brand: "ADIDAS", size: 14 },
      ].filter((shoe) => shoe.brand === input.brand);
    },
  },
  Mutation: {
    createShoe(_, { input }) {
      return input;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4001).then(() => {
  console.log("Server listening on port 4001");
});
