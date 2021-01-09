import React from "react";
import { Table as SemanticTable } from "semantic-ui-react";


const TableBody = ({getTableBodyProps, page, prepareRow}) => {
  return (
    <SemanticTable.Body {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (
          <SemanticTable.Row {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <SemanticTable.Cell {...cell.getCellProps()}>
                  {cell.isGrouped ? (
                    // If it's a grouped cell, add an expander and row count
                    <>
                      <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? "👇" : "👉"}
                      </span>{" "}
                      {cell.render("Cell", { editable: false })} (
                      {row.subRows.length})
                    </>
                  ) : cell.isAggregated ? (
                    // If the cell is aggregated, use the Aggregated
                    // renderer for cell
                    cell.render("Aggregated")
                  ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                    // Otherwise, just render the regular cell
                    cell.render("Cell", { editable: true })
                  )}
                </SemanticTable.Cell>
              );
            })}
          </SemanticTable.Row>
        );
      })}
    </SemanticTable.Body>
  );
};

export default TableBody;
