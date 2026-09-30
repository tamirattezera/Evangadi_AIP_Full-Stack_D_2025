import React from "react";

class RoomCard extends React.Component {
  render() {
    const { room, onSelect } = this.props;

    return (
      <article>
        <h3>Room {room.number}</h3>
        <p>{room.type}</p>
        <p>{room.status}</p>
        <p>${room.price} / night</p>

        <button onClick={() => onSelect(room)}>View Room</button>
      </article>
    );
  }
}

export default RoomCard;
