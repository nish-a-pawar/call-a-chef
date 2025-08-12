import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const socket = io("http://localhost:5000"); // backend URL

const LocationTracker = ({ userId }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          // send to backend via socket
          socket.emit("updateLocation", {
            userId,
            latitude,
            longitude,
          });
        },
        (error) => {
          console.error("❌ Error getting location:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, [userId]);

  return (
    <div>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here 📍</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
