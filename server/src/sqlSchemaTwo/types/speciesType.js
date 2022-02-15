const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const db = require('../models/starwarsModel');
const peopleType = require('./peopleType');
const planetsType = require('./planetsType');


const speciesType = new GraphQLObjectType({
  name: 'species',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent, args) {
        return parent['_id'];
      }
    },
    name: { type: new GraphQLNonNull(GraphQLString) },
    classification: { type: GraphQLString },
    averageHeight: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['average_height'];
      }
    },
    averageLifespan: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['average_lifespan'];
      }
    },
    hairColors: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['hair_colors'];
      }
    },
    skinColors: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['skin_colors'];
      }
    },
    eyeColors: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['eye_colors'];
      }
    },
    language: { type: GraphQLString },
    homeworldId: {
      type: GraphQLID,
      resolve(parent, args) {
        return parent['homeworld_id'];
      }
    },
    homeworld:{
      type: planetsType,
      resolve(parent, args){
        // console.log(parent);
        const getHomeworld = 'SELECT * FROM planets WHERE _id = $1';
        return db.query(getHomeworld, [parent['homeworld_id']]).then(res => res.rows[0]);
      }
    },
  })
});

module.exports = speciesType;