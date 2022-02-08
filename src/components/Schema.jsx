import React from 'react';
import { gql, useQuery } from '@apollo/client';

const introQuery = gql `
  {
    __schema {
      queryType{
        fields{
          name
        }
      }
      mutationType{
        fields{
          name
        }
      }
    }
  }
`;

// const DropDown = ({ obj, indent }) => {
//   if (typeof obj !== 'object') return <p>{obj}</p>;
    
//   return (
//     <>
//       {Object.keys(obj).map(key => {
//         const [toggle, setToggle] = useState(false);
//         if (typeof obj[key] !== 'object') {
//           return (
//             <div>
//               <p>{key}: {obj[key]}</p>
//             </div>
//           );
//         }

//         return (
//           <div key={key} style={{ textIndent: `${indent}em` }}>
//             <button onClick={() => setToggle(prev => !prev)}>{key}</button>
//             {toggle && <DropDown obj={obj[key]} indent={++indent} />}
//           </div>
//         );
//       })}
//     </>
//   );
// };

function Schema() {
  const { loading, error, data } = useQuery(introQuery);  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error}</p>;
  }
  console.log(data);

  return (
    <div className="schema">
      <h1>schemamamaaa column</h1>
      <h2>root query </h2>
    </div>
  );
}

export default Schema;