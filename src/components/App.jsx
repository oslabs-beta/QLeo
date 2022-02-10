import React, { useState } from 'react';
import { render } from 'react-dom';
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { gql } from '@apollo/client';
import QueryInput from './QueryInput';
import Detail from './Detail';
import Schema from './Schema';
import GraphData from './GraphData';
import NavBar from './NavBar';
import FileUpload from './FileUpload';


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
  const [metrics, setMetrics] = useState({});

  return (
    <div>
      <Router>

        <NavBar />
        <div className="main">
          <Schema />
          <FileUpload />
          <QueryInput 
            setQuery={setQuery}
          />
          {
            query ? <GraphData query={gql`${query}`} metrics={metrics}/> 
              : <p>No results to display...</p> 
          }
          <p>GraphQL performance details</p>
          {
            query ? <Detail query={query} setGlobalMetrics={setMetrics}/> : <p>No results to display</p>
          }
        </div>

      </Router>
    </div>
  );
}

export default App;
