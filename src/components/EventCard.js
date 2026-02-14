import { Link } from "react-router-dom";

function EventCard({ event }) {
  const isFull = event.availableSeats === 0;

  return (
    <div className="card">
      <h3>{event.name}</h3>
      <p>{event.location}</p>

      {/* Seat Display */}
      <p>
        Seats:{" "}
        {isFull ? (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Not Available
          </span>
        ) : (
          `${event.availableSeats}/${event.capacity}`
        )}
      </p>

      <Link to={`/event/${event._id}`}>View Details</Link>
    </div>
  );
}

export default EventCard;
