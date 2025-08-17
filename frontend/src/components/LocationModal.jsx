import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LocationModal = ({ isOpen, onClose, onConfirm }) => {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState("");

  // Fix marker icon
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Reverse geocode helper
  async function getCityFromCoords(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return (
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown"
      );
    } catch (error) {
      console.error("Error fetching city:", error);
      return "Unknown";
    }
  }

  // Get user location when modal opens
  useEffect(() => {
    if (isOpen) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });

          // Fetch city name right away
          const cityName = await getCityFromCoords(lat, lng);
          setCity(cityName);
        },
        (err) => {
          console.error("Location error:", err);
          alert("Please allow location access to continue.");
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-[500px] h-[500px] flex flex-col">
        <h2 className="text-lg font-bold mb-2">Confirm Your Location</h2>

        {coords ? (
          <>
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={15}
              style={{ height: "100%", width:"60%" ,flex: 1 }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coords.lat, coords.lng]} icon={markerIcon}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
            <p className="mt-2 text-sm text-gray-600">
              Detected city: <strong>{city}</strong>
            </p>
          </>
        ) : (
          <p>Fetching your location...</p>
        )}

        <div className="mt-2 flex justify-end space-x-2">
          <button className="bg-gray-400 px-4 py-1 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={() => {
              if (coords) {
                onConfirm({
                  lat: coords.lat,
                  lng: coords.lng,
                  city: city,
                });
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
