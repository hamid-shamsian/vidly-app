import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
   return (
      <table className='table table-striped'>
         <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
         />
         <TableBody columns={columns} data={data} />
      </table>
   );
};

export default Table;
