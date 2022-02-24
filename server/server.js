const express =  require('express');
const { ApolloServer } = require('apollo-server-express');
const plugins = require('./plugins/tracker');
const { updatePackageJson } = require('./utils/updatePackage');
const cors = require('cors');
const { fstat } = require('fs');
const fs = require('fs');
const { injectRequire } = require('./utils/injectPaths');

// Set port where we launch the server
const PORT = 3000;

// Create express app
const app = express();

// Allow cors
app.use(cors());

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Handler for upload request
app.post('/upload', async (req, res) => {
  // extract the filepath
  const filePath = req.body.pathName;

  // if it is a package.json file
  if (filePath.includes('package')) {
    try {
      // update our own package.json file
      updatePackageJson(filePath);
      // send a 200 response if succeeds
      res.status(200).json('upload endpoint');
    } catch (e) {
      // send a 500 response if an error occur
      res.status(500).json(e);
    }
  } 
  // else if it is a schema file
  else {
    
    try {

      

      const schema = injectRequire(filePath);
      
      // start the apollo server with the passed in schema
      startServer(require(filePath));

      // revert back the  changes that we did earlier
      console.log('new server start');

      
      // send a response with 200 if succeeds
      res.status(200).json('upload endpoints');
    } catch (e) {
      // send a 500 response if an error occur
      res.status(500).json(e);
    }
  }
});

// helper function for starting the server
async function startServer(schema) {
  // first clean up the previous apollo graphql router if it exists
  const routes = app._router.stack;
  routes.forEach((route, i) => {
    if (route.handle.name === 'router') {
      routes.splice(i, 1);
    }
  });

  // create a new apollo server with the given schema and the performance plugin we created
  const server = new ApolloServer({
    schema,
    plugins: [
      plugins,
    ],
  });
  
  // start the apollo server
  await server.start();
  
  // apply the graphql server a middleware to the express app
  server.applyMiddleware( {app, path:'/graphql'} );
}

// start the express app on the above port
app.listen(PORT, ()=> {
  console.log(`Server listening on port: ${PORT}...`);
});

module.export = app;
