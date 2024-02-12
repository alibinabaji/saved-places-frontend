import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarketLogo from "../asset/marker-red.png";

const customIcon = new L.Icon({
  iconUrl: MarketLogo,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapShow = ({ location }) => {
  const [newMarker, setNewMarker] = useState(null);

  // Event handler for adding a new marker
  const handleMapClick = (e) => {
    console.log(e.latlng);
    const { lat, lng } = e.latlng;
    setNewMarker({ latitude: lat, longitude: lng });
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={12}
        style={{ height: "100%" }}
        whenReady={(map) => {
          console.log(map);
          map.target.on("click", function (e) {
            handleMapClick(e);
          });
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={null}
          attributionControl={false}
        />
        {newMarker && ( // Render the new marker if it exists
          <Marker
            position={[newMarker.latitude, newMarker.longitude]}
            icon={customIcon}
          >
            <Popup>New Marker</Popup>
          </Marker>
        )}
        <Marker
          position={[location.latitude, location.longitude]}
          icon={customIcon}
          key={location.id}
        >
          <Popup>{location.address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapShow;
