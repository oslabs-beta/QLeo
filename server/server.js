const typeDefs = require('./src/mongo/schema');
const resolvers = require('./src/mongo/resolvers');

const express =  require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginInlineTrace } = require('apollo-server-core');
const plugins = require('./plugins/tracker');
const { updatePackageJson } = require('./utils');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/updateJson', (req, res) => {
  const filePath = req.body.pathName;
  // const pathName = '/Users/andrewtalle/Codesmith/core-curriculum/unit-7-react-redux/package.json';
  
  console.log(req.body);

  
  res.status(200).json('Updated npm dependencies');

  try {
    updatePackageJson(filePath);
  } catch (e) {
    res.status(500).json(e);
  }
});


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

startServer();


// The `listen` method launches a web server.
app.listen(PORT, ()=> {
  console.log(`Server listening on port: ${PORT}...`);
});
