const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  union Footwear = Sneaker | Boot

  enum ShoeBrand {
    JORDAN
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  interface Shoe {
    brand: ShoeBrand!
    size: Int!
  }

  type Sneaker implements Shoe {
    brand: ShoeBrand!
    size: Int!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeBrand!
    size: Int!
    hasGrip: Boolean!
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
        {
          brand: "NIKE",
          size: 12,
          sport: "basketball",
        },
        {
          brand: "ADIDAS",
          size: 16,
          sport: "soccer",
        },
        {
          brand: "TIMBERLAND",
          size: 14,
          hasGrip: true,
        },
      ];
    },
  },
  Mutation: {
    createShoe(_, { input }) {
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      if (shoe.hasGrip) return "Boot";
    },
  },
  Footwear: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      if (shoe.hasGrip) return "Boot";
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
