"use client";

import AttendanceFileUpload from "@/components/dashboard/AttendanceFileUpload";
import { getAllResults } from "@/data/student";
import { useEffect, useState } from "react";

type AttendanceData = {
  _id: string;
  studentId: string;
  name: string;
  attendanceMarks: number[];
};

export default function AttendenceResult() {
  const [data, setData] = useState<AttendanceData[]>([]);

  const fetchResults = async () => {
    const result = await getAllResults();
    setData(result.data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const maxAttendanceMarks =
    data.length > 0 ? data[0].attendanceMarks.length : 0;

  return (
    <div className="container mx-auto mt-12">
      <div className="overflow-x-auto">
        {/* Upload button */}
        <AttendanceFileUpload refreshResults={fetchResults} />
        <table className="min-w-full bg-white border border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border min-w-[150px]">
                Student Id
              </th>
              <th className="px-4 py-2 text-left border min-w-[150px]">
                Total
              </th>
              {Array.from({ length: maxAttendanceMarks }, (_, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left border min-w-[80px]"
                >{`A${index + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const totalMarks = row.attendanceMarks.reduce(
                (acc, mark) => acc + mark,
                0
              );

              return (
                <tr key={row._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{row.studentId}</td>
                  <td className="px-4 py-2 border">
                    {/* Total */}
                    {totalMarks}
                  </td>
                  {row.attendanceMarks.map((mark, index) => (
                    <td key={index} className="px-4 py-2 border">
                      {mark}
                    </td>
                  ))}
                  {[
                    ...Array(maxAttendanceMarks - row.attendanceMarks.length),
                  ].map((_, index) => (
                    <td
                      key={`empty-${index}`}
                      className="px-4 py-2 border"
                    ></td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
