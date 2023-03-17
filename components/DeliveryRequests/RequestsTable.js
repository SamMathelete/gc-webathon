import {
  Button,
  Divider,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Done, Cancel } from "@mui/icons-material";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { ref, onValue, set } from "@firebase/database";
import { firestore, db } from "../../firebase/clientApp";

const RequestsTable = () => {
  const colRef = collection(firestore, "delivery-requests");
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      var reqArray = [];
      snapshot.docs.forEach((doc, index) => {
        reqArray.push({ id: doc.id, ...doc.data() });
      });
      setRequests(reqArray);
    });
  }, []);
  const [requests, setRequests] = useState([]);

  const [droneAvailable, setDroneAvailable] = useState(0);
  const [drones, setDrones] = useState([]);
  useEffect(() => {
    const query = ref(db, "drones");

    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setDroneAvailable(
          Object.keys(data)
            .map((key) => (!data[key].isActive ? 1 : 0))
            .reduce((sum, val) => sum + val, 0)
        );
        setDrones(Object.keys(data).map((key) => data[key]));
        console.log(droneAvailable);
      }
    });
  }, []);

  const approveRequest = async (id) => {
    const docRef = doc(colRef, id);
    const activeDeliveries = collection(firestore, "active-deliveries");
    const newDocRef = doc(activeDeliveries, id);
    let data = requests.find((req) => req.id === id);

    delete data.id;
    const drone = drones.find((drone) => drone.isActive === false);
    data.status = "Processing";
    data.droneId = drone.droneId;
    const query = ref(db, `drones/${drone.droneId}`);
    set(query, { ...drone, isActive: true });
    await setDoc(newDocRef, data);
    await deleteDoc(docRef);
  };

  const rejectRequest = async (id) => {
    const docRef = doc(colRef, id);
    await deleteDoc(docRef);
  };

  const ActionButtons = (params) => {
    return (
      <Box sx={{ display: "flex" }}>
        <IconButton
          variant="contained"
          color="success"
          onClick={() => approveRequest(params.id)}
          disabled={droneAvailable === 0 ? true : false}
        >
          <Done />
        </IconButton>
        <IconButton
          variant="contained"
          color="error"
          onClick={() => rejectRequest(params.id)}
        >
          <Cancel />
        </IconButton>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "ID No.", flex: 2 },
    { field: "sourceCity", headerName: "From", flex: 2 },
    { field: "destinationCity", headerName: "To", flex: 2 },
    { field: "weight", headerName: "Weight", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: ActionButtons,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 600,
        marginTop: "15px",
        marginLeft: "20px",
        width: "10%",
        marginRight: "20px",
        flex: 1,
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
          Delivery Requests
        </Typography>
        <Divider />

        <DataGrid rows={requests} columns={columns} pageSize={5} />
      </Paper>
    </Box>
  );
};

export default RequestsTable;
