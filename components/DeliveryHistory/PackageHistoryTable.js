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
import { firestore } from "../../firebase/clientApp";

const DeliveryHistory = () => {
  const colRef = collection(firestore, "past-deliveries");
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      var reqArray = [];
      snapshot.docs.forEach((doc, index) => {
        reqArray.push({ id: doc.id, ...doc.data() });
      });
      setRequests(reqArray);
      console.log(reqArray);
    });
  }, []);
  const [requests, setRequests] = useState([]);

  const ActionButtons = (params) => {
    return (
      <Box sx={{ display: "flex" }}>
        <IconButton
          variant="contained"
          color="success"
          onClick={() => approveRequest(params.id)}
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
    { field: "id", headerName: "ID No.", flex: 1 },
    { field: "sourceCity", headerName: "From", flex: 1 },
    { field: "destinationCity", headerName: "To", flex: 1 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 600,
        marginTop: "15px",
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
            color: "black",
            margin: 15,
          }}
        >
          Delivery History
        </Typography>
        <Divider />

        <DataGrid rows={requests} columns={columns} pageSize={5} />
      </Paper>
    </Box>
  );
};

export default DeliveryHistory;
