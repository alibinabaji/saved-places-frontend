import React from "react";
import { useLocationContext } from "../LocationContext";
function Location({ location }) {
  const { setLocation } = useLocationContext();

  return (
    <li className="flex items-center mb-2">
      <span className="mr-2">{location.name}</span>
      <span className="text-sm text-gray-500">
        ({location.latitude}, {location.longitude})
      </span>
      <button
        onClick={() => setLocation(location.latitude, location.longitude)}
      >
        view
      </button>
    </li>
  );
}

export default Location;
