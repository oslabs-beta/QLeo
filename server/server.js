const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const { ApolloServer } = require('apollo-server');

const  PORT = 3000;

const LogPlugin = {
  requestDidStart(requestContext) {
    const start = Date.now();
    let op;

    return {
      didResolveOperation (context) {
        op = context.operationName;
      },
      willSendResponse (context) {
        const stop = Date.now();
        const elapsed = stop - start;
        const size = JSON.stringify(context.response).length * 2;
        context.response.extensions.performance = {'queryRuntime': elapsed};
        console.log(
          `Operation ${op} completed in ${elapsed} ms and returned ${size} bytes`
        );
      }
    };
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  plugins: [
    LogPlugin,
  ],
  formatResponse: (response, requestContext) => {
    //return response
    
    response = Object.assign(response, {
      extensions: {
        meta: {
          userId: 'aaa'
        }
      }
    });
    return response;
  }
});

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
