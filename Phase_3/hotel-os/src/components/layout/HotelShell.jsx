import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "../dashboard/Dashboard";

class HotelShell extends React.Component {
  render() {
    const { navigationItems, hotelName, user } = this.props;

    return (
      <div>
        <Sidebar items={navigationItems} />

        <div>
          <Topbar hotelName={hotelName} user={user} />

          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    );
  }
}

export default HotelShell;
