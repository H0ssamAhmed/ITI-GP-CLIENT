const DashboardTable = ({ columns, data, renderRow }) => {
  return (
    <table className="w-full mt-4 table-auto">
      <thead>
        <tr className="text-sm text-right text-gray-500 ">
          {columns.map((column) => (
            <th key={column.accessor} className={column.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
    </table>
  );
};

export default DashboardTable;
