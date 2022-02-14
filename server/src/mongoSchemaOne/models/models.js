const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://chonh226:Kcgopk226@cluster0.xwolc.mongodb.net/starwars?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'starwars'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'species' collection
const speciesSchema = new Schema({
  name: String,
  classification: String,
  average_height: String,
  average_lifespan: String,
  hair_colors: String,
  skin_colors: String,
  eye_colors: String,
  language: String,
  homeworld: String,
  homeworld_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'planet'
  }
},
{versionKey: false}
);

// creats a model for the 'species' collection that will be part of the export
const Species = mongoose.model('species', speciesSchema);

// TODO: create a schema for 'planet' and use it to create the model for it below
const planetSchema = new Schema({
  name: String,
  rotation_period: Number,
  orbital_period: Number,
  diameter: Number,
  climate: String,
  gravity: String,
  terrain: String,
  surface_water: String,
  population: Number
});

const Planet = mongoose.model('planet', planetSchema);

// TODO: create a schema for 'film' and use it to create the model for it below
const filmSchema = new Schema({
  title: String,
  episode_id: Number,
  opening_crawl: String,
  director: String,
  producer: String,
  release_date: Date,
});

const Film = mongoose.model('film', filmSchema);

// TODO: create a schema for 'person' and use it to create the model for it below
const personSchema = new Schema({
  name: { type: String, required: true },
  mass: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  gender: String,
  species: String,
  species_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'species'
  },
  
  homeworld: String,
  homeworld_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'planet'
  },
  height: Number,
  films: [{
    title: String,
    id: {
      // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
      type: Schema.Types.ObjectId,
      ref: 'film'
    }
  }]
},
{versionKey: false}
);

const Person = mongoose.model('person', personSchema);


// exports all the models in an object to be used in the controller
module.exports = {
  Species,
  Planet,
  Film,
  Person
};
