import React from "react";
import RoomCard from "./RoomCard";
import { rooms } from "../../data/rooms";

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRoom: null,
    };
  }

  handleSelectRoom = (room) => {
    this.setState({
      selectedRoom: room,
    });
  };

  render() {
    const { selectedRoom } = this.state;

    return (
      <section>
        <h1>Rooms</h1>

        <div>
          {rooms.map((room) => (
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
