import React from "react";
import { Table as SemanticTable } from "semantic-ui-react";

const TableHeader = ({ headerGroups }) => {

  // Remove the default column filter
  const renderColumn = (column) => {
    if (column.canFilter) {
      if (column.filter === "none") {
        return null;
      } else return column.render("Filter");
    } else return null;
  };

  return (
    <SemanticTable.Header>
      {headerGroups.map((headerGroup) => (
        <SemanticTable.Row {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <SemanticTable.HeaderCell {...column.getHeaderProps()}>
              <span {...column.getSortByToggleProps()}>
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </span>
              {/* Render the columns filter UI */}
              <div>{renderColumn(column)}</div>
            </SemanticTable.HeaderCell>
          ))}
        </SemanticTable.Row>
      ))}
    </SemanticTable.Header>
  );
};

export default TableHeader;
