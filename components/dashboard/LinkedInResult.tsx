"use client";

import { useEffect, useState } from "react";
import LinkedinFilesUpload from "./LinkedinFileUpload";
import { getAllResults } from "@/data/student";

type LinkedinData = {
  _id: string;
  studentId: string;
  name: string;
  linkedInPostMarks: number[];
};

export default function LinkedInResult() {
  const [data, setData] = useState<LinkedinData[]>([]);

  const fetchResults = async () => {
    const result = await getAllResults();
    setData(result.data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const maxLinkedInMarks =
    data.length > 0 ? data[0].linkedInPostMarks.length : 0;

  return (
    <div className="container mx-auto mt-12">
      <div className="overflow-x-auto">
        {/* Upload button */}
        <LinkedinFilesUpload refreshResults={fetchResults} />
        <table className="min-w-full bg-white border border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border min-w-[150px]">
                Student Id
              </th>
              <th className="px-4 py-2 text-left border min-w-[150px]">
                Total
              </th>
              {Array.from({ length: maxLinkedInMarks }, (_, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left border min-w-[80px]"
                >{`A${index + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const totalMarks = row.linkedInPostMarks.reduce(
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
                  {row.linkedInPostMarks.map((mark, index) => (
                    <td key={index} className="px-4 py-2 border">
                      {mark}
                    </td>
                  ))}
                  {[
                    ...Array(maxLinkedInMarks - row.linkedInPostMarks.length),
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
