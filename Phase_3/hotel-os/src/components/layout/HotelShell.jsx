import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "../dashboard/Dashboard";

class HotelShell extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />

        <div>
          <Topbar />

          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    );
  }
}

export default HotelShell;
