export default function ExpenseTable({ expenses }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      
      {/* Title */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Expense History
        </h2>

        <span className="text-sm text-gray-500">
          Total: {expenses.length} transactions
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          
          {/* Header */}
          <thead>
            <tr className="bg-gray-50 text-left text-sm uppercase tracking-wide text-gray-500">
              <th className="p-4 rounded-l-xl">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Month</th>
              <th className="p-4 rounded-r-xl">Week</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                  }`}
                >
                  <td className="p-4 text-gray-700 font-medium">
                    {item.date}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                      ${item.amount}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {item.month}
                  </td>

                  <td className="p-4 text-gray-600">
                    Week {item.week}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400"
                >
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}