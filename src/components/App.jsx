import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Display from './Display';
import QueryInput from './QueryInput';

import '../assets/css/App.css';

const GET_PEOPLE = gql`
  query {
    species(id: 1) {
      name
      homeworldId
      homeworld {
        name
        orbitalPeriod
      }
      people {
        name
        }
      }
    }
`;

function App() {
  const [query, setQuery] = useState('');
  const [sanitiziedStr, setSanitizedStr] = useState([]);
  const { loading, error, data } = useQuery(sanitiziedStr);
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const gqlString = gql`${query}`;

    
    setSanitizedStr(gqlString);

  };

  return (
    <div>
      <h1>QLEO</h1>
      <QueryInput 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        query={query}
      />
      <Display 
        query={query}
        data={data}
      />
    </div>
  );
}

export default App;
