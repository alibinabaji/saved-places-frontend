import React, { useState, useEffect } from "react";
import List from "../components/List";
import AddListForm from "../components/AddListForm";
import MapShow from "../components/MapShow";
import { useLocationContext } from "../LocationContext";

function Home() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedLocation } = useLocationContext();

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

  const handleAddList = (name) => {
    fetch(`${process.env.REACT_APP_API_URL}/lists/addLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create list");
        }
        return response.json();
      })
      .then((data) => {
        setLists([...lists, data]);
      })
      .catch((error) => {
        console.error("Error creating list:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Favorite Places</h1>
      <div className="flex flex-wrap mb-8">
        <div className="w-full lg:w-1/3 p-4">
          {selectedLocation.latitude === 0 &&
          selectedLocation.latitude === 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Lists</h2>
              <AddListForm onAddList={handleAddList} />
              <div className="mt-4">
                {lists.length === 0 ? (
                  <p>No lists available</p>
                ) : (
                  lists.map((list) => <List key={list.id} list={list} />)
                )}
              </div>
            </>
          ) : (
            <MapShow
              location={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
