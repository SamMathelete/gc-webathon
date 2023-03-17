import React from "react";
import Map from "react-map-gl";
import { Box, Typography } from "@mui/material";

export default function AdminMap() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
      }}
      id="master-map"
    >
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
          Current Deliveries
        </Typography>
        <Map
          initialViewState={{
            longitude: 85.81890681675299,
            latitude: 20.246846400719136,
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
          onClick={(e) => console.log(e.lngLat)}
        />
      </Box>
    </div>
  );
}
