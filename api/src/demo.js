const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  enum ShoeBrand {
    JORDAN
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeBrand!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeBrand!
    size: Int!
    user: User!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeBrand!
    size: Int!
    user: User!
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

const user = {
  id: 1,
  email: "yoda@masters.com",
  avatar: "http://yoda.png",
  shoes: [],
};

const shoes = [
  {
    brand: "NIKE",
    size: 12,
    sport: "basketball",
    user: 1,
  },
  {
    brand: "TIMBERLAND",
    size: 14,
    hasGrip: true,
    user: 1,
  },
  {
    brand: "ADIDAS",
    size: 16,
    sport: "soccer",
    user: 1,
  },
];

const resolvers = {
  Query: {
    me() {
      return user;
    },
    shoes(_, { input }) {
      return shoes;
    },
  },
  Mutation: {
    createShoe(_, { input }) {
      return input;
    },
  },
  User: {
    shoes() {
      return shoes;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      if (shoe.hasGrip) return "Boot";
    },
  },
  Sneaker: {
    user(shoe) {
      return user;
    },
  },
  Boot: {
    user(shoe) {
      return user;
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
