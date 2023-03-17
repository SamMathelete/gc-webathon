import React from "react";
import Map from "react-map-gl";
import { Box } from "@mui/material";

export default function AdminMap() {
  return (
    <Box
      sx={{
        borderRadius: "15px",
        marginTop: "15px",
        marginLeft: "20px",
        width: "60%",
        maxWidth: "1000px",
        overflow: "hidden",
        height: 600,
        display: "flex",
        flexGrow: 2,
        boxShadow: 12,
      }}
    >
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ height: 600, flex: 1 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        onClick={(e) => console.log(e.lngLat)}
      />
    </Box>
  );
}
