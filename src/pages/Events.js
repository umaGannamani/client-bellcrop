import { useEffect, useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import BackButton from "../components/BackButton";
import { AuthContext } from "../context/AuthContext";

function Events() {
  const [events, setEvents] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/registrations/my-events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [token]);

  const handleCancel = async (eventId) => {
    const res = await fetch(
      `http://localhost:5000/api/registrations/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Remove cancelled event from UI instantly
    setEvents(events.filter(event => event._id !== eventId));
    alert("Registration Cancelled");
  };

  return (
    <div className="container">
      <BackButton />
      <h2>My Registered Events</h2>

      <div className="grid">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="card">
              <h3>{event.name}</h3>
              <p>{event.location}</p>
              <p>
                Seats: {event.availableSeats}/{event.capacity}
              </p>

              {/* Delete Icon */}
              <MdDelete
                onClick={() => handleCancel(event._id)}
                style={{
                  color: "red",
                  fontSize: "22px",
                  cursor: "pointer"
                }}
                title="Cancel Registration"
              />
            </div>
          ))
        ) : (
          <p>You have not registered for any events yet.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
