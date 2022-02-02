const db = require('../models/starwarsModel');

const resolvers = {
  Query: {
    people: async (parent, args, context, info) => {
      const getPeople = 'SELECT * FROM people WHERE _id = $1';

      return await db.query(getPeople, [args.id])
        .then(res => {
          const data = {};
          const key = Object.keys(res.rows[0]);
          for (let i = 0; i < key.length; i++) {
            data[snakeToCamel(key[i])] = res.rows[0][key[i]];
          }
          // console.log(data);
          return data;
        });
    },
    species: getSpeciesById,
    planets: getPlanetsById,
  },
  People: {
    species: getSpeciesById,
    homeworld: getPlanetsById,
  },
  Species: {
    homeworld: getPlanetsById,
    people: async (parent, args, context, info) => {
      const getPeople = 'SELECT * FROM people WHERE species_id = $1';

      return await db.query(getPeople, [parent.id])
        .then(res => {
          const data = [];
          const key = Object.keys(res.rows[0]);
          for (let j = 0; j < res.rows.length; j++){
            const item = {};
            for (let i = 0; i < key.length; i++) {
              item[snakeToCamel(key[i])] = res.rows[j][key[i]];
            }
            data.push(item);
          }
          
          // console.log(data);
          return data;
        });
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  HELPER FUNCTIONS  ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

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

async function getSpeciesById (parent, args, context, info) {
  const getSpecies = 'SELECT * FROM species WHERE _id = $1';
  const id = args.id || parent.speciesId;
  return await db.query(getSpecies, [id])
    .then(res => {
      const data = {};
      const key = Object.keys(res.rows[0]);
      for (let i = 0; i < key.length; i++) {
        data[snakeToCamel(key[i])] = res.rows[0][key[i]];
      }
      // console.log(data);
      return data;
    });
}

async function getPlanetsById(parent, args, context, info) {
  const getPlanets = 'SELECT * FROM planets WHERE _id = $1';
  const id = args.id || parent.homeworldId;
  // console.log(id);
  return await db.query(getPlanets, [id])
    .then(res => {
      const data = {};
      if (typeof res.rows[0] === 'object'){
        const key = Object.keys(res.rows[0]);
        for (let i = 0; i < key.length; i++) {
          data[snakeToCamel(key[i])] = res.rows[0][key[i]];
        }
      }
      // console.log(data);
      return data;
    });
}

module.exports = resolvers;