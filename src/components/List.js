import React, { useState, useEffect } from "react";
import Location from "./Location";
import { Link } from "react-router-dom";

function List({ list }) {
  console.log(list)
  const [locations, setLocations] = useState([]);
  const [showLocs, setShowLocs] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/locations/${list.id}`)
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, [list.id]);
  return (
    <div
      className="bg-white rounded-md shadow-md p-6 my-4"
      onClick={(e) => setShowLocs(!showLocs)}
    >
      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-semibold">{list.name}</h2>
        <div>
        <Link to={`addLocMap/${list.id}`}>Add Place</Link>
        </div>
      </div>
      {showLocs && (
        <ul>
          {locations.map((location) => (
            <>
              <Location key={location.id} location={location} />
            </>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
