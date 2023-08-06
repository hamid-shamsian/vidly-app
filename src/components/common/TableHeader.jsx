import { Component } from "react";

class TableHeader extends Component {
   raiseSort = path => {
      const { sortColumn, onSort } = this.props;
      const newSortColumn = { path };
      newSortColumn.order =
         path === sortColumn.path
            ? sortColumn.order === "asc"
               ? "desc"
               : "asc"
            : "asc";
      onSort(newSortColumn);
   };

   renderSortIcon = column => {
      const { sortColumn } = this.props;
      if (column.path !== sortColumn.path) return null;
      if (sortColumn.order === "asc") return <i className='fa fa-sort-asc'></i>;
      return <i className='fa fa-sort-desc'></i>;
   };

   render() {
      return (
         <thead className='thead-light'>
            <tr>
               {this.props.columns.map(column => (
                  <th
                     key={column.label || column.key}
                     className={column.label ? "clickable" : ""}
                     onClick={() =>
                        column.path ? this.raiseSort(column.path) : null
                     }
                  >
                     {column.label} {this.renderSortIcon(column)}
                  </th>
               ))}
            </tr>
         </thead>
      );
   }
}

export default TableHeader;
