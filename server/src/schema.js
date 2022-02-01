const { gql } = require('apollo-server');

const typeDefs = gql`
  type People {
    id: Int!
    name: String!
    mass: String
    hairColor: String
    skinColor: String
    eyeColor: String
    birthYear: String
    gender: String
    speciesId: Int
    species: Species
    homeworldId: Int
    homeworld: Planets
    height: Int
  }

  type Species {
    id: Int!
    name: String!
    classification: String
    averageHeight: String
    averageLifespan: String
    hairColors: String
    skinColors: String
    eyeColors: String
    language: String
    homeworldId: Int
    homeworld: Planets
    people: [People]!
  }

  type Planets{
      id: Int!
      name: String
      rotationPeriod: Int
      orbitalPeriod: Int
      diameter: Int
      climate: String
      gravity: String
      terrain: String
      surfaceWater: String
      population: Int
  }

  type Query {
    people(id: Int!): People
    species(id: Int!): Species
    planets(id: Int!): Planets
  }
`;


// type Mutation {
//     createUser(name: String!, email: String!, password: String!): User!
//     createRecipe(
//       userId: Int!
//       title: String!
//       ingredients: String!
//       direction: String!
//     ): Recipe!
//   }

module.exports = typeDefs;
