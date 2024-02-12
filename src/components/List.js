import React, { useState, useEffect } from "react";
import Location from "./Location";
function List({ list }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/locations/${list.id}`)
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, [list.id]);
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{list.name}</h2>
      <ul>
        {locations.map((location) => (
          <>
            <Location key={location.id} location={location} />
          </>
        ))}
      </ul>
    </div>
  );
}

export default List;
