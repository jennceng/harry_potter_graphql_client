import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_STUDENTS = gql`
  query {
    allStudents {
      id
      name
      house 
    }
  }
`;

const StudentList = () => {
  const { loading, error, data } = useQuery(GET_STUDENTS);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }

  // we know the shape of the return data based on the query, it will always be in a predictable shape because of the schema contract
  return (
    <table>
      <tbody>
      <tr>
        <th>name</th>
        <th>house</th>
      </tr>
      {data.allStudents.map(student => 
        <tr>
          <th>{student.name}</th>
          <th>{student.house}</th>
        </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentList;
