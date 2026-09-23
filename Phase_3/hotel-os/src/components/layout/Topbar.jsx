import React from "react";
import UserProfile from "./UserProfile";

class Topbar extends React.Component {
  render() {
    const { hotelName, user } = this.props;

    return (
      <header>
        <div>
          <p>{hotelName}</p>
          <h2>Overview</h2>
        </div>

        <div>
          <span>Search</span>

          <UserProfile name={user.name} role={user.role} avatar={user.avatar} />
        </div>
      </header>
    );
  }
}

export default Topbar;
