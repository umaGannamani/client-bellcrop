import { useEffect, useState, useContext } from "react";
import BackButton from "../components/BackButton";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://server-bellcrop-backend.onrender.com/api/registrations/my-events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [token]);

  // Normalize today's date (remove time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  const past = events.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  return (
    <div className="container">
      <BackButton />

      <h2>Upcoming Events</h2>
      {upcoming.length > 0 ? (
        upcoming.map((e) => <p key={e._id}>{e.name}</p>)
      ) : (
        <p>No upcoming events</p>
      )}

      <h2>Past Events</h2>
      {past.length > 0 ? (
        past.map((e) => <p key={e._id}>{e.name}</p>)
      ) : (
        <p>No past events</p>
      )}
    </div>
  );
}

export default Dashboard;
