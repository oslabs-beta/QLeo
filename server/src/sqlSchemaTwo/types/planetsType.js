const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const db = require('../models/starwarsModel');

const planetsType = new GraphQLObjectType({
  name: 'planets',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent, args) {
        return parent['_id'];
      }
    },
    name: { type: GraphQLString },
    rotationPeriod: {
      type: GraphQLInt,
      resolve(parent, args) {
        return parent['rotation_period'];
      }
    },
    orbitalPeriod: {
      type: GraphQLInt,
      resolve(parent, args) {
        return parent['orbital_period'];
      }
    },
    diameter: { type: GraphQLInt },
    climate: { type: GraphQLString },
    gravity: { type: GraphQLString },
    terrain: { type: GraphQLString },
    surfaceWater: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['surface_water'];
      }
    },
    population: { type: GraphQLInt },
  }),
});

module.exports = planetsType;