import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore as db } from "../../firebase/clientApp";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import Map, { Marker } from "react-map-gl";
import Icon from "@mdi/react";
import { mdiGoogleMaps } from "@mdi/js";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import useSendNotification from "../../hooks/useSendNotification";

const TrackDeliveries = () => {
  const [activeDelivery, setActiveDelivery] = useState([]);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const sendNotification = useSendNotification();

  const [notificationList, setNotificationList] = React.useState([]);

  const fetchNotificationList = async () => {
    const snapshot = await getDocs(collection(firestore, "fcmTokens"));
    const list = snapshot.docs.map((doc) => doc.data());
    setNotificationList(list);
  };

  const fetchActiveDelivery = async () => {
    const querySnapshot = await getDocs(collection(db, "active-deliveries"));
    const activeDeliveryArray = [];
    querySnapshot.forEach((doc) => {
      activeDeliveryArray.push({
        id: doc.id,
        package: doc.id.slice(0, 5),
        name: doc.data().name,
        address: doc.data().destinationCity,
        status: "Processing",
        source: doc.data().source,
        destination: doc.data().destination,
      });
    });
    setActiveDelivery(
      activeDeliveryArray.filter((item) => item.uid === user.uid)
    );
  };

  console.log(activeDelivery);

  useEffect(() => {
    fetchActiveDelivery();
    fetchNotificationList();
    const notifier = notificationList.filter(
      (item) => item.uid === user.uid
    )[0];
    for (let i = 0; i < activeDelivery.length; i++) {
      if (
        activeDelivery[i].source.latitude ===
          activeDelivery[i].destination.latitude &&
        activeDelivery[i].source.longitude ===
          activeDelivery.destination.longitude
      ) {
        sendNotification(
          notifier.token,
          "Delivery Complete",
          `Your delivery is complete for ${activeDelivery[i].package}`
        );
      }
    }
  }, []);

  return (
    <Box
      sx={{
        flexDirection: "row",
      }}
    >
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
      >
        {activeDelivery.map((item) => (
          <Marker
            key={item.id}
            longitude={item.source.longitude}
            latitude={item.source.latitude}
          >
            <Icon path={mdiGoogleMaps} size={1} color="red" />
          </Marker>
        ))}
      </Map>

      <DataGrid
        rows={activeDelivery}
        columns={[
          { field: "id", headerName: "ID", width: 150 },
          { field: "package", headerName: "Package", width: 150 },
          { field: "name", headerName: "Name", width: 150 },
          { field: "address", headerName: "Address", width: 150 },
          { field: "status", headerName: "Status", width: 150 },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default TrackDeliveries;
