import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import QueryInput from './QueryInput';
import Detail from './Detail';
import Schema from './Schema';
import GraphData from './GraphData';
import NavBar from './NavBar';


import '../css/App.css';

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

function App() {
  const [query, setQuery] = useState('');
  const [mutation, setMutation] = useState('');
  const [metrics, setMetrics] = useState({});

  return (
    <div>
      
      <div className="bg-gray-500 p-5 text-center">QLEO</div>
      <NavBar />
      <div className="main">
        <Schema />
        <QueryInput 
          setQuery={setQuery}
        />
        {
          query ? <GraphData query={gql`${query}`} metrics={metrics}/> 
            : mutation ? <GraphData mutation={gql`${mutation}`} /> 
              : <p>No results to display...</p> 
        }
        <p>GraphQL performance details</p>
        {
          // query ? <Detail query={gql`${query}`} /> 
          //   : mutation ? <Mutation mutation={gql`${mutation}`} /> 
          //     : <p>No results to display...</p> 
          query ? <Detail query={query} setGlobalMetrics={setMetrics}/> : <p>No results to display</p>
        }
      </div>
      
    </div>
  );
}

export default App;
