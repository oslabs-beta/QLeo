const { Person, Species, Planet } = require('./models/models.js');
const typeDefs = require('./typeDefs.js');

const resolvers = {
  Query: {
    people: getPeopleById,
    species: getSpeciesById,
    planets: getPlanetsById,
  },
  People: {
    species: getSpeciesById,
    homeworld: getPlanetsById,
  },
  Species: {
    homeworld: getPlanetsById,
    people: async function (parent, args, context, info) {
      const res = await Person.find({ species_id: parent.id });
      const data = [];
      const keys = Object.keys(res[0]['_doc']); 
      for (let i = 0; i < res.length; i++) {
        const people = {};

        for (let j = 0; j < keys.length; j++) {
          people[snakeToCamel(keys[j])] = res[i][keys[j]];
        }
        data.push(people);
      }
      return data;   
    }
  },
  Mutation: {
    createPerson: async(_, args) => {
      try {
        const response = await Person.create({
          name: args.name,
          mass: args.mass,
          hair_color: args.hairColor,
          skin_color: args.skinColor,
          eye_color: args.eyeColor,
          birth_year: args.birthYear,
          gender: args.gender,
          height: args.height
        });
        const data = singleResponseModification(response);
        return data;
      } 
      catch (error) {
        return error.message;
      }
    },
    createSpecies: async (_, args) => {
      try {
        const response = await Species.create({
          name: args.name,
          classification: args.classification,
          average_height: args.averageHeight,
          average_lifespan: args.averageLifespan,
          hair_colors: args.hairColors,
          skin_colors: args.skinColors,
          eye_colors: args.eyeColors,
          language: args.language,
        });
        const data = singleResponseModification(response);
        return data;
      }
      catch (error) {
        return error.message;
      }
    },
    createPlanet: async (_, args) => {
      try {
        const response = await Planet.create({
          name: args.name, 
          rotationPeriod: args.rotationPeriod,
          orbitalPeriod: args.orbitalPeriod,
          diameter: args.diameter,
          climate: args.climate,
          gravity: args.gravity,
          terrain: args.terrain,
          surfaceWater: args.surfaceWater,
          population: args.population,
        });
        const data = singleResponseModification(response);
        return data;
      }
      catch (error) {
        return error.message;
      }
    }
  }
};


async function getPeopleById(parent, args, context, info) {
  try {
    const res = await Person.find({ _id: args.id });
    const data = singleResponseModification(res[0]);
    return data;
  } catch (error) {
    return console.log(error);
  }
}

async function getSpeciesById(parent, args, context, info) {
  const id = args.id || parent.speciesId;
  try {
    const res = await Species.find({ _id: id });
    const data = singleResponseModification(res[0]);
    return data;
  } catch (error) {
    return console.log(error);
  }
}

async function getPlanetsById(parent, args, context, info) {
  const id = args.id || parent.homeworldId;
  try {
    const res = await Planet.find({ _id: id });
    const data = singleResponseModification(res[0]);
    return data;
  } catch (error) {
    return console.log(error);
  }
}


function snakeToCamel(str) {
  //Create an empty string to store the result
  let result = '';
  //Create an indicator to check if we need to Capitalize the next character
  let needCapitalize = false;

  //loop over the characters and set needCapitalize to true if we have an underscore
  //if the character is not an underscore, capitalize the character if needCapitalize is true and set it to false after
  // then add the character to the result string

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '_') {
      if (i !== 0) needCapitalize = true;
    } else if (needCapitalize === true) {
      result += str[i].toUpperCase();
      needCapitalize = false;
    } else {
      result += str[i];
    }
  }
  return result;
}

function singleResponseModification(response){
  const content = Object.assign({}, response['_doc']); //creates a const var named content to get the obj that is in 'response[_doc]' which stores all our data that we want since res comes with three other keys including all the other weird stuff 
  const data = {}; //create a new obj that we later want to return 
  const key = Object.keys(content); //grab all the keys from that obj we grabbed from response[docs] so that we can convert the "hair_color" to 'hairColor' to match our schema 'naming'
  for (let i = 0; i < key.length; i++) { //we iterate through the keys since 
    data[snakeToCamel(key[i])] = content[key[i]]; //and we store in data: {key(that we convert to camelcase) with the res obj value}
  }
  return data; //so we can return the data that can match our schema's camel keys :) 
}
module.exports = resolvers;