import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import QueryInput from './QueryInput';
import Detail from './Detail';
import Mutation from './Mutation';

import '../assets/css/App.css';

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
    createPerson(name: "Chon", hairColor: "sdfg", eyeColor:"22323") {
      name
      hairColor
      eyeColor
      id
    }
  }
`;

function App() {
  const [query, setQuery] = useState('');
  const [mutation, setMutation] = useState('');

  return (
    <div>
      <h1>QLEO</h1>
      <QueryInput 
        setQuery={setQuery}
        setMutation={setMutation}
      />
      <p>GraphQL performance details</p>
      {
        query ? <Detail query={gql`${query}`} /> 
          : mutation ? <Mutation mutation={gql`${mutation}`} /> 
            : <p>No results to display...</p> 
      }
    </div>
  );
}

export default App;
