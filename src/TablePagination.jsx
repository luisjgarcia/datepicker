import React from "react";
import {
  Button,
  Input
} from "semantic-ui-react";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "./Table.css";

function TablePagination({
    data,
    canPreviousPage,
    gotoPage,
    previousPage,
    canNextPage,
    nextPage,
    pageCount,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize
  }) {
      return (
        <div className="pagination">
            <Button
                size="mini"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
            >
                {"<<"}
            </Button>{" "}
            <Button
                size="mini"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
            >
                {"<"}
            </Button>{" "}
            <Button
                size="mini"
                onClick={() => nextPage()}
                disabled={!canNextPage}
            >
                {">"}
            </Button>{" "}
            <Button
                size="mini"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
            >
                {">>"}
            </Button>{" "}
            <strong className="page-segment">
                Page{" "}
                <Input
                size="mini"
                type="number"
                min="1"
                max={pageCount}
                defaultValue={pageIndex + 1}
                value={pageIndex + 1}
                onChange={(e) => {
                    const page = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                    gotoPage(page);
                }}
                />{" "}
                of {pageOptions.length} | Show{" "}
                <select
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                }}
                >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                    {pageSize}
                    </option>
                ))}
                </select>{" "}
                records of {data.length}
            </strong>
            </div>
      )
}

export default TablePagination;