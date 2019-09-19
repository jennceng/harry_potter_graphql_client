import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StudentList from "./StudentList";
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

function App() {
  const { loading, error, data } = useQuery(GET_STUDENTS);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="App">
      <StudentList students={data.allStudents}/>
    </div>
  );
}

export default App;
