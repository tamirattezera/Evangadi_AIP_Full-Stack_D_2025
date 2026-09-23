import React from "react";
import HotelShell from "./components/layout/HotelShell";
import { navigationItems } from "./data/navigation";

class App extends React.Component {
  render() {
    const user = {
      name: "Samrawit Melaku",
      role: "General Manager",
      avatar: "/avatar.jpg",
    };

    return (
      <HotelShell
        navigationItems={navigationItems}
        hotelName="Aurelia Grand Hotel"
        user={user}
      />
    );
  }
}

export default App;
