import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    return (
      event.name?.toLowerCase().includes(searchText) ||
      event.location?.toLowerCase().includes(searchText) ||
      event.category?.toLowerCase().includes(searchText) 
    );
  });

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="container">
      <h2>Explore Events</h2>

      {/* Search Section */}
      <div
        style={{
          marginBottom: "20px",
          position: "relative",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, location, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            paddingRight: "35px", // space for icon
          }}
        />

        {/* Clear Icon */}
        {search && (
          <AiOutlineClose
            onClick={handleClear}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
              color: "#555",
            }}
          />
        )}
      </div>

      <div className="grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
