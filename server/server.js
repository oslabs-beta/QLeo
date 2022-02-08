// const typeDefs = require('./src/sql/schema');
// const resolvers = require('./src/sql/resolvers');
const typeDefs = require('./src/mongo/schema');
const resolvers = require('./src/mongo/resolvers');

const express =  require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginInlineTrace } = require('apollo-server-core');
const plugins = require('./plugins/tracker');

const  PORT = 3000;

const app = express();

let server = null;
async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      plugins,
      ApolloServerPluginInlineTrace(),
    ],
  });
  await server.start();
  server.applyMiddleware( {app, path:'/graphql'} );
}
// const server = new ApolloServer({ 
//   typeDefs, 
//   resolvers,
//   plugins: [
//     plugins,
//     ApolloServerPluginInlineTrace(),
//   ],
// });
startServer();

// The `listen` method launches a web server.
app.listen(PORT, ()=> {
  console.log(`Server listening on port: ${PORT}...`);
});
