const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const { ApolloServer } = require('apollo-server');

const  PORT = 3000;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
});

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
