import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import { Box, Typography } from "@mui/material";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { db } from "../../firebase/clientApp";
import { onValue, ref } from "@firebase/database";

export default function AdminMap() {
  const [position, setPosition] = useState({ lng: 0, lat: 0 });
  const [dronePosition, setDronePosition] = useState([]);
  useEffect(() => {
    const query = ref(db, "drones");

    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setDronePosition(data);
      }
    });
  }, []);
  return (
    <Box
      sx={{
        flexDirection: "column",
        borderRadius: 5,
        marginTop: "15px",
        marginLeft: "20px",
        width: "60%",
        maxWidth: "1000px",
        overflow: "hidden",
        height: 600,
        boxShadow: 12,
        display: "flex",
        flex: 2,
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
        Active Drones
      </Typography>
      <Map
        initialViewState={{
          longitude: 85.85028271536169,
          latitude: 20.285662503199646,
          zoom: 12,
        }}
        style={{
          height: 600,
          flex: 1,
          overflow: "hidden",
          bottomBorderRadius: 5,
          position: "relative",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        onClick={(e) => {
          setPosition({ lng: e.lngLat.lng, lat: e.lngLat.lat });
          console.log(position);
        }}
      >
        {console.log(dronePosition)}
        {Object.keys(dronePosition).map((key, index) => {
          if (dronePosition.isActive) {
            return (
              <>
                <Marker
                  key={index + 1}
                  longitude={dronePosition[key].lng}
                  latitude={dronePosition[key].lat}
                  anchor="bottom"
                  color="black"
                ></Marker>
                <Marker
                  key={-index - 1}
                  longitude={dronePosition[key].lng}
                  latitude={dronePosition[key].lat}
                  anchor="bottom"
                  color="black"
                >
                  <Typography sx={{ fontSize: "18pt", marginBottom: "55px" }}>
                    {key}
                  </Typography>
                </Marker>
              </>
            );
          }
        })}
      </Map>
    </Box>
  );
}
