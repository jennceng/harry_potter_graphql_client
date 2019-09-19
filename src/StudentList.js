import React from "react";

const StudentList = ({ students }) => {
    // we know the shape of the return data based on the query, it will always be in a predictable shape because of the schema contract
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>house</th>
                    </tr>
                    {students.map(student => (
                        <tr key={student.id}>
                            <th>{student.name}</th>
                            <th>{student.house}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
