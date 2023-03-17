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

const RequestsTable = () => {
  const [requests, setRequests] = useState([
    {
      id: "1",
      name: "John Doe",
    },
  ]);

  const approveRequest = (id) => {
    console.log("Approve request with id: " + id);
  };

  const rejectRequest = (id) => {
    console.log("Reject request with id: " + id);
  };

  const ActionButtons = (params) => {
    return (
      <Box>
        <IconButton
          variant="contained"
          color="success"
          onClick={approveRequest(params.id)}
        >
          <Done />
        </IconButton>
        <IconButton
          variant="contained"
          color="error"
          onClick={rejectRequest(params.id)}
        >
          <Cancel />
        </IconButton>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "Sl. No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      
      renderCell: ActionButtons,
    },
  ];

  const rows = [
    {
      id: "1",
      name: "John Doe",
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
        marginRight: "20px",
        width: "50%",
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
          Delivery Requests
        </Typography>
        <Divider />

        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Paper>
    </Box>
  );
};

export default RequestsTable;
