const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    books: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
  type Mutation {
    create(url: String!, desc: String!): Bookmark
    removeBook(id: ID!): Bookmark
  }
`;

const resolvers = {
  Query: {
    books: async (parents, args, context) => {
      try {
        let client = new faunadb.Client({
          secret: "fnAEAbn8YOACBQo5BJpn9MqmTkiwU8m8l1eCFwU2",
        });
        let result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("book"))),
            q.Lambda((x) => q.Get(x))
          )
        );

        return result.data.map((d) => {
          return {
            id: d.ref.id,
            url: d.data.url,
            desc: d.data.desc,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    create: async (_, { url, desc }) => {
      try {
        var client = new faunadb.Client({
          secret: "fnAEAbn8YOACBQo5BJpn9MqmTkiwU8m8l1eCFwU2",
        });
        const result = await client.query(
          q.Create(q.Collection("book"), {
            data: {
              url,
              desc,
            },
          })
        );
        return result.ref.data;
      } catch (err) {
        console.log(err);
      }
    },
    removeBook: async (_, args) => {
      try {
        var client = new faunadb.Client({
          secret: "fnAEAbn8YOACBQo5BJpn9MqmTkiwU8m8l1eCFwU2",
        });
        var result = await client.query(
          q.Delete(q.Ref(q.Collection("book"), args.id))
        );
        // console.log("Document Deleted : ", result.ref.id);
        return result.ref.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
