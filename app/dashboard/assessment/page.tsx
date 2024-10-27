import AssessmentFilesUpload from "@/components/dashboard/AssessmentFileUpload";
import { getAllResults } from "@/data/student";

type AssessmentData = {
  _id: string;
  studentId: string;
  name: string;
  assessmentMarks: number[];
};

export default async function AssessmentPage() {
  const result = await getAllResults();
  const data: AssessmentData[] = result.data;

  const maxAttendanceMarks =
    data.length > 0 ? data[0].assessmentMarks.length : 0;

  return (
    <div className="container mx-auto mt-12">
      <div className="overflow-x-auto">
        {/* Upload button */}
        <AssessmentFilesUpload />
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
              const totalMarks = row.assessmentMarks.reduce(
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
                  {row.assessmentMarks.map((mark, index) => (
                    <td key={index} className="px-4 py-2 border">
                      {mark}
                    </td>
                  ))}
                  {[
                    ...Array(maxAttendanceMarks - row.assessmentMarks.length),
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
