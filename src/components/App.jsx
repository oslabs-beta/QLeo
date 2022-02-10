import React, { useState } from 'react';
import { render } from 'react-dom';
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { gql } from '@apollo/client';
import NavBar from './Navbar';
import MainContainer from '../containers/MainContainer';
import UploadContainer from '../containers/UploadContainer';
import PerformanceContainer from '../containers/PerformanceContainer';


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

        <Routes>
          <Route path='/' element={<MainContainer query={query} metrics={metrics} setQuery={setQuery} setMetrics={setMetrics}/>} />
          <Route path='/upload' element={<UploadContainer query={query} metrics={metrics}/>} />
          <Route path='/performance' element={<PerformanceContainer query={query} metrics={metrics}/>}/>
          {/* <Route path='/links' element={<LinksContainer/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
