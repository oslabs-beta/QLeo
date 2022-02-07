const typeDefs = require('./src/sql/schema');
const resolvers = require('./src/sql/resolvers');
const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginInlineTrace } = require('apollo-server-core');
const plugins = require('./plugins/tracker');

const  PORT = 3000;

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  plugins: [
    plugins,
    ApolloServerPluginInlineTrace(),
  ],
});

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
