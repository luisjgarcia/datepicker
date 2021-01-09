import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from "react-table";
import TablePagination from "./TablePagination";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { matchSorter } from "match-sorter";
import { Table as SemanticTable } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data, updateMyData, skipReset }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // Render the UI for your table
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <SemanticTable
              ui
              striped
              basic
              celled
              padded
              textAlign={"left"}
              {...getTableProps()}
            >
              <TableHeader headerGroups={headerGroups} />
              <TableBody
                getTableBodyProps={getTableBodyProps}
                page={page}
                prepareRow={prepareRow}
              />
            </SemanticTable>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <TablePagination
              data={data}
              canPreviousPage={canPreviousPage}
              gotoPage={gotoPage}
              previousPage={previousPage}
              canNextPage={canNextPage}
              nextPage={nextPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Table;
