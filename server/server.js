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

app.post('/upload', async (req, res) => {
  const filePath = req.body.pathName;

  if (filePath.includes('package')) {
    try {
      updatePackageJson(filePath);
      res.status(200).json('upload endpoint');
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    try {
      startServer(require(filePath));
      console.log('new server start');
      res.status(200).json('upload endpoint');
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

async function startServer(schema) {
  const routes = app._router.stack;
  routes.forEach((route, i) => {
    if (route.handle.name === 'router') {
      routes.splice(i, 1);
    }
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      plugins,
      ApolloServerPluginInlineTrace(),
    ],
  });
  
  await server.start();
  
  server.applyMiddleware( {app, path:'/graphql'} );
}

app.listen(PORT, ()=> {
  console.log(`Server listening on port: ${PORT}...`);
});

module.export = app;
