import React from "react";

const StudentList = ({ students }) => {

  return (
    <table>
      <tbody>
      <tr>
        <th>name</th>
        <th>house</th>
      </tr>
      {students.map(student =>
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
