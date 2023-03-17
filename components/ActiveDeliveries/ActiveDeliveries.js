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
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

const ActiveDeliveries = () => {
  useEffect(() => {
    const colRef = collection(firestore, "active-deliveries");
    onSnapshot(colRef, (snapshot) => {
      var reqArray = [];
      snapshot.docs.forEach((doc, index) => {
        reqArray.push({ id: index, ...doc.data() });
      });
      setRequests(reqArray);
      console.log(reqArray);
    });
  }, []);
  const [requests, setRequests] = useState([]);

  const columns = [
    { field: "id", headerName: "ID No.", flex: 1 },
    { field: "source", headerName: "Source", flex: 2 },
    { field: "destination", headerName: "Destination", flex: 2 },
    { field: "weight", headerName: "Weight", flex: 2 },
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
        width: "40%",
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
          Active Deliveries
        </Typography>
        <Divider />

        <DataGrid rows={requests} columns={columns} pageSize={5} />
      </Paper>
    </Box>
  );
};

export default ActiveDeliveries;
