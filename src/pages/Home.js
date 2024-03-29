import React, { useState, useEffect } from "react";
import List from "../components/List";
import MapShow from "../components/MapShow";
import { useLocationContext } from "../LocationContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Home() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedLocation, setLocation } = useLocationContext();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/lists/getAll`)
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-semibold mb-4">Saved Places</h1>
      <div className="flex flex-wrap mb-8">
        <div className="w-full p-4">
          {selectedLocation.latitude === 0 &&
          selectedLocation.latitude === 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lists</h2>
                <button
                  type="submit"
                  className="mt-2 bg-green-500 text-white rounded-md px-2 py-2 hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  <Link to="/addList">Add new List</Link>
                </button>
              </div>
              <div className="mt-4">
                {lists.length === 0 ? (
                  <p>No lists available</p>
                ) : (
                  lists.map((list) => <List key={list.id} list={list} />)
                )}
              </div>
            </>
          ) : (
            <>
              <div className="relative h-[60vh]">
                <MapShow
                  location={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    address: selectedLocation.address,
                  }}
                />
              </div>
              <div className="my-4 text-center">{selectedLocation.address}</div>
              <div className="my-2">
                <button
                  className="mt-2 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full"
                  onClick={(e) => setLocation(0, 0)}
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
