import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <aside>
        <h1>HOTEL OS</h1>

        <nav>
          <p>Overview</p>
          <p>Reservations</p>
          <p>Rooms</p>
          <p>Guests</p>
          <p>Housekeeping</p>
          <p>Maintenance</p>
          <p>Staff</p>
          <p>Inventory</p>
          <p>Reports</p>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
