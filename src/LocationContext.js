import React, { createContext, useContext, useState } from "react";

// Create a new context
const LocationContext = createContext();

// Create a custom hook to consume the context
export const useLocationContext = () => useContext(LocationContext);

// Create a provider component to wrap the app and provide the context value
export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: ''
  });
console.log(selectedLocation)
  const setLocation = (latitude, longitude, address) => {
    setSelectedLocation({ latitude, longitude, address });
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
