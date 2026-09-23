import React from "react";

class Sidebar extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <aside>
        <h1>HOTEL OS</h1>

        <nav>
          {items.map((item) => (
            <p key={item.id}>{item.label}</p>
          ))}
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
