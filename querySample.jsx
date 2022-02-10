const GET_PEOPLE = gql`
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

const CREATE_PERSON = gql`
  mutation {
    createPerson(name: "Chon", hairColor: "green", eyeColor:"blue") {
      name
      hairColor
      eyeColor
      id
    }
  }
`;