const first = `
  query {
    species(id: "5d963c76273db10a425ce9ac") {
      name
      people {
        id
        name
        species {
            name
            homeworld {
                name
            }
        }
      }
    }
  }
`;

const second = `
query {
  species(id: "5d963c76273db10a425ce9c8") {
    name
    people {
      species {
          name
      }
    }
  }
}
`; 


const CREATE_PERSON = `
  mutation {
    createPerson(name: "Chon", hairColor: "green", eyeColor:"blue") {
      name
      hairColor
      eyeColor
      id
    }
  }
`;