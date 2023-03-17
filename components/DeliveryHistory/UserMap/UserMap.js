import React from "react";
import Map, { Marker } from "react-map-gl";
import { Box, Typography } from "@mui/material";
import { LocationContext } from "../../../store/location-context";
import { useContext } from "react";
import Icon from "@mdi/react";
import { mdiGoogleMaps } from "@mdi/js";

export default function UserMap() {
  const mapCtx = useContext(LocationContext);
  const [pickUp, setPickUp] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [dropOff, setDropOff] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const setLocation = (e) => {
    if (mapCtx.isPickup) {
      mapCtx.setPickupLocation({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
      setPickUp({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    } else {
      mapCtx.setDropoffLocation({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
      setDropOff({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    }
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        borderRadius: 5,
        marginTop: "50px",
        marginLeft: "20px",
        width: "60%",
        maxWidth: "1000px",
        overflow: "hidden",
        height: 800,
        display: "flex",
        flexGrow: 2,
        boxShadow: 12,
      }}
    >
      <Typography
        sx={{
          fontSize: "20pt",
          color: "black",
          height: "0px",
          top: "12px",
          left: "15px",
          bgcolor: "transparent",
          position: "relative",
          zIndex: 100,
        }}
      >
        Pick A Location
      </Typography>
      <Map
        initialViewState={{
          longitude: 85.81890681675299,
          latitude: 20.246846400719136,
          zoom: 13,
        }}
        style={{
          height: 800,
          flex: 1,
          overflow: "hidden",
          bottomBorderRadius: 5,
          position: "relative",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        onClick={setLocation}
      />
    </Box>
  );
}
