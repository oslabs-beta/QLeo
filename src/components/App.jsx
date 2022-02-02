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
        id
        name
        }
      }
    }
`;

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <h1>QLEO</h1>
      <QueryInput 
        setQuery={setQuery}
      />
      <Display 
        query={query}
      />
    </div>
  );
}

export default App;
