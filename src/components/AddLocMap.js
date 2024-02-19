import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarketLogo from "../asset/marker-red.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: MarketLogo,
  iconSize: [20, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapShow = () => {
  const [newMarker, setNewMarker] = useState();
  const { listId } = useParams();


  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setNewMarker({ latitude: lat, longitude: lng });
  };
  const [name, setName] = useState("");

  const handleAddList = (name) => {
    fetch(`${process.env.REACT_APP_API_URL}/locations/addLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, listId, latitude: newMarker.latitude, longitude: newMarker.longitude }),
    })
      .then((data) => {
        toast.success("List created successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error creating list:", error);
        toast.error("Failed to create list");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    handleAddList(name);
    setName("");
  };
  return (
    <div className="container mx-auto p-4 max-w-md">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="mb-4 grid gap-4">
        <label htmlFor="name" className="block mb-2 font-semibold">
          New Location Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Location name"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <div className="flex flex-wrap">
          <div className="basis-1/2 p-2">
            <button
              type="submit"
              className="mt-2 bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full"
            >
              Add Location
            </button>
          </div>
          <div className="basis-1/2 p-2">
          <Link to="/">
            <button className="mt-2 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full">
            Back
            </button>
            </Link>
          </div>
        </div>
      </form>
      <div className="relative h-[40vh]">
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
            center={[36.2880443, 59.6157432]}
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
            {newMarker && (
              <Marker
                position={[newMarker.latitude, newMarker.longitude]}
                icon={customIcon}
              ></Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapShow;
