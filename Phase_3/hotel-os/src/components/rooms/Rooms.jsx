import React from "react";
import RoomCard from "./RoomCard";
import { rooms } from "../../data/rooms";

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRoom: null,
      filter: "All",
    };
  }

  handleSelectRoom = (room) => {
    this.setState({
      selectedRoom: room,
    });
  };

  handleFilterChange = (filter) => {
    this.setState({
      filter,
    });
  };

  render() {
    const { selectedRoom, filter } = this.state;

    const filteredRooms =
      filter === "All"
        ? rooms
        : rooms.filter((room) => room.status === filter);

    return (
      <section>
        <h1>Rooms</h1>

        <div>
          <button onClick={() => this.handleFilterChange("All")}>
            All
          </button>

          <button onClick={() => this.handleFilterChange("Ready")}>
            Ready
          </button>

          <button onClick={() => this.handleFilterChange("Occupied")}>
            Occupied
          </button>

          <button onClick={() => this.handleFilterChange("Cleaning")}>
            Cleaning
          </button>
        </div>

        <div>
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelect={this.handleSelectRoom}
            />
          ))}
        </div>

        {selectedRoom && (
          <div>
            <h2>Selected Room</h2>
            <p>Room {selectedRoom.number}</p>
            <p>{selectedRoom.type}</p>
            <p>{selectedRoom.status}</p>
          </div>
        )}
      </section>
    );
  }
}

export default Rooms;