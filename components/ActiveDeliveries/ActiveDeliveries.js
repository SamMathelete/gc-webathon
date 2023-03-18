import {
  Button,
  Divider,
  Icon,
  IconButton,
  LinearProgress,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore, db } from "../../firebase/clientApp";
import { onValue, ref, set } from "@firebase/database";

const ActiveDeliveries = () => {
  useEffect(() => {
    const colRef = collection(firestore, "active-deliveries");
    onSnapshot(colRef, (snapshot) => {
      var reqArray = [];
      snapshot.docs.forEach((doc, index) => {
        reqArray.push({ id: doc.id, ...doc.data() });
      });
      setRequests(reqArray);
      console.log(reqArray);
    });
  }, []);

  const [dronePosition, setDronePosition] = useState([]);
  useEffect(() => {
    const query = ref(db, "drones");

    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setDronePosition(data);
        console.log(data);
      }
    });
  }, []);
  const [requests, setRequests] = useState([]);

  const DistanceSlider = (level) => {
    return (
      <LinearProgress
        value={calculateProgress(
          level.row.source,
          level.row.destination,
          dronePosition[level.row.droneId]
        )}
        variant={
          level.row.status === "In-Transit" ? "determinate" : "indeterminate"
        }
        sx={{ width: "100%", marginRight: "15px" }}
      />
    );
  };

  const calculateProgress = (source, target, position) => {
    try {
      const distFromSource =
        ((position.lng - source.longitude) ** 2 +
          (position.lat - source.latitude) ** 2) **
        0.5;
      const distFromTarget =
        ((position.lng - target.longitude) ** 2 +
          (position.lat - target.latitude) ** 2) **
        0.5;

      return (distFromSource / (distFromSource + distFromTarget)) * 100;
    } catch (err) {
      return 0;
    }
  };

  const handleDeliver = async (docId) => {
    const colRef = collection(firestore, "active-deliveries");
    const pastColRef = collection(firestore, "past-deliveries");
    const newDocRef = doc(pastColRef, docId);
    var docData = requests.find((req) => req.id === docId);
    docData.status = "Delivered";

    await setDoc(newDocRef, docData);
    const docRef = doc(colRef, docId);

    console.log(dronePosition);
    const droneId = requests.find((req) => req.id === docId).droneId;
    const query = ref(db, `drones/${droneId}`);
    set(query, { ...dronePosition[droneId], isActive: false });
    await deleteDoc(docRef);
  };
  const Deliver = (id) => {
    return <Button onClick={() => handleDeliver(id.id)}>Deliver</Button>;
  };

  const columns = [
    { field: "id", headerName: "ID No.", flex: 3 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "weight", headerName: "Weight", flex: 1 },

    // { field: "source", headerName: "Source", flex: 2 },
    {
      field: "progress",
      headerName: "Progress",
      flex: 3,
      renderCell: (id) => DistanceSlider(id),
    },
    { field: "droneId", headerName: "Drone ID", flex: 1 },
    {
      field: "simulate",
      headerName: " Simulate",
      flex: 1,
      renderCell: (id) => Deliver(id),
    },
    // { field: "destination", headerName: "Destination", flex: 2 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 600,
        marginTop: "15px",
        marginLeft: "20px",
        marginRight: "20px",
        flex: 1,
        width: "10%",
      }}
    >
      <Paper
        elevation={12}
        style={{
          height: 600,
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Typography
          style={{
            fontSize: "20pt",

            padding: "15px",
          }}
        >
          Active Deliveries
        </Typography>
        <Divider />

        <DataGrid rows={requests} columns={columns} pageSize={5} />
      </Paper>
    </Box>
  );
};

export default ActiveDeliveries;
