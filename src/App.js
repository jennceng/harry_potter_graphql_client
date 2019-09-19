import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StudentList from "./StudentList";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import NewStudentForm from "./NewStudentForm";

export const GET_HOGWARTS_DATA = gql`
    query {
        allStudents {
            id
            name
            house
        }
        __type(name: "Houses") {
            enumValues {
                name
            }
        }
    }
`;
function App() {
    const { loading, error, data } = useQuery(GET_HOGWARTS_DATA);

    if (loading) {
        return <h2>Loading...</h2>;
    }
    if (error) {
        return <h2>{error.message}</h2>;
    }
    return (
        <div className='App'>
            <NewStudentForm
                houses={data["__type"].enumValues.map(h => h.name)}
            />
            <StudentList students={data.allStudents} />
        </div>
    );
}

export default App;
