import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import QueryInput from './QueryInput';
import Detail from './Detail';

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

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <h1>QLEO</h1>
      <QueryInput 
        setQuery={setQuery}
      />
      <p>GraphQL performance details</p>
      {query ? <Detail query={query} /> : <p>No results to display..</p> }
    </div>
  );
}

export default App;
