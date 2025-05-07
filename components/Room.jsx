import React, { useState, useEffect } from "react";
import "./Room.css"; // Import the separate CSS file

const Room = () => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [serviceStatus, setServiceStatus] = useState(null);
  const [userName, setUserName] = useState("");
  const [isCleaning, setIsCleaning] = useState(false); // ✅ New state to disable button

  // Handle name input change
  const handleChangeName = (e) => {
    setName(e.target.value);
    setUserName(e.target.value);
  };

  // Fetch all rooms from backend
  useEffect(() => {
    fetch("https://backendroom-l6bi.onrender.com/api/rooms") // ✅ Removed extra slash
      .then((res) => res.json())
      .then((data) => {
        // ✅ Filter only rooms with "Pending" status
        const pendingRooms = data.filter((room) => room.status === "Pending");
        setRooms(pendingRooms);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  // Handle room selection
  const handleChangeRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

  // Handle room service start
  const startService = () => {
    if (!selectedRoom || !userName) return alert("Please enter room number and name!");
    setServiceStatus("Started");
    setIsCleaning(true); // ✅ Disable button after starting cleaning

    fetch(`https://backendroom-l6bi.onrender.com/api/rooms/${selectedRoom}`, {
      method: "PUT",
      body: JSON.stringify({ userName, status: "Cleaning" }),
      headers: { "Content-Type": "application/json" },
    });
  };

  // Handle room service stop
  const stopService = () => {
    if (!selectedRoom || !userName) return alert("Please enter room number and name!");
    setServiceStatus("Completed");
    setIsCleaning(false); // ✅ Enable button when cleaning is stopped

    fetch(`https://backendroom-l6bi.onrender.com/api/rooms/${selectedRoom}`, {
      method: "PUT",
      body: JSON.stringify({ userName, status: "Completed" }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="room-container">
      <h2>Room Service</h2>

      {/* Full Name Input */}
      <div className="fullname-container">
        <label>Enter Your Full Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleChangeName}
          placeholder="Your Name"
        />
      </div>

      {/* Room Number Input */}
      <label>Enter Room Number:</label>
      <input
        type="text"
        value={selectedRoom}
        onChange={handleChangeRoom}
        placeholder="Room Number"
      />

      {/* Buttons */}
      <div className="button-group">
        <button onClick={startService} className="start-btn" disabled={isCleaning}>
          Start Service
        </button>
        <button onClick={stopService} className="stop-btn">
          Stop Service
        </button>
      </div>

      {/* Service Status */}
      {serviceStatus && (
        <p className="status-message">
          {userName} started service for Room {selectedRoom} ({serviceStatus})
        </p>
      )}

      {/* Pending Room List */}
      <br></br>
      <h3>Pending Rooms:</h3>
      {rooms.length > 0 ? (
        <div className="room-grid">
          {rooms.map((room) => (
            <div key={room._id} className="room-box">
               {room.roomNumber}
            </div>
          ))}
        </div>
      ) : (
        <p>No pending rooms.</p>
      )}
    </div>
  );
};

export default Room;