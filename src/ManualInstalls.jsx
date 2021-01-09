import React from "react";
import { demoData } from "./DemoData";
import ManualInstallsTable from "./ManualInstallsTable";
import SubNav from "../common/SubNav/SubNav.jsx";
import "./ManualInstalls.css";

class ManualInstalls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: demoData });
  }

  dataUpdate(row) {
    this.setState({ dataUpdate: row });
  }

  render() {
    return (
      <div>
        <SubNav active="Manual Installs" />
        <ManualInstallsTable
          data={this.state.data}
          dataUpdate={this.dataUpdate}
        />
      </div>
    );
  }
}

export default ManualInstalls;
