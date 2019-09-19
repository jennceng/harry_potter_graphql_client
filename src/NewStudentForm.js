import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const GET_STUDENTS = gql`
    query {
        allStudents {
            id
            name
            house
        }
    }
`;
const CREATE_STUDENT = gql`
    mutation($name: String!, $guardian: String, $house: Houses) {
        createStudent(name: $name, guardian: $guardian, house: $house) {
            id
            name
            house
        }
    }
`;

const NewStudentForm = ({ houses }) => {
    const [name, updateName] = useState("");
    const [guardian, updateGuardian] = useState("");
    const [house, updateHouse] = useState(houses[0]);

    const addStudent = (client, { data: newStudentData }) => {
        const { allStudents } = client.readQuery({
            query: GET_STUDENTS
        });
        client.writeQuery({
            query: GET_STUDENTS,
            data: {
                allStudents: [...allStudents, newStudentData.createStudent]
            }
        });
        updateName("");
        updateGuardian("");
        updateHouse("");
    };
    const [createStudent] = useMutation(CREATE_STUDENT, {
        variables: { name, guardian, house },
        update: addStudent
    });

    const submitForm = e => {
        e.preventDefault();
        createStudent();
    };
    return (
        <form onSubmit={submitForm}>
            Name:
            <input
                name='name'
                value={name}
                onChange={e => updateName(e.target.value)}
            />
            Guardian:
            <input
                name='guardian'
                value={guardian}
                onChange={e => updateGuardian(e.target.value)}
            />
            House:
            <select value={house} onChange={e => updateHouse(e.target.value)}>
                {houses.map(h => (
                    <option key={h} value={h}>
                        {h}
                    </option>
                ))}
            </select>
            <button type='submit'>Create Student</button>
        </form>
    );
};

export default NewStudentForm;
