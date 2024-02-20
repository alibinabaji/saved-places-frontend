import React from "react";
import { useLocationContext } from "../LocationContext";
function Location({ location }) {
  const { setLocation } = useLocationContext();
  return (
    <li className="flex justify-between items-center mb-2">
      <span className="mr-2">{location.name}</span>
      <button
        onClick={() => setLocation(location.latitude, location.longitude, location.address)}
        className="text-blue-700"
      >
        view
      </button>
    </li>
  );
}

export default Location;
