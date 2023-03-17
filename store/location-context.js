import { createContext, useState } from "react";

export const LocationContext = createContext({
  isPickup: true,
  pickupLocation: {
    latitude: 0,
    longitude: 0,
  },
  dropoffLocation: {
    latitude: 0,
    longitude: 0,
  },
  setPickupLocation: () => {},
  setDropoffLocation: () => {},
  setIsPickup: () => {},
});

const LocationContextProvider = ({ children }) => {
  const [isPickup, setIsPickup] = useState(true);
  const [pickupLocation, setPickupLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [dropoffLocation, setDropoffLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  return (
    <LocationContext.Provider
      value={{
        isPickup,
        pickupLocation,
        dropoffLocation,
        setPickupLocation,
        setDropoffLocation,
        setIsPickup,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
