const { PrismaClient } = require('@prisma/client')
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools')
const cors = require('cors')
const prisma = new PrismaClient();

const typeDefs = `
  type User {
    id      :ID!
    name    :String!
    email   :String!
  }
  type Link {
    id      :ID!
    url     :String!
    text    :String
    user    :User!
  }

  type Query {
    users: [User]
    links: [Link]
    user(id: ID!): User
    link(id: ID!): Link
  }

  type Mutation {
    createUser(
      email: String!
      name: String!
    ): User
    createLink(
      url: String!
      id: ID!
    ): Link
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    links: () => {
      return prisma.link.findMany();
    },
  },
  Mutation: {
      createUser: (parent, args, context, info) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      })
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors());
app.use('/graphql', cors() ,graphqlHTTP({
    schema: schema,
    context: {
      prisma
    },
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));