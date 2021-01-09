import React from "react";
import Table from "../common/Table/Table";
import { MIColumns } from "./DemoData";

const ManualInstallsTable = ({ data, dataUpdate }) => {
  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    dataUpdate((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false);

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    skipResetRef.current = false;
  }, [data]);

  return (
    <Table
      columns={MIColumns}
      data={data}
      updateMyData={updateMyData}
      skipReset={skipResetRef.current}
    />
  );
};

export default ManualInstallsTable;
