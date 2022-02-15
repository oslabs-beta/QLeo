const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLSchema } = require('graphql');
const _ = require('lodash');
const db = require('./models/starwarsModel');
const peopleType = require('./types/peopleType');
const speciesType = require('./types/speciesType');
const planetsType = require('./types/planetsType');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    people: {
      type: peopleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // console.log(args.id);
        const getPeople = 'SELECT * FROM people WHERE _id = $1';
        return db.query(getPeople, [args.id]).then(res => res.rows[0]);
      }
    },
    species: {
      type: speciesType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // console.log(args.id);
        const getSpecies = 'SELECT * FROM species WHERE _id = $1';
        return db.query(getSpecies, [args.id]).then(res => res.rows[0]);
      }
    },
    planets: {
      type: planetsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // console.log(args.id);
        const getHomeworld = 'SELECT * FROM planets WHERE _id = $1';
        return db.query(getHomeworld, [args.id]).then(res => res.rows[0]);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});