import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

function EventDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      });
  }, [id]);

  const handleRegister = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/registrations/${id}`,
        {
          method: "POST",
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

      // Update seat count without reload
      setEvent(prev => ({
        ...prev,
        availableSeats: data.availableSeats
      }));

      alert("Registered Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  const isFull = event.availableSeats === 0;

  return (
    <div>
      <BackButton />
      <h2>{event.name}</h2>
      <p>{event.description}</p>

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

      {token ? (
        isFull ? (
          <button disabled style={{ background: "gray" }}>
            Sold Out
          </button>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )
      ) : (
        <p>Login to register</p>
      )}
    </div>
  );
}

export default EventDetails;
