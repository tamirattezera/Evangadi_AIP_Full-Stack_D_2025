import React from "react";

class UserProfile extends React.Component {
  render() {
    const { name, role, avatar } = this.props;

    return (
      <div className="user-profile">
        <img src={avatar} alt={name} />

        <div>
          <p>{name}</p>
          <span>{role}</span>
        </div>
      </div>
    );
  }
}

export default UserProfile;
