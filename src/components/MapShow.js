import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarketLogo from "../asset/marker-red.png";

const customIcon = new L.Icon({
  iconUrl: MarketLogo,
  iconSize: [20, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapShow = ({ location }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      }}
    >
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={12}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={null}
          attributionControl={false}
        />
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
