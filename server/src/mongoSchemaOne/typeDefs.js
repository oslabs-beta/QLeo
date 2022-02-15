const { gql } = require('apollo-server-express');

const typeDefs = gql `
type People {
    id: String!
    name: String!
    mass: String
    hairColor: String
    skinColor: String
    eyeColor: String
    birthYear: String
    gender: String
    speciesId: String
    species: Species
    homeworldId: Int
    homeworld: Planets
    height: Int
  }

  type Species {
    id: String!
    name: String!
    classification: String
    averageHeight: String
    averageLifespan: String
    hairColors: String
    skinColors: String
    eyeColors: String
    language: String
    homeworldId: String
    homeworld: Planets
    people: [People]!
  }

  type Planets{
      id: String!
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
    people(id: String!): People
    species(id: String!): Species
    planets(id: String!): Planets
  }

  type Mutation {
    createPerson(
      name: String!
      mass: String
      hairColor: String
      skinColor: String
      eyeColor: String
      birthYear: String
      gender: String
      height: Int
    ): People

    createSpecies(
      name: String!
      classification: String
      averageHeight: String
      averageLifespan: String
      hairColors: String
      skinColors: String
      eyeColors: String
      language: String
    ): Species
  
    createPlanet(
      name: String!
      rotationPeriod: Int
      orbitalPeriod: Int
      diameter: Int
      climate: String
      gravity: String
      terrain: String
      surfaceWater: String
      population: Int
    ): Planets
}
  
`;



module.exports = typeDefs;