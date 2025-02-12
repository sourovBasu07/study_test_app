"use client";

import { useGetAllStudentsQuery } from "@/lib/apiSlices/studentApi";
import { StudentDocument } from "@/types/SchemaTypes";

const StudentsList = () => {
  const { data: students, isLoading } = useGetAllStudentsQuery("students");

  if (isLoading) return null;

  return (
    <div className="">
      {students.data.map((student: StudentDocument) => (
        <div key={student._id} className="">
          {student.studentName}
        </div>
      ))}
    </div>
  );
};
export default StudentsList;
