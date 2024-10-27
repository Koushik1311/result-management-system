"use client";

import { useState } from "react";
import { getSearchedResult } from "@/data/result";
import SearchButton from "./SearchButton";

type ResultTypes = {
  _id: string;
  studentId: string;
  name: string;
  attendanceMarks: number[];
  projectReviewMarks: number[];
  assessmentMarks: number[];
  projectSubmissionMarks: number[];
  linkedInPostMarks: number[];
  totalMarks: number;
};

export default function ResultSearch() {
  const [result, setResult] = useState<ResultTypes | null>(null);
  const [notFound, setNotFound] = useState(false);

  const searchResult = async (student_id: string) => {
    const response = await getSearchedResult(student_id);

    if (!response || !response.data) {
      setNotFound(true);
      setResult(null);
    } else {
      setResult(response.data);
      setNotFound(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const student_id = formData.get("student_id") as string;
    searchResult(student_id);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center">
        <input
          type="text"
          name="student_id"
          placeholder="Enter Certificate ID"
          required
          className="h-12 px-6 text-lg rounded-full border-2 border-violet-300 focus:outline-violet-400"
        />
        <SearchButton className="flex items-center justify-center w-36 h-12 rounded-full bg-violet-600 hover:bg-violet-500 transition-all duration-150 text-lg font-semibold text-white mt-6">
          Search
        </SearchButton>
      </form>

      {notFound && (
        <p className="text-red-600 mt-4 text-center">Result not found.</p>
      )}

      {result && (
        <div className="overflow-x-auto w-[95vw]">
          <table className="min-w-full divide-y divide-gray-200 mt-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Review Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Submission Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LinkedIn Post Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Marks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr key={result._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {result.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.attendanceMarks.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.projectReviewMarks.join(", ") || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.assessmentMarks.join(", ") || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.projectSubmissionMarks.join(", ") || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.linkedInPostMarks.join(", ") || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.totalMarks}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
