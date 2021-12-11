import { useQuery, gql } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import "./App.css";

import debounce from "lodash.debounce";

function App() {
  const [inputName, setInputName] = useState("");

  const { loading, data, error, refetch } = useQuery(
    gql`
      query ($name: String!) {
        getUserByName(name: $name) {
          id
          firstName
          lastName
          age
        }
      }
    `,
    {
      variables: {
        name: "",
      },
    }
  );

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      refetch({
        name: searchTerm,
      });
    }, 500),
    [refetch]
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <input
        type="text"
        value={inputName}
        onChange={(e) => {
          setInputName(e.target.value);
          debouncedSearch(e.target.value);
        }}
        placeholder="Enter Name"
      />
      {loading ? (
        "loading"
      ) : (
        <>
          <table>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
            {data?.getUserByName?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  );
}

export default App;
