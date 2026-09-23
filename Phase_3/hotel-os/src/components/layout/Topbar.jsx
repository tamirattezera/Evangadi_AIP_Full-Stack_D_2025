import React from "react";

class Topbar extends React.Component {
  render() {
    return (
      <header>
        <div>
          <p>Hotel Operations</p>
          <h2>Overview</h2>
        </div>

        <div>
          <span>Search</span>
          <span>Profile</span>
        </div>
      </header>
    );
  }
}

export default Topbar;
