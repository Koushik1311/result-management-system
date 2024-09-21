// import Marks from "@/components/global/Marks";

export default function AttendancePage() {
  const data = [
    {
      action: "View",
      studentId: "S12345",
      a1: 85,
      a2: 90,
      a3: 78,
      a4: 88,
      a5: 92,
      a6: 92,
      a7: 92,
    },
    {
      action: "Edit",
      studentId: "S67890",
      a1: 75,
      a2: 80,
      a3: 85,
      a4: 70,
      a5: 95,
      a6: 70,
      a7: 95,
    },
    // Add more data as needed
  ];

  return (
    <div className="container mx-auto mt-12">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border min-w-[100px]">
                Action
              </th>
              <th className="px-4 py-2 text-left border min-w-[150px]">
                Student Id
              </th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A1</th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A2</th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A3</th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A4</th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A5</th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A6</th>
              <th className="px-4 py-2 text-left border min-w-[80px]">A7</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{row.action}</td>
                <td className="px-4 py-2 border">{row.studentId}</td>
                <td className="px-4 py-2 border">{row.a1}</td>
                <td className="px-4 py-2 border">{row.a2}</td>
                <td className="px-4 py-2 border">{row.a3}</td>
                <td className="px-4 py-2 border">{row.a4}</td>
                <td className="px-4 py-2 border">{row.a5}</td>
                <td className="px-4 py-2 border">{row.a6}</td>
                <td className="px-4 py-2 border">{row.a7}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
