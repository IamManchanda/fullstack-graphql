const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Shoe {
    brand: String!
    size: Int!
  }

  input ShoesInput {
    brand: String
    size: Int
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
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
        { brand: "Nike", size: 12 },
        { brand: "Nike", size: 14 },
        { brand: "Adidas", size: 12 },
        { brand: "Adidas", size: 14 },
      ].filter((shoe) => shoe.brand === input.brand);
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
