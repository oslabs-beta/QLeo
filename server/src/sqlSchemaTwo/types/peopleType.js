const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const db = require('../models/starwarsModel');
const speciesType = require('./speciesType');
const planetsType = require('./planetsType');


//  Create the people object
const peopleType = new GraphQLObjectType({
  name: 'people',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent, args) {
        return parent['_id'];
      }
    },
    name: { type: new GraphQLNonNull(GraphQLString) },
    mass: { type: GraphQLString },
    hairColor: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['hair_color'];
      }
    },
    skinColor: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['skin_color'];
      }
    },
    eyeColor: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['eye_color'];
      }
    },
    birthYear: {
      type: GraphQLString,
      resolve(parent, args) {
        return parent['birth_year'];
      }
    },
    gender: { type: GraphQLString },
    speciesId: {
      type: GraphQLID,
      resolve(parent, args) {
        return parent['species_id'];
      }
    },
    species:{
      type: speciesType,
      resolve(parent, args){
        // console.log(parent);
        const getSpecies = 'SELECT * FROM species WHERE _id = $1';
        return db.query(getSpecies, [parent['species_id']]).then(res => res.rows[0]);
      }
    },
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
    height: { type: GraphQLInt },
  })
});

module.exports = peopleType;